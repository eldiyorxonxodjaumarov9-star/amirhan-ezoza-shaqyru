"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { GSAPProvider } from "@/components/effects/GSAPProvider";
import { PageLoader } from "@/components/layout/PageLoader";
import { CursorGlow } from "@/components/layout/CursorGlow";
import { MusicPlayer } from "@/components/layout/MusicPlayer";
import { MobileNav } from "@/components/layout/MobileNav";
import { Hero } from "@/components/sections/Hero";
import { Invitation } from "@/components/sections/Invitation";
import { WeddingAbout } from "@/components/sections/WeddingAbout";
import { EventInfo } from "@/components/sections/EventInfo";
import { VideoStory } from "@/components/sections/VideoStory";
import { CombinedResponse } from "@/components/sections/CombinedResponse";
import { Gift } from "@/components/sections/Gift";
import { Family } from "@/components/sections/Family";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <PageLoader onComplete={handleLoadComplete} />}
      </AnimatePresence>

      <main className="relative luxury-gradient min-h-screen">
        <GSAPProvider>
        <CursorGlow />
        <MusicPlayer />

        <Hero />
        <Invitation />
        <WeddingAbout />
        <EventInfo />
        <VideoStory />
        <CombinedResponse />
        <Gift />
        <Family />
        <FAQ />
        <Footer />

        <MobileNav />
        </GSAPProvider>
      </main>
    </>
  );
}
