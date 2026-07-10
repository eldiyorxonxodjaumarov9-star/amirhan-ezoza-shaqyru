"use client";

import { motion } from "framer-motion";
import { HiChatBubbleBottomCenter } from "react-icons/hi2";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  WeddingResponse,
  attendanceDisplayLabels,
  formatResponseDate,
} from "@/lib/wedding-responses";

interface ResponseCardProps {
  response: WeddingResponse;
  index?: number;
}

export function ResponseCard({ response, index = 0 }: ResponseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      <GlassCard hover className="h-full !p-5 md:!p-6">
        <p className="font-[family-name:var(--font-cinzel)] text-gold text-sm md:text-base tracking-[0.15em] uppercase mb-2">
          {response.guestName}
        </p>
        <p className="font-[family-name:var(--font-montserrat)] text-emerald/70 text-sm mb-3">
          {attendanceDisplayLabels[response.attendance]}
        </p>
        {response.wishText.trim() && (
          <div className="flex gap-2 items-start mb-4">
            <HiChatBubbleBottomCenter className="text-gold/60 shrink-0 mt-0.5 text-sm" />
            <p className="font-[family-name:var(--font-cormorant)] text-emerald/85 text-base italic leading-relaxed">
              &ldquo;{response.wishText}&rdquo;
            </p>
          </div>
        )}
        <p className="font-[family-name:var(--font-montserrat)] text-emerald/35 text-xs tracking-wide">
          {formatResponseDate(response.submittedAt)}
        </p>
      </GlassCard>
    </motion.div>
  );
}
