"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "center" | "left";
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <p className="font-[family-name:var(--font-cinzel)] text-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-3">
        ✦ Той ✦
      </p>
      <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl lg:text-6xl font-light text-emerald leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="font-[family-name:var(--font-montserrat)] text-emerald/60 text-sm md:text-base mt-4 max-w-xl mx-auto font-light tracking-wide">
          {subtitle}
        </p>
      )}
      <div className="ornament-line w-24 md:w-32 mx-auto mt-6" />
    </motion.div>
  );
}
