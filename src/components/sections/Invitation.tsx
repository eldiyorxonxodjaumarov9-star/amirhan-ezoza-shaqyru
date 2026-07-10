"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { GoldenDivider } from "@/components/ui/GoldenDivider";
import { Ornament } from "@/components/ui/Ornament";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useWeddingStore } from "@/store/wedding-store";

export function Invitation() {
  const { config } = useWeddingStore();

  return (
    <section id="invitation" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pearl via-cream/50 to-snow" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <SectionHeading title={config.invitationTitle} />

        <ScrollReveal>
          <motion.div
            whileHover={{ rotateY: 2, rotateX: -1 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{ perspective: 1000 }}
          >
            <GlassCard className="relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />

              <div className="text-center relative z-10">
                <Ornament className="mx-auto mb-6" />

                <div className="mb-10">
                  <p className="font-[family-name:var(--font-cinzel)] text-gold text-xs tracking-[0.3em] uppercase mb-4">
                    {config.parentsTitle}
                  </p>
                  <p className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-emerald tracking-wide">
                    {config.parentsFamily}
                  </p>
                </div>

                <GoldenDivider />

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="font-[family-name:var(--font-cormorant)] text-lg md:text-xl text-emerald/90 leading-relaxed md:leading-[2] font-light px-2 md:px-6 whitespace-pre-line"
                >
                  {config.invitationText}
                </motion.div>

                <GoldenDivider />

                <div className="flex items-center justify-center gap-6">
                  <Ornament variant="geometric" />
                  <p className="font-[family-name:var(--font-playfair)] text-soft-gold text-2xl md:text-3xl italic name-glow">
                    {config.groomName} & {config.brideName}
                  </p>
                  <Ornament variant="geometric" />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
