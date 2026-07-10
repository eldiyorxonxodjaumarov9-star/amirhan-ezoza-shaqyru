"use client";

import { create } from "zustand";
import { defaultWeddingConfig } from "@/data/default-wedding";
import { WeddingConfig } from "@/types";

interface WeddingStore {
  config: WeddingConfig;
  isLoaded: boolean;
  invitationOpened: boolean;
  setConfig: (config: Partial<WeddingConfig>) => void;
  openInvitation: () => void;
  setLoaded: (loaded: boolean) => void;
}

export const useWeddingStore = create<WeddingStore>((set) => ({
  config: defaultWeddingConfig,
  isLoaded: false,
  invitationOpened: false,
  setConfig: (partial) =>
    set((state) => ({ config: { ...state.config, ...partial } })),
  openInvitation: () => set({ invitationOpened: true }),
  setLoaded: (loaded) => set({ isLoaded: loaded }),
}));
