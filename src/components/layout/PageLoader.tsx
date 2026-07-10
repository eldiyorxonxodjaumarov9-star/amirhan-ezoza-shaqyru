"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shanyraq } from "@/components/ui/Shanyraq";

export function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[9999] luxury-gradient flex flex-col items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Shanyraq size={100} animate />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-[family-name:var(--font-cinzel)] text-gold text-sm tracking-[0.4em] uppercase mt-8"
        >
          Шақыру
        </motion.p>

        <div className="w-48 h-px bg-ivory/10 mt-8 rounded-full overflow-hidden">
          <motion.div
            className="h-full gold-gradient rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        <motion.p
          className="font-[family-name:var(--font-montserrat)] text-ivory/40 text-xs mt-4 tracking-widest"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {Math.min(Math.round(progress), 100)}%
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
