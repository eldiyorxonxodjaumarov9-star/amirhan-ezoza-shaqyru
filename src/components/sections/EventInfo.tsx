"use client";

import { HiCalendar, HiClock, HiMapPin } from "react-icons/hi2";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useWeddingStore } from "@/store/wedding-store";

const infoItems = [
  { key: "date", icon: HiCalendar, label: "Күні" },
  { key: "time", icon: HiClock, label: "Уақыты" },
  { key: "venue", icon: HiMapPin, label: "Өтетін орны" },
] as const;

export function EventInfo() {
  const { config } = useWeddingStore();
  const { event } = config;

  const getValue = (key: string) => {
    if (key === "venue") {
      const venueName = event.venue.replace(/\s*мейрамханасы\s*$/i, "").trim();
      return `${event.address}\n\n${venueName}\nмейрамханасы`;
    }
    const map: Record<string, string> = {
      date: event.date,
      time: event.time,
    };
    return map[key] || "";
  };

  return (
    <section id="event" className="section-padding relative bg-forest/20">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Той туралы" subtitle="Барлық маңызды ақпарат" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {infoItems.map((item, index) => (
            <ScrollReveal
              key={item.key}
              delay={index * 0.1}
              className={
                index === 2
                  ? "md:col-span-2 md:max-w-md md:mx-auto md:w-full lg:col-span-1 lg:max-w-none"
                  : undefined
              }
            >
              <GlassCard hover className="h-full">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                    <item.icon className="text-gold text-lg" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-[family-name:var(--font-cinzel)] text-gold text-xs tracking-[0.2em] uppercase mb-2">
                      {item.label}
                    </p>
                    <p className="font-[family-name:var(--font-montserrat)] text-ivory/80 text-sm leading-relaxed font-light whitespace-pre-line">
                      {getValue(item.key)}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
