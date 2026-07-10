"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useWeddingStore } from "@/store/wedding-store";

export function Family() {
  const family = useWeddingStore((s) => s.config.family);

  const groups = [
    { title: "Ата-аналар", filter: "parents" },
    { title: "Аталар мен аналар", filter: "grandparents" },
    { title: "Достар", filter: ["bestman", "bridesmaid"] },
  ];

  return (
    <section id="family" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Отбасы" subtitle="Біздің жақындарымыз" />

        {groups.map((group) => {
          const members = family.filter((m) =>
            Array.isArray(group.filter)
              ? group.filter.includes(m.relation)
              : m.relation === group.filter
          );
          if (members.length === 0) return null;

          return (
            <div key={group.title} className="mb-12">
              <h3 className="font-[family-name:var(--font-cinzel)] text-gold text-sm tracking-[0.3em] uppercase text-center mb-8">
                {group.title}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {members.map((member, index) => (
                  <ScrollReveal key={member.id} delay={index * 0.1}>
                    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
                      <GlassCard hover className="text-center !p-6">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center mb-4">
                          <span className="font-[family-name:var(--font-cormorant)] text-2xl text-gold">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                        <h4 className="font-[family-name:var(--font-cormorant)] text-lg text-emerald">
                          {member.name}
                        </h4>
                        <p className="font-[family-name:var(--font-montserrat)] text-emerald/40 text-xs mt-1 tracking-wide">
                          {member.role}
                        </p>
                      </GlassCard>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
