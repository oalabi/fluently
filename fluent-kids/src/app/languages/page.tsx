"use client";

import Link from "next/link";
import { PlayfulBackground } from "@/components/art/PlayfulBackground";
import { FluentLogo } from "@/components/art/FluentLogo";
import { AvatarRing } from "@/components/art/AvatarRing";
import { LanguageCharacter } from "@/components/characters/LanguageCharacter";
import { languages, comingSoonLanguages } from "@/data/languages";

export default function LanguageSelectPage() {
  return (
    <main className="mobile-shell onboarding-bg relative min-h-dvh">
      <PlayfulBackground />

      <div className="relative z-10 flex flex-1 flex-col px-6 py-8">
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/learners"
            className="text-sm font-semibold text-fluent-purple-dark/60"
          >
            ← Back
          </Link>
          <FluentLogo variant="inline" className="scale-75" />
          <span className="w-10" />
        </div>

        <h1 className="mb-1 text-center text-2xl font-extrabold text-fluent-purple-dark">
          Choose your language
        </h1>
        <p className="mb-8 text-center text-sm text-fluent-purple-dark/60">
          West African languages for young explorers
        </p>

        <div className="flex flex-col gap-8">
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={`/learn/${lang.code}`}
              className="flex items-center gap-5 rounded-3xl bg-white/70 p-5 shadow-soft backdrop-blur active:scale-[0.98] transition-transform"
            >
              <AvatarRing
                color={lang.code === "yoruba" ? "purple" : "green"}
                size="md"
              >
                <LanguageCharacter
                  language={lang.code as "yoruba" | "twi"}
                  className="h-full w-full scale-110"
                />
              </AvatarRing>
              <div className="flex-1 text-left">
                <p className="text-xl font-extrabold text-fluent-purple-dark">
                  {lang.name}
                </p>
                <p className="text-sm text-fluent-purple-dark/60">
                  {lang.nativeName}
                </p>
                <p className="mt-1 text-xs text-fluent-purple-soft">
                  {lang.description.slice(0, 50)}…
                </p>
              </div>
              <span className="text-2xl text-fluent-purple-soft">→</span>
            </Link>
          ))}
        </div>

        <p className="mt-10 mb-3 text-center text-sm font-bold text-fluent-purple-dark/40">
          Coming soon
        </p>
        <div className="flex justify-center gap-6 opacity-45">
          {comingSoonLanguages.map((l) => (
            <div key={l.code} className="flex flex-col items-center gap-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/60 text-2xl">
                {l.characterEmoji}
              </div>
              <span className="text-xs font-semibold text-fluent-purple-dark">
                {l.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
