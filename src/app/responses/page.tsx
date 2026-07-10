"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResponseCard } from "@/components/ui/ResponseCard";
import { getAllWeddingResponses } from "@/lib/firebase-services";
import { WeddingResponse } from "@/lib/wedding-responses";

export default function ResponsesPage() {
  const [responses, setResponses] = useState<WeddingResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllWeddingResponses()
      .then(setResponses)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="relative luxury-gradient min-h-screen section-padding">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-ivory/50 hover:text-gold text-sm transition-colors"
          >
            ← Шақыру бетіне қайту
          </Link>
        </div>

        <SectionHeading
          title="Барлық жауаптар мен тілектер"
          subtitle="Қонақтардың ізгі тілектері мен қатысу жауаптары"
        />

        {loading ? (
          <p className="text-center text-ivory/40 font-light py-16">Жүктелуде...</p>
        ) : responses.length === 0 ? (
          <p className="text-center text-ivory/40 font-light py-16">
            Әзірге жауаптар мен тілектер жоқ
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {responses.map((response, index) => (
              <ResponseCard key={response.id} response={response} index={index} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
