"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShanyraqProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

export function Shanyraq({ className, size = 120, animate = true }: ShanyraqProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={cn("text-gold", className)}
      animate={animate ? { rotate: 360 } : undefined}
      transition={animate ? { duration: 60, repeat: Infinity, ease: "linear" } : undefined}
    >
      {/* Outer circle */}
      <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />

      {/* Shanyraq cross beams */}
      {[0, 45, 90, 135].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 100 100)`}>
          <path
            d="M100 20 Q110 60 100 100 Q90 60 100 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.8"
          />
          <circle cx="100" cy="25" r="4" fill="currentColor" opacity="0.9" />
          <circle cx="100" cy="55" r="2.5" fill="currentColor" opacity="0.6" />
        </g>
      ))}

      {/* Center ornament */}
      <circle cx="100" cy="100" r="12" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="6" fill="currentColor" opacity="0.8" />

      {/* Kazakh geometric pattern */}
      {[0, 90, 180, 270].map((angle) => (
        <g key={`geo-${angle}`} transform={`rotate(${angle} 100 100)`}>
          <path
            d="M100 70 L108 85 L100 90 L92 85 Z"
            fill="currentColor"
            opacity="0.4"
          />
        </g>
      ))}

      {/* Decorative dots */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        const x = 100 + 75 * Math.cos(a);
        const y = 100 + 75 * Math.sin(a);
        return <circle key={i} cx={x} cy={y} r="2" fill="currentColor" opacity="0.5" />;
      })}
    </motion.svg>
  );
}
