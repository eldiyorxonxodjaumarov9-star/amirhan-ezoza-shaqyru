"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiClipboard, HiCheck } from "react-icons/hi2";
import toast from "react-hot-toast";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoldenDivider } from "@/components/ui/GoldenDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { copyToClipboard } from "@/lib/utils";
import { useWeddingStore } from "@/store/wedding-store";

export function Gift() {
  const gift = useWeddingStore((s) => s.config.gift);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(gift.cardNumber.replace(/\s/g, ""));
    setCopied(true);
    toast.success("Көшірілді!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="gift" className="section-padding relative bg-gold/5">
      <div className="max-w-lg mx-auto">
        <SectionHeading title="Сыйлық" subtitle="Тілектеріңіз — ең үлкен сыйлық" />

        <ScrollReveal>
          <GlassCard className="text-center">
            <p className="font-[family-name:var(--font-montserrat)] text-emerald/60 text-sm font-light leading-relaxed mb-8">
              {gift.message}
            </p>

            <GoldenDivider />

            <div className="space-y-4">
              <p className="font-[family-name:var(--font-cinzel)] text-gold text-xs tracking-[0.3em] uppercase">
                {gift.bankName}
              </p>

              <p className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-emerald tracking-wider">
                {gift.cardNumber}
              </p>

              <p className="font-[family-name:var(--font-montserrat)] text-emerald/50 text-sm">
                {gift.cardHolder}
              </p>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition-all text-sm tracking-wider"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <HiCheck /> Көшірілді
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <HiClipboard /> Көшіру
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {gift.kaspiQr && (
              <>
                <GoldenDivider />
                <div className="w-40 h-40 mx-auto bg-ivory rounded-xl p-2">
                  <img src={gift.kaspiQr} alt="Kaspi QR" className="w-full h-full object-contain" />
                </div>
              </>
            )}
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
