"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Shanyraq } from "@/components/ui/Shanyraq";
import { auth, isFirebaseConfigured } from "@/lib/firebase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isFirebaseConfigured && auth) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@wedding.kz";
        const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
        if (email === adminEmail && password === adminPassword) {
          sessionStorage.setItem("admin-auth", "true");
        } else {
          throw new Error("Invalid credentials");
        }
      }
      toast.success("Кіру сәтті!");
      router.push("/admin");
    } catch {
      toast.error("Қате email немесе пароль");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white border border-gold/25 rounded-xl px-4 py-3.5 text-emerald placeholder:text-emerald/40 text-sm";

  return (
    <div className="min-h-screen luxury-gradient flex items-center justify-center px-6">
      <GlassCard className="w-full max-w-md">
        <div className="text-center mb-8">
          <Shanyraq size={60} className="mx-auto mb-4" animate={false} />
          <h1 className="font-[family-name:var(--font-cinzel)] text-2xl text-emerald tracking-widest">
            Admin Panel
          </h1>
          <p className="font-[family-name:var(--font-montserrat)] text-emerald/40 text-sm mt-2">
            Басқару панеліне кіру
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-gold text-xs tracking-widest uppercase mb-2 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="admin@wedding.kz"
              required
            />
          </div>
          <div>
            <label className="text-gold text-xs tracking-widest uppercase mb-2 block">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              placeholder="••••••••"
              required
            />
          </div>
          <MagneticButton type="submit" className="w-full" disabled={loading}>
            {loading ? "Кіру..." : "Кіру"}
          </MagneticButton>
        </form>
      </GlassCard>
    </div>
  );
}
