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
    <header className="sticky top-0 z-50 flex items-center gap-3 bg-fluent-purple-dark/95 px-4 py-3 backdrop-blur">
      {backHref ? (
        <Link
          href={backHref}
          className="touch-target flex items-center justify-center rounded-lg text-white/90"
          aria-label="Go back"
        >
          ←
        </Link>
      ) : showMenu ? (
        <button
          type="button"
          className="touch-target flex flex-col justify-center gap-1 rounded-lg p-2"
          aria-label="Menu"
        >
          <span className="h-0.5 w-5 bg-white" />
          <span className="h-0.5 w-5 bg-white" />
          <span className="h-0.5 w-5 bg-white" />
        </button>
      ) : (
        <span className="w-10" />
      )}
      <div className="flex-1 text-center">
        <h1 className="text-lg font-bold text-white">{title}</h1>
        {subtitle && (
          <p className="text-xs text-white/60 truncate">{subtitle}</p>
        )}
      </div>
      <span className="w-10 text-center text-white/80">🔍</span>
    </header>
  );
}
