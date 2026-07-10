"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OrnamentProps {
  className?: string;
  variant?: "floral" | "geometric" | "line";
}

export function Ornament({ className, variant = "floral" }: OrnamentProps) {
  if (variant === "line") {
    return (
      <svg className={cn("w-full h-8 text-gold/40", className)} viewBox="0 0 400 32" fill="none">
        <path d="M0 16 H150 M250 16 H400" stroke="currentColor" strokeWidth="0.5" />
        <path d="M160 16 L180 8 L200 16 L180 24 Z" fill="currentColor" opacity="0.6" />
        <circle cx="200" cy="16" r="3" fill="currentColor" />
      </svg>
    );
  }

  if (variant === "geometric") {
    return (
      <motion.svg
        className={cn("w-16 h-16 text-gold/50", className)}
        viewBox="0 0 64 64"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <polygon points="32,4 60,32 32,60 4,32" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <polygon points="32,12 52,32 32,52 12,32" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.6" />
      </motion.svg>
    );
  }

  return (
    <svg className={cn("w-24 h-12 text-gold/60", className)} viewBox="0 0 96 48" fill="none">
      <path
        d="M48 24 C48 24 40 8 24 8 C8 8 8 24 24 24 C40 24 48 40 48 40 C48 40 56 24 72 24 C88 24 88 8 72 8 C56 8 48 24 48 24Z"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
      />
      <circle cx="48" cy="24" r="2" fill="currentColor" />
    </svg>
  );
}
