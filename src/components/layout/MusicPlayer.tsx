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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !musicUrl) return;

    let pending = true;
    let attempting = false;

    const removeListeners = () => {
      document.removeEventListener("click", retryPlayback);
      document.removeEventListener("keydown", retryPlayback);
    };

    const cancelAutoplay = () => {
      pending = false;
      window.clearTimeout(timer);
      removeListeners();
    };

    const retryPlayback = () => {
      if (!pending || attempting) return;
      attempting = true;
      audio.volume = useMusicStore.getState().volume;
      audio.muted = false;
      audio.play().then(() => {
        if (!pending) return;
        cancelAutoplay();
        useMusicStore.setState({ isPlaying: true, isMuted: false });
      }).catch((error: unknown) => {
        if (!pending) return;
        if (error instanceof DOMException && error.name === "NotAllowedError") {
          document.addEventListener("click", retryPlayback);
          document.addEventListener("keydown", retryPlayback);
        } else {
          cancelAutoplay();
        }
      }).finally(() => {
        attempting = false;
      });
    };

    const timer = window.setTimeout(retryPlayback, 10_000);
    // Respect any manual play, pause or mute choice made before autoplay.
    const unsubscribe = useMusicStore.subscribe((state, previous) => {
      if (state.isPlaying !== previous.isPlaying || state.isMuted !== previous.isMuted) {
        cancelAutoplay();
      }
    });

    return () => {
      cancelAutoplay();
      unsubscribe();
    };
  }, [musicUrl]);

  if (!musicUrl) return null;

  return (
    <audio ref={audioRef} src={musicUrl} loop preload="auto" />
  );
}
