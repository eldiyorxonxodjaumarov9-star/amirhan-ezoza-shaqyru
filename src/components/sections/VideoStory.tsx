"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiPlay } from "react-icons/hi2";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useWeddingStore } from "@/store/wedding-store";

export function VideoStory() {
  const videoUrl = useWeddingStore((s) => s.config.videoUrl);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!videoUrl) return null;

  return (
    <section id="video" className="section-padding relative">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Бейне хикая" subtitle="Біздің сәттер" />

        <ScrollReveal>
          <GlassCard className="p-2 md:p-3 overflow-hidden relative group">
            {/* Luxury frame */}
            <div className="absolute inset-0 border border-gold/20 rounded-2xl pointer-events-none z-10" />
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/40 rounded-tl-2xl z-10" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/40 rounded-tr-2xl z-10" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/40 rounded-bl-2xl z-10" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/40 rounded-br-2xl z-10" />

            <div className="relative aspect-video rounded-xl overflow-hidden bg-cream">
              <iframe
                src={`${videoUrl}?autoplay=${isPlaying ? 1 : 0}&mute=0`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Wedding Video"
              />

              {!isPlaying && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-cream/50 backdrop-blur-sm z-20 cursor-pointer group/play"
                >
                  <div className="w-20 h-20 rounded-full bg-gold/90 flex items-center justify-center shadow-[0_0_40px_rgba(201,154,61,0.5)] group-hover/play:shadow-[0_0_60px_rgba(201,154,61,0.7)] transition-shadow">
                    <HiPlay className="text-emerald text-3xl ml-1" />
                  </div>
                </motion.button>
              )}
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
