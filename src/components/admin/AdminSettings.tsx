"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { saveWeddingConfig, uploadMusic } from "@/lib/firebase-services";
import { useWeddingStore } from "@/store/wedding-store";

export function AdminSettings() {
  const { config, setConfig } = useWeddingStore();
  const [form, setForm] = useState({
    brideName: config.brideName,
    groomName: config.groomName,
    weddingDate: config.weddingDate,
    subtitle: config.subtitle,
    invitationText: config.invitationText,
    venue: config.event.venue,
    address: config.event.address,
    cardNumber: config.gift.cardNumber,
  });
  const [saving, setSaving] = useState(false);

  const inputClass =
    "w-full bg-white border border-gold/25 rounded-xl px-4 py-3 text-emerald text-sm";

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = {
        brideName: form.brideName,
        groomName: form.groomName,
        weddingDate: form.weddingDate,
        subtitle: form.subtitle,
        invitationText: form.invitationText,
        event: { ...config.event, venue: form.venue, address: form.address },
        gift: { ...config.gift, cardNumber: form.cardNumber },
      };
      setConfig(updates);
      await saveWeddingConfig(updates);
      toast.success("Сақталды!");
    } catch {
      toast.error("Қате орын алды");
    } finally {
      setSaving(false);
    }
  };

  const handleMusicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadMusic(file);
      setConfig({ musicUrl: url });
      toast.success("Музыка жүктелді!");
    } catch {
      toast.error("Жүктеу қатесі");
    }
  };

  const fields = [
    { key: "brideName", label: "Келін аты" },
    { key: "groomName", label: "Күйеу жігіт аты" },
    { key: "weddingDate", label: "Той күні (ISO)", type: "datetime-local" },
    { key: "subtitle", label: "Подзаголовок" },
    { key: "invitationText", label: "Шақыру мәтіні", textarea: true },
    { key: "venue", label: "Орын" },
    { key: "address", label: "Мекенжай" },
    { key: "cardNumber", label: "Карта нөмірі" },
  ] as const;

  return (
    <div>
      <h2 className="font-[family-name:var(--font-cormorant)] text-3xl text-emerald mb-8">
        Баптаулар
      </h2>

      <GlassCard className="space-y-5">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="text-gold text-xs tracking-widest uppercase mb-2 block">
              {field.label}
            </label>
            {"textarea" in field && field.textarea ? (
              <textarea
                value={form[field.key]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                rows={4}
                className={`${inputClass} resize-none`}
              />
            ) : (
              <input
                type={"type" in field ? field.type : "text"}
                value={form[field.key]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className={inputClass}
              />
            )}
          </div>
        ))}

        <div>
          <label className="text-gold text-xs tracking-widest uppercase mb-2 block">
            Фон музыкасы
          </label>
          <input
            type="file"
            accept="audio/*"
            onChange={handleMusicUpload}
            className="text-emerald/60 text-sm"
          />
        </div>

        <MagneticButton onClick={handleSave} disabled={saving} className="w-full">
          {saving ? "Сақталуда..." : "Сақтау"}
        </MagneticButton>
      </GlassCard>
    </div>
  );
}
