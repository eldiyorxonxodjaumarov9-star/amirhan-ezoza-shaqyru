import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  increment,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, isFirebaseConfigured } from "./firebase";
import { RSVPData, Wish, WeddingConfig, AdminStats } from "@/types";
import {
  WeddingResponse,
  loadResponsesFromStorage,
  saveResponsesToStorage,
} from "./wedding-responses";

const COLLECTIONS = {
  rsvp: "rsvp",
  wishes: "wishes",
  config: "config",
  weddingResponses: "weddingResponses",
} as const;

// In-memory fallback when Firebase is not configured
const localRSVP: RSVPData[] = [];
const localWishes: Wish[] = [];
let wishListeners: Array<(wishes: Wish[]) => void> = [];

function notifyWishListeners() {
  wishListeners.forEach((fn) => fn([...localWishes]));
}

export async function submitRSVP(data: RSVPData): Promise<void> {
  const payload = {
    ...data,
    status: "pending" as const,
    createdAt: new Date().toISOString(),
  };

  if (!isFirebaseConfigured || !db) {
    localRSVP.push({ ...payload, id: `local-${Date.now()}` });
    return;
  }

  await addDoc(collection(db, COLLECTIONS.rsvp), payload);
}

export async function getRSVPList(): Promise<RSVPData[]> {
  if (!isFirebaseConfigured || !db) {
    return [...localRSVP];
  }

  const q = query(collection(db, COLLECTIONS.rsvp), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as RSVPData));
}

export async function updateRSVPStatus(
  id: string,
  status: RSVPData["status"]
): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    const item = localRSVP.find((r) => r.id === id);
    if (item) item.status = status;
    return;
  }
  await updateDoc(doc(db, COLLECTIONS.rsvp, id), { status });
}

export async function deleteRSVP(id: string): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    const idx = localRSVP.findIndex((r) => r.id === id);
    if (idx >= 0) localRSVP.splice(idx, 1);
    return;
  }
  await deleteDoc(doc(db, COLLECTIONS.rsvp, id));
}

export async function submitWish(name: string, message: string): Promise<void> {
  const payload = {
    name,
    message,
    likes: 0,
    createdAt: new Date().toISOString(),
  };

  if (!isFirebaseConfigured || !db) {
    const wish: Wish = { ...payload, id: `local-${Date.now()}` };
    localWishes.unshift(wish);
    notifyWishListeners();
    return;
  }

  await addDoc(collection(db, COLLECTIONS.wishes), payload);
}

export function subscribeWishes(callback: (wishes: Wish[]) => void): () => void {
  if (!isFirebaseConfigured || !db) {
    wishListeners.push(callback);
    callback([...localWishes]);
    return () => {
      wishListeners = wishListeners.filter((fn) => fn !== callback);
    };
  }

  const q = query(collection(db, COLLECTIONS.wishes), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const wishes = snapshot.docs.map(
      (d) => ({ id: d.id, ...d.data() } as Wish)
    );
    callback(wishes);
  });
}

export async function likeWish(id: string): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    const wish = localWishes.find((w) => w.id === id);
    if (wish) wish.likes += 1;
    notifyWishListeners();
    return;
  }
  await updateDoc(doc(db, COLLECTIONS.wishes, id), { likes: increment(1) });
}

export async function deleteWish(id: string): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    const idx = localWishes.findIndex((w) => w.id === id);
    if (idx >= 0) localWishes.splice(idx, 1);
    notifyWishListeners();
    return;
  }
  await deleteDoc(doc(db, COLLECTIONS.wishes, id));
}

export async function submitWeddingResponse(
  response: WeddingResponse
): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, COLLECTIONS.weddingResponses, response.id), {
        guestName: response.guestName,
        attendance: response.attendance,
        wishText: response.wishText,
        submittedAt: response.submittedAt,
        invitationId: response.invitationId ?? null,
        createdAt: serverTimestamp(),
      });
      return;
    } catch {
      /* fall through to localStorage */
    }
  }

  const existing = loadResponsesFromStorage();
  saveResponsesToStorage([response, ...existing]);
}

export async function getAllWeddingResponses(): Promise<WeddingResponse[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(
        collection(db, COLLECTIONS.weddingResponses),
        orderBy("submittedAt", "desc")
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: data.id ?? d.id,
          guestName: data.guestName,
          attendance: data.attendance,
          wishText: data.wishText ?? "",
          submittedAt: data.submittedAt,
          invitationId: data.invitationId,
        } as WeddingResponse;
      });
    } catch {
      /* fall through */
    }
  }

  return loadResponsesFromStorage().sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
}

export function subscribeWeddingResponses(
  callback: (responses: WeddingResponse[]) => void
): () => void {
  if (isFirebaseConfigured && db) {
    const q = query(
      collection(db, COLLECTIONS.weddingResponses),
      orderBy("submittedAt", "desc")
    );
    return onSnapshot(
      q,
      (snapshot) => {
        const responses = snapshot.docs.map((d) => {
          const data = d.data();
          return {
            id: data.id ?? d.id,
            guestName: data.guestName,
            attendance: data.attendance,
            wishText: data.wishText ?? "",
            submittedAt: data.submittedAt,
            invitationId: data.invitationId,
          } as WeddingResponse;
        });
        callback(responses);
        if (typeof window !== "undefined") {
          saveResponsesToStorage(responses);
        }
      },
      () => {
        callback(loadResponsesFromStorage());
      }
    );
  }

  const notify = () => callback(loadResponsesFromStorage());
  notify();

  if (typeof window !== "undefined") {
    window.addEventListener("wedding-responses-updated", notify);
    return () => window.removeEventListener("wedding-responses-updated", notify);
  }

  return () => {};
}

export async function deleteWeddingResponse(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, COLLECTIONS.weddingResponses, id));
      return;
    } catch {
      /* fall through */
    }
  }

  const updated = loadResponsesFromStorage().filter((r) => r.id !== id);
  saveResponsesToStorage(updated);
}

export async function getAdminStats(): Promise<AdminStats> {
  const responses = await getAllWeddingResponses();

  return {
    totalRSVP: responses.length,
    confirmedGuests: responses.filter((r) => r.attendance !== "not_attending").length,
    totalWishes: responses.filter((r) => r.wishText.trim()).length,
    pendingRSVP: responses.filter((r) => r.attendance === "alone").length,
  };
}

export async function saveWeddingConfig(config: Partial<WeddingConfig>): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  await setDoc(doc(db, COLLECTIONS.config, "wedding"), config, { merge: true });
}

export async function loadWeddingConfig(): Promise<Partial<WeddingConfig> | null> {
  if (!isFirebaseConfigured || !db) return null;
  const snapshot = await getDocs(collection(db, COLLECTIONS.config));
  if (snapshot.empty) return null;
  return snapshot.docs[0].data() as Partial<WeddingConfig>;
}

export async function uploadFile(
  file: File,
  path: string
): Promise<string> {
  if (!isFirebaseConfigured || !storage) {
    return URL.createObjectURL(file);
  }
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function uploadMusic(file: File): Promise<string> {
  const path = `music/${Date.now()}-${file.name}`;
  return uploadFile(file, path);
}
