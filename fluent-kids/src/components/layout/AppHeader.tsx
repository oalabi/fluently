"use client";

import Link from "next/link";

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  backHref?: string;
  showMenu?: boolean;
}

export function AppHeader({
  title = "Fluent Kids",
  subtitle,
  backHref,
  showMenu = true,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center gap-3 bg-fluent-lavender/95 px-4 py-3 backdrop-blur border-b border-fluent-purple/10">
      {backHref ? (
        <Link
          href={backHref}
          className="touch-target flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-bold text-fluent-purple shadow-soft"
          aria-label="Go back"
        >
          ←
        </Link>
      ) : showMenu ? (
        <button
          type="button"
          className="touch-target flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-xl bg-white shadow-soft"
          aria-label="Menu"
        >
          <span className="h-0.5 w-4 rounded bg-fluent-purple" />
          <span className="h-0.5 w-4 rounded bg-fluent-purple" />
          <span className="h-0.5 w-4 rounded bg-fluent-purple" />
        </button>
      ) : (
        <span className="w-10" />
      )}
      <div className="flex-1 text-center">
        <h1 className="text-lg font-extrabold text-fluent-purple-dark">{title}</h1>
        {subtitle && (
          <p className="text-xs text-fluent-purple-dark/60 truncate">{subtitle}</p>
        )}
      </div>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-fluent-purple shadow-soft">
        🔍
      </span>
    </header>
  );
}
