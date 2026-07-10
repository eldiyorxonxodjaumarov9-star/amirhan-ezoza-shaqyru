export type AttendanceType = "alone" | "with_spouse" | "not_attending";

export type WeddingResponse = {
  id: string;
  guestName: string;
  attendance: AttendanceType;
  wishText: string;
  submittedAt: string;
  invitationId?: string;
};

export const STORAGE_KEY = "wedding-combined-responses";

export const attendanceFormOptions = [
  { value: "alone" as const, label: "Иә, міндетті түрде келемін" },
  { value: "with_spouse" as const, label: "Жұбайыммен бірге келемін" },
  { value: "not_attending" as const, label: "Өкінішке қарай, келе алмаймын" },
];

export const attendanceDisplayLabels: Record<AttendanceType, string> = {
  alone: "Иә, міндетті түрде келеді",
  with_spouse: "Жұбайымен бірге келеді",
  not_attending: "Өкінішке қарай, келе алмайды",
};

export function generateResponseId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export function formatResponseDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString("kk-KZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function loadResponsesFromStorage(): WeddingResponse[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

export function saveResponsesToStorage(responses: WeddingResponse[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
  window.dispatchEvent(new CustomEvent("wedding-responses-updated"));
}
