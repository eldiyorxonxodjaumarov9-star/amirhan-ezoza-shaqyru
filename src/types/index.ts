export interface WeddingConfig {
  brideName: string;
  groomName: string;
  weddingDate: string;
  subtitle: string;
  displayDate: string;
  invitationTitle: string;
  parentsTitle: string;
  parentsFamily: string;
  countdownTitle: string;
  mapButtonText: string;
  closingTitle: string;
  closingNames: string;
  rsvpTitle: string;
  heroImage?: string;
  musicUrl?: string;
  parents: {
    bride: { father: string; mother: string };
    groom: { father: string; mother: string };
  };
  invitationText: string;
  event: EventDetails;
  gift: GiftInfo;
  family: FamilyMember[];
  faq: FAQItem[];
  videoUrl?: string;
}

export interface EventDetails {
  date: string;
  time: string;
  venue: string;
  address: string;
  dressCode: string;
  parking: string;
  mapLat: number;
  mapLng: number;
  mapQuery?: string;
  mapEmbed?: string;
}

export interface GiftInfo {
  bankName: string;
  cardNumber: string;
  cardHolder: string;
  kaspiQr?: string;
  message: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  role: string;
  relation: string;
  image?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface RSVPData {
  id?: string;
  name: string;
  phone?: string;
  attendance: "yes" | "with_spouse" | "declined";
  guestCount?: number;
  notes?: string;
  createdAt?: string;
  status?: "pending" | "confirmed" | "declined";
}

export interface Wish {
  id: string;
  name: string;
  message: string;
  likes: number;
  createdAt: string;
}

export interface AdminStats {
  totalRSVP: number;
  confirmedGuests: number;
  totalWishes: number;
  pendingRSVP: number;
}
