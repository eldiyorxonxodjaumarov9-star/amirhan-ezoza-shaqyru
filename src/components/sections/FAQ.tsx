"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi2";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useWeddingStore } from "@/store/wedding-store";

export function FAQ() {
  const faq = useWeddingStore((s) => s.config.faq);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="section-padding relative bg-forest/20">
      <div className="max-w-2xl mx-auto">
        <SectionHeading title="Сұрақ-жауап" subtitle="Жиі қойылатын сұрақтар" />

        <div className="space-y-3">
          {faq.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.08}>
              <GlassCard className="!p-0 overflow-hidden">
                <button
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                >
                  <span className="font-[family-name:var(--font-cormorant)] text-lg text-ivory pr-4">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openId === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HiChevronDown className="text-gold shrink-0" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-[family-name:var(--font-montserrat)] text-ivory/60 text-sm px-5 md:px-6 pb-5 md:pb-6 font-light leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
