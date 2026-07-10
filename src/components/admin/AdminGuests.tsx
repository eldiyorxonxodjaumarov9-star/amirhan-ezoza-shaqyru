"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiTrash } from "react-icons/hi2";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  getAllWeddingResponses,
  deleteWeddingResponse,
} from "@/lib/firebase-services";
import {
  WeddingResponse,
  attendanceDisplayLabels,
  formatResponseDate,
} from "@/lib/wedding-responses";

export function AdminGuests({ onUpdate }: { onUpdate: () => void }) {
  const [guests, setGuests] = useState<WeddingResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const data = await getAllWeddingResponses();
    setGuests(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Жоюға сенімдісіз бе?")) return;
    await deleteWeddingResponse(id);
    toast.success("Жойылды");
    load();
    onUpdate();
  };

  if (loading) {
    return <div className="text-emerald/40 text-center py-12">Жүктелуде...</div>;
  }

  return (
    <div>
      <h2 className="font-[family-name:var(--font-cormorant)] text-3xl text-emerald mb-8">
        Қонақтар тізімі
      </h2>

      {guests.length === 0 ? (
        <p className="text-emerald/40 text-center py-12">Әзірге жауап жоқ</p>
      ) : (
        <div className="space-y-3">
          {guests.map((guest) => (
            <GlassCard key={guest.id} className="!p-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <p className="font-[family-name:var(--font-cormorant)] text-lg text-emerald">
                    {guest.guestName}
                  </p>
                  <p className="text-emerald/40 text-sm mt-1">
                    {attendanceDisplayLabels[guest.attendance]}
                  </p>
                  {guest.wishText.trim() && (
                    <p className="text-emerald/50 text-sm mt-2 italic">
                      &ldquo;{guest.wishText}&rdquo;
                    </p>
                  )}
                  <p className="text-emerald/30 text-xs mt-2">
                    {formatResponseDate(guest.submittedAt)}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(guest.id)}
                  className="w-8 h-8 rounded-lg bg-ivory/5 text-emerald/40 hover:text-red-400 flex items-center justify-center shrink-0"
                >
                  <HiTrash />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
