"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BottomNavProps {
  lang?: string;
}

const links = (lang: string) => [
  { href: `/learn/${lang}`, label: "Home", icon: "🏠" },
  { href: `/learn/${lang}/vocabulary`, label: "Words", icon: "💬" },
  { href: `/learn/${lang}/library`, label: "Library", icon: "📚" },
  { href: `/learn/${lang}/games`, label: "Games", icon: "🎮", badge: true },
  { href: `/learn/${lang}/trophies`, label: "Trophies", icon: "🏆" },
];

export function BottomNav({ lang = "yoruba" }: BottomNavProps) {
  const pathname = usePathname();
  const items = links(lang);

  return (
    <nav className="sticky bottom-0 z-50 border-t border-fluent-purple/10 bg-white/95 px-2 py-2 backdrop-blur shadow-soft">
      <div className="flex justify-around">
        {items.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`touch-target relative flex flex-col items-center gap-0.5 rounded-xl px-2 py-1 text-xs font-semibold ${
                active
                  ? "text-fluent-purple"
                  : "text-fluent-purple-dark/45"
              }`}
            >
              <span
                className={`text-xl ${active ? "scale-110 transition-transform" : ""}`}
              >
                {item.icon}
              </span>
              {item.badge && (
                <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-fluent-coral text-[10px] font-bold text-white">
                  1
                </span>
              )}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
