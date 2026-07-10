"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = "ontouchstart" in window;
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9998] mix-blend-screen hidden md:block"
      animate={{ x: position.x - 200, y: position.y - 200 }}
      transition={{ type: "spring", stiffness: 50, damping: 20, mass: 0.5 }}
    >
      <div className="w-[400px] h-[400px] rounded-full bg-gradient-radial from-gold/8 via-gold/3 to-transparent" />
    </motion.div>
  );
}
