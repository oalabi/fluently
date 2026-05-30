import Link from "next/link";
import { languages, comingSoonLanguages } from "@/data/languages";

export default function LanguageSelectPage() {
  return (
    <main className="mobile-shell min-h-dvh bg-fluent-teal-dark">
      <div className="flex flex-1 flex-col px-6 py-10">
        <Link href="/" className="mb-6 text-white/60 text-sm">
          ← Back
        </Link>
        <h1 className="mb-2 text-center text-2xl font-bold text-white">
          Choose your language
        </h1>
        <p className="mb-10 text-center text-white/70">
          West African languages for young explorers
        </p>

        <div className="grid grid-cols-2 gap-6">
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={`/learn/${lang.code}`}
              className="flex flex-col items-center gap-3 rounded-3xl bg-white/10 p-6 active:scale-95 transition-transform"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-fluent-purple to-fluent-blue text-5xl shadow-card">
                {lang.characterEmoji}
              </div>
              <span className="text-lg font-bold text-white">{lang.name}</span>
              <span className="text-xs text-white/60">{lang.nativeName}</span>
            </Link>
          ))}
        </div>

        <p className="mt-10 mb-4 text-center text-sm font-semibold text-white/50">
          Coming soon
        </p>
        <div className="flex justify-center gap-4 opacity-50">
          {comingSoonLanguages.map((l) => (
            <div key={l.code} className="flex flex-col items-center gap-1">
              <span className="text-3xl">{l.characterEmoji}</span>
              <span className="text-xs text-white">{l.name}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
