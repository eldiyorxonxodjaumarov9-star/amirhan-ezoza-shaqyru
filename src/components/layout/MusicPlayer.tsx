"use client";

import { useEffect, useRef } from "react";
import { useMusicStore } from "@/store/music-store";
import { useWeddingStore } from "@/store/wedding-store";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isPlaying, isMuted, volume } = useMusicStore();
  const musicUrl = useWeddingStore((s) => s.config.musicUrl);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.muted = isMuted;

    if (isPlaying && !isMuted) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying, isMuted, volume]);

  if (!musicUrl) return null;

  return (
    <audio ref={audioRef} src={musicUrl} loop preload="none" />
  );
}
