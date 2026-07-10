"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { GoldenDivider } from "@/components/ui/GoldenDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useWeddingStore } from "@/store/wedding-store";

const TARGET_DATE = new Date("2026-11-11T17:00:00+05:00").getTime();

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFinished: boolean;
};

const formatNumber = (value: number) => String(value).padStart(2, "0");

function CountdownMiniCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-gold/25 bg-emerald/50 py-4 md:py-5 px-2 text-center relative overflow-hidden group transition-colors hover:border-gold/40">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-cinzel)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl gold-text block"
          suppressHydrationWarning
        >
          {value}
        </motion.span>
      </AnimatePresence>
      <span className="font-[family-name:var(--font-montserrat)] text-ivory/50 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-2 block">
        {label}
      </span>
    </div>
  );
}

export function WeddingAbout() {
  const { config } = useWeddingStore();
  const { event } = config;
  const celebratedRef = useRef(false);

  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isFinished: false,
  });

  const items = [
    {
      label: "Той иелері:",
      value: config.parentsFamily,
    },
    {
      label: "Тойдың басталу уақыты:",
      value: `${event.date} / сағат ${event.time}`,
    },
    {
      label: "Тойдың мекен-жайы:",
      value: `${event.address},\n${event.venue}`,
    },
  ];

  useEffect(() => {
    setMounted(true);

    const updateCountdown = () => {
      const now = Date.now();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isFinished: true,
        });
        return;
      }

      setTimeLeft({
        days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
        hours: Math.max(
          0,
          Math.floor((difference / (1000 * 60 * 60)) % 24)
        ),
        minutes: Math.max(
          0,
          Math.floor((difference / (1000 * 60)) % 60)
        ),
        seconds: Math.max(
          0,
          Math.floor((difference / 1000) % 60)
        ),
        isFinished: false,
      });
    };

    updateCountdown();

    const interval = window.setInterval(() => {
      updateCountdown();

      const now = Date.now();
      if (TARGET_DATE - now <= 0 && !celebratedRef.current) {
        celebratedRef.current = true;
        import("canvas-confetti").then(({ default: confetti }) => {
          const duration = 3000;
          const end = Date.now() + duration;
          const colors = ["#C99A3D", "#F2D58A", "#FFF8EF"];

          const frame = () => {
            confetti({
              particleCount: 3,
              angle: 60,
              spread: 55,
              origin: { x: 0, y: 0.7 },
              colors,
            });
            confetti({
              particleCount: 3,
              angle: 120,
              spread: 55,
              origin: { x: 1, y: 0.7 },
              colors,
            });
            if (Date.now() < end) requestAnimationFrame(frame);
          };
          frame();
        });
      }
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const countdownUnits = [
    { value: formatNumber(timeLeft.days), label: "КҮН" },
    { value: formatNumber(timeLeft.hours), label: "САҒАТ" },
    { value: formatNumber(timeLeft.minutes), label: "МИНУТ" },
    { value: formatNumber(timeLeft.seconds), label: "СЕКУНД" },
  ];

  return (
    <section id="countdown" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald via-forest/30 to-emerald" />

      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <ScrollReveal>
          <GlassCard className="text-center !py-8 md:!py-12 !px-6 md:!px-10">
            <h2 className="font-[family-name:var(--font-cinzel)] text-gold text-sm md:text-base tracking-[0.35em] uppercase mb-8 md:mb-10">
              ТОЙ ЖАЙЛЫ
            </h2>

            <div className="space-y-6 md:space-y-8">
              {items.map((item) => (
                <div key={item.label}>
                  <p className="font-[family-name:var(--font-montserrat)] text-gold text-xs md:text-sm tracking-[0.15em] uppercase mb-2 md:mb-3">
                    {item.label}
                  </p>
                  <p className="font-[family-name:var(--font-cormorant)] text-ivory text-lg md:text-xl lg:text-2xl font-light leading-relaxed whitespace-pre-line">
                    {item.value}
                  </p>
                  <GoldenDivider className="!my-6 md:!my-8" withOrnament={false} />
                </div>
              ))}
            </div>

            <div className="mt-2 md:mt-4">
              <h3 className="font-[family-name:var(--font-cinzel)] text-gold text-xs md:text-sm tracking-[0.25em] uppercase mb-3">
                {timeLeft.isFinished
                  ? "Той басталды!"
                  : "Тойдың басталуына қалды"}
              </h3>
              <p className="font-[family-name:var(--font-montserrat)] text-ivory/60 text-sm font-light mb-8 md:mb-10">
                Күтеміз сіздерді
              </p>

              {mounted && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-xl md:max-w-none mx-auto">
                  {countdownUnits.map((unit) => (
                    <CountdownMiniCard
                      key={unit.label}
                      value={unit.value}
                      label={unit.label}
                    />
                  ))}
                </div>
              )}
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
