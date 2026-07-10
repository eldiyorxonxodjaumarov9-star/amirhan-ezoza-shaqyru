"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiHome,
  HiEnvelope,
  HiHeart,
  HiClock,
  HiMapPin,
  HiGift,
} from "react-icons/hi2";

const navItems = [
  { id: "hero", icon: HiHome, label: "Басты" },
  { id: "invitation", icon: HiEnvelope, label: "Шақыру" },
  { id: "countdown", icon: HiClock, label: "Уақыт" },
  { id: "event", icon: HiMapPin, label: "Той" },
  { id: "rsvp", icon: HiHeart, label: "RSVP" },
  { id: "gift", icon: HiGift, label: "Сыйлық" },
];

export function MobileNav() {
  const [active, setActive] = useState("hero");

  const scrollTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="mx-3 mb-3 glass-card rounded-2xl px-2 py-2">
        <div className="flex items-center justify-around overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative flex flex-col items-center gap-0.5 px-2 py-1.5 min-w-[48px]"
            >
              <AnimatePresence>
                {active === item.id && (
                  <motion.div
                    layoutId="mobile-nav-active"
                    className="absolute inset-0 bg-gold/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </AnimatePresence>
              <item.icon
                className={`text-lg relative z-10 transition-colors ${
                  active === item.id ? "text-gold" : "text-ivory/40"
                }`}
              />
              <span
                className={`text-[9px] relative z-10 transition-colors ${
                  active === item.id ? "text-gold" : "text-ivory/30"
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
