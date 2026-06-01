import Link from "next/link";

export default function SplashPage() {
  return (
    <main className="mobile-shell min-h-dvh bg-fluent-purple">
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="mb-8">
          <h1 className="font-display text-6xl font-extrabold lowercase tracking-tight text-white">
            fluent
            <span className="relative">
              <span className="absolute -right-3 -top-4 h-3 w-3 rounded-full bg-pink-400" />
            </span>
          </h1>
          <p className="mt-2 text-sm text-white/60">kids</p>
        </div>

        <p className="mb-12 max-w-xs text-lg leading-relaxed text-white/90">
          Teach your child to speak and read like a native.
        </p>

        <div className="relative mb-12">
          <div className="flex h-40 w-40 items-center justify-center rounded-full bg-fluent-purple-light/50 ring-4 ring-white/20">
            <span className="text-7xl">👧🏾📱</span>
          </div>
          <span className="absolute -bottom-2 -right-2 rounded-full bg-fluent-yellow px-3 py-1 text-sm font-bold text-fluent-purple-dark">
            Ages 3+
          </span>
        </div>

        <Link
          href="/languages"
          className="touch-target w-full max-w-xs rounded-full bg-white py-4 text-center text-lg font-bold text-fluent-purple-dark shadow-card active:scale-95"
        >
          Start learning →
        </Link>
        <Link
          href="/parent"
          className="touch-target mt-4 text-sm text-white/50 underline"
        >
          Parent dashboard
        </Link>
      </div>

      <p className="pb-8 text-center text-sm text-white/50">iamfluent.com</p>
    </main>
  );
}
