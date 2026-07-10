"use client";

import { create } from "zustand";

interface MusicStore {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  toggle: () => void;
  setPlaying: (playing: boolean) => void;
  setMuted: (muted: boolean) => void;
  setVolume: (volume: number) => void;
}

export const useMusicStore = create<MusicStore>((set) => ({
  isPlaying: false,
  isMuted: true,
  volume: 0.3,
  toggle: () => set((s) => ({ isPlaying: !s.isPlaying, isMuted: false })),
  setPlaying: (playing) => set({ isPlaying: playing }),
  setMuted: (muted) => set({ isMuted: muted }),
  setVolume: (volume) => set({ volume }),
}));
