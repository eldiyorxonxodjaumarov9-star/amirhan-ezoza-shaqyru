"use client";

import { motion } from "framer-motion";
import { HiArrowUp, HiOutlineMusicalNote } from "react-icons/hi2";
import { FaInstagram, FaTelegram } from "react-icons/fa";
import { Shanyraq } from "@/components/ui/Shanyraq";
import { GoldenDivider } from "@/components/ui/GoldenDivider";
import { useWeddingStore } from "@/store/wedding-store";
import { useMusicStore } from "@/store/music-store";

export function Footer() {
  const { config } = useWeddingStore();
  const { isPlaying, toggle } = useMusicStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-20 pb-32 md:pb-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <Shanyraq size={60} className="mx-auto mb-8 opacity-60" animate={false} />

        <h3 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl text-ivory font-light mb-6 tracking-wide">
          {config.closingTitle}
        </h3>

        <GoldenDivider className="my-8" />

        <p className="font-[family-name:var(--font-playfair)] text-soft-gold text-2xl md:text-3xl italic name-glow">
          {config.closingNames}
        </p>

        <p className="font-[family-name:var(--font-cinzel)] text-gold text-lg md:text-xl tracking-[0.2em] mt-8">
          {config.displayDate}
        </p>

        <div className="flex items-center justify-center gap-6 mt-10">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold/40 transition-all"
          >
            <FaInstagram />
          </a>
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold/40 transition-all"
          >
            <FaTelegram />
          </a>
          <button
            onClick={toggle}
            className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold/40 transition-all"
            aria-label="Toggle music"
          >
            <HiOutlineMusicalNote className={isPlaying ? "text-gold" : ""} />
          </button>
        </div>

        <motion.button
          whileHover={{ y: -3 }}
          onClick={scrollToTop}
          className="mt-10 inline-flex items-center gap-2 text-gold/50 hover:text-gold text-xs tracking-widest uppercase transition-colors"
        >
          <HiArrowUp />
          Жоғарыға
        </motion.button>
      </div>
    </footer>
  );
}
