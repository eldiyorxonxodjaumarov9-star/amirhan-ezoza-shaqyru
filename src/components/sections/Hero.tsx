"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { HiOutlineMusicalNote } from "react-icons/hi2";
import { IoChevronDown } from "react-icons/io5";
import { Shanyraq } from "@/components/ui/Shanyraq";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GoldenParticles } from "@/components/effects/GoldenParticles";
import { useWeddingStore } from "@/store/wedding-store";
import { useMusicStore } from "@/store/music-store";

export function Hero() {
  const { config, openInvitation } = useWeddingStore();
  const { isPlaying, toggle } = useMusicStore();
  const sectionRef = useRef<HTMLElement>(null);

  const formattedDate = config.displayDate;

  const scrollToInvitation = () => {
    openInvitation();
    document.getElementById("invitation")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 luxury-gradient" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(201,154,61,0.12) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 80%, rgba(245,238,221,0.9) 0%, transparent 50%)`,
        }}
      />

      {/* Islamic geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C99A3D' fill-opacity='1'%3E%3Cpath d='M30 0l5 10 10 5-10 5-5 10-5-10-10-5 10-5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <GoldenParticles count={50} />

      {/* Corner ornaments */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-gold/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-gold/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-gold/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-gold/30" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <Shanyraq size={90} className="mx-auto" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-[family-name:var(--font-cinzel)] text-gold text-xs md:text-sm tracking-[0.5em] uppercase mb-6"
        >
          {config.invitationTitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none tracking-wide">
            <span className="gold-text name-glow inline-block">{config.groomName}</span>
          </h1>
          <motion.div
            className="my-4 md:my-6 flex items-center justify-center gap-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="w-12 h-px bg-gold/50" />
            <span className="font-[family-name:var(--font-playfair)] text-soft-gold text-2xl md:text-3xl italic">
              +
            </span>
            <div className="w-12 h-px bg-gold/50" />
          </motion.div>
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none tracking-wide">
            <span className="gold-text name-glow inline-block">{config.brideName}</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="font-[family-name:var(--font-montserrat)] text-emerald/70 text-sm md:text-base mt-10 max-w-lg mx-auto font-light leading-relaxed tracking-wide"
        >
          {config.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="font-[family-name:var(--font-cinzel)] text-soft-gold text-lg md:text-xl mt-6 tracking-widest"
        >
          {formattedDate}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <MagneticButton onClick={scrollToInvitation}>
            Шақыруды ашу
          </MagneticButton>
          <MagneticButton variant="outline" onClick={toggle}>
            <HiOutlineMusicalNote className="text-lg" />
            {isPlaying ? "Музыканы тоқтату" : "Музыканы қосу"}
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <IoChevronDown className="text-gold/50 text-2xl" />
      </motion.div>
    </section>
  );
}
