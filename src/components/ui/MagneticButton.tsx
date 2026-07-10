"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
}

export function MagneticButton({
  children,
  onClick,
  className,
  variant = "primary",
  type = "button",
  disabled,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.15, y: y * 0.15 });
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-gold via-soft-gold to-gold text-emerald font-semibold shadow-[0_4px_24px_rgba(201,154,61,0.3)] hover:shadow-[0_8px_32px_rgba(201,154,61,0.5)]",
    outline:
      "border border-gold/50 text-gold hover:bg-gold/10 hover:border-gold",
    ghost: "text-emerald/80 hover:text-gold hover:bg-gold/5",
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "relative overflow-hidden px-8 py-3.5 rounded-full text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {variant === "primary" && (
        <motion.span
          className="absolute inset-0 bg-white/20"
          initial={{ x: "-100%", skewX: -15 }}
          whileHover={{ x: "200%" }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.button>
  );
}
