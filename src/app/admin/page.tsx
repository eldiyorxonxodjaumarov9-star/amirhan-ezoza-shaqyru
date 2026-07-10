"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  HiUsers,
  HiHeart,
  HiCog6Tooth,
  HiArrowLeftOnRectangle,
  HiChartBar,
  HiMusicalNote,
} from "react-icons/hi2";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { getAdminStats } from "@/lib/firebase-services";
import { AdminStats } from "@/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { AdminGuests } from "@/components/admin/AdminGuests";
import { AdminSettings } from "@/components/admin/AdminSettings";

type Tab = "dashboard" | "guests" | "settings";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Бақылау", icon: HiChartBar },
  { id: "guests", label: "Қонақтар", icon: HiUsers },
  { id: "settings", label: "Баптау", icon: HiCog6Tooth },
];

export default function AdminPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [stats, setStats] = useState<AdminStats>({
    totalRSVP: 0,
    confirmedGuests: 0,
    totalWishes: 0,
    pendingRSVP: 0,
  });

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthenticated(true);
        } else {
          router.push("/admin/login");
        }
        setLoading(false);
      });
      return unsub;
    }

    const session = sessionStorage.getItem("admin-auth");
    if (session === "true") {
      setAuthenticated(true);
    } else {
      router.push("/admin/login");
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (authenticated) {
      getAdminStats().then(setStats);
    }
  }, [authenticated, activeTab]);

  const handleLogout = async () => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    sessionStorage.removeItem("admin-auth");
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen luxury-gradient flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) return null;

  const statCards = [
    { label: "Барлық RSVP", value: stats.totalRSVP, icon: HiUsers },
    { label: "Расталған", value: stats.confirmedGuests, icon: HiChartBar },
    { label: "Күтуде", value: stats.pendingRSVP, icon: HiMusicalNote },
    { label: "Тілектер", value: stats.totalWishes, icon: HiHeart },
  ];

  return (
    <div className="min-h-screen luxury-gradient">
      <header className="border-b border-gold/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-gold/60 hover:text-gold text-sm transition-colors">
            ← Сайтқа оралу
          </Link>
          <h1 className="font-[family-name:var(--font-cinzel)] text-ivory text-lg tracking-widest hidden sm:block">
            Admin Panel
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-ivory/50 hover:text-gold text-sm transition-colors"
        >
          <HiArrowLeftOnRectangle />
          Шығу
        </button>
      </header>

      <div className="flex flex-col lg:flex-row">
        <nav className="lg:w-56 border-b lg:border-b-0 lg:border-r border-gold/10 p-4">
          <div className="flex lg:flex-col gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-gold/10 text-gold border border-gold/20"
                    : "text-ivory/50 hover:text-ivory hover:bg-ivory/5"
                }`}
              >
                <tab.icon className="text-lg" />
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        <main className="flex-1 p-6 max-w-5xl">
          {activeTab === "dashboard" && (
            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl text-ivory mb-8">
                Бақылау тақтасы
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card) => (
                  <GlassCard key={card.label} className="text-center !p-5">
                    <card.icon className="text-gold text-2xl mx-auto mb-3" />
                    <p className="font-[family-name:var(--font-cinzel)] text-3xl text-ivory">
                      {card.value}
                    </p>
                    <p className="font-[family-name:var(--font-montserrat)] text-ivory/40 text-xs mt-1">
                      {card.label}
                    </p>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {activeTab === "guests" && <AdminGuests onUpdate={() => getAdminStats().then(setStats)} />}
          {activeTab === "settings" && <AdminSettings />}
        </main>
      </div>
    </div>
  );
}
