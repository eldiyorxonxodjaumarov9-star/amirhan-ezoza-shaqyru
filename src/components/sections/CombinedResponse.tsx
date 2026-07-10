"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ResponseCard } from "@/components/ui/ResponseCard";
import {
  submitWeddingResponse,
  subscribeWeddingResponses,
} from "@/lib/firebase-services";
import {
  AttendanceType,
  WeddingResponse,
  attendanceFormOptions,
  generateResponseId,
} from "@/lib/wedding-responses";

export function CombinedResponse() {
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState<AttendanceType | "">("");
  const [wishText, setWishText] = useState("");
  const [responses, setResponses] = useState<WeddingResponse[]>([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const unsubscribe = subscribeWeddingResponses(setResponses);
    return unsubscribe;
  }, []);

  const inputClass =
    "w-full bg-ivory/5 border border-gold/20 rounded-xl px-4 py-3.5 text-ivory placeholder:text-ivory/30 text-sm font-light transition-all focus:border-gold/50";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!guestName.trim()) {
      setError("Аты-жөніңізді жазыңыз");
      return;
    }

    if (!attendance) {
      setError("Бір жауапты таңдаңыз");
      return;
    }

    setSubmitting(true);

    const newResponse: WeddingResponse = {
      id: generateResponseId(),
      guestName: guestName.trim(),
      attendance,
      wishText: wishText.trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      await submitWeddingResponse(newResponse);
      setGuestName("");
      setAttendance("");
      setWishText("");
      setSuccessMessage("Рақмет! Жауабыңыз бен тілегіңіз сақталды.");
    } catch {
      setError("Қате орын алды. Қайта көріңіз.");
    } finally {
      setSubmitting(false);
    }
  };

  const latestResponses = responses.slice(0, 3);

  return (
    <section id="rsvp" className="section-padding relative bg-forest/20">
      <div className="max-w-[900px] mx-auto px-4">
        <SectionHeading
          title="Тойға келесіз бе?"
          subtitle="Қатысуыңызды растаңыз және жас жұбайларға тілегіңізді қалдырыңыз"
        />

        <ScrollReveal>
          <GlassCard className="!p-6 md:!p-10">
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div>
                <label className="font-[family-name:var(--font-montserrat)] text-gold text-xs tracking-[0.2em] uppercase mb-2 block">
                  Атыңыз
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className={inputClass}
                  placeholder="Аты-жөніңізді жазыңыз"
                />
              </div>

              <div>
                <label className="font-[family-name:var(--font-montserrat)] text-gold text-xs tracking-[0.2em] uppercase mb-3 block">
                  Жауабыңыз
                </label>
                <div className="space-y-3">
                  {attendanceFormOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center px-4 py-4 rounded-xl border cursor-pointer transition-all text-sm leading-relaxed ${
                        attendance === opt.value
                          ? "border-gold bg-gold/10 text-gold shadow-[0_0_20px_rgba(201,154,61,0.15)]"
                          : "border-gold/20 text-ivory/70 hover:border-gold/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value={opt.value}
                        checked={attendance === opt.value}
                        onChange={() => setAttendance(opt.value)}
                        className="sr-only"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-[family-name:var(--font-montserrat)] text-gold text-xs tracking-[0.2em] uppercase mb-2 block">
                  Тілеңіз
                </label>
                <textarea
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder="Тілегіңізді жазыңыз..."
                />
              </div>

              {error && (
                <p className="text-red-400/90 text-sm text-center font-light">{error}</p>
              )}

              {successMessage && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gold text-sm text-center font-light"
                >
                  {successMessage}
                </motion.p>
              )}

              <MagneticButton type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Жіберілуде..." : "Жауап пен тілекті жіберу"}
              </MagneticButton>
            </form>
          </GlassCard>
        </ScrollReveal>

        {mounted && latestResponses.length > 0 && (
          <div className="mt-12 md:mt-16">
            <h3 className="font-[family-name:var(--font-cinzel)] text-gold text-xs md:text-sm tracking-[0.25em] uppercase text-center mb-6 md:mb-8">
              Соңғы жауаптар мен тілектер
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {latestResponses.map((response, index) => (
                <ResponseCard key={response.id} response={response} index={index} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 md:mt-10 text-center">
          <Link
            href="/responses"
            className="inline-flex items-center justify-center font-[family-name:var(--font-cinzel)] text-gold text-xs tracking-[0.2em] uppercase border border-gold/30 rounded-full px-6 py-3 hover:bg-gold/10 hover:border-gold/50 transition-all duration-300"
          >
            Барлық жауаптар мен тілектерді көру
          </Link>
        </div>
      </div>
    </section>
  );
}
