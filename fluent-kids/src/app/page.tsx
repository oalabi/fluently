import Link from "next/link";
import { PlayfulBackground } from "@/components/art/PlayfulBackground";
import { FluentLogo } from "@/components/art/FluentLogo";
import { KidCharacter } from "@/components/characters/KidCharacter";

export default function SplashPage() {
  return (
    <main className="mobile-shell onboarding-bg relative min-h-dvh">
      <PlayfulBackground />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="mb-6">
          <FluentLogo />
          <p className="mt-3 text-sm font-semibold text-fluent-purple-soft">kids</p>
        </div>

        <p className="mb-10 max-w-xs text-lg font-medium leading-relaxed text-fluent-purple-dark">
          Teach your child to speak and read like a native.
        </p>

        <div className="relative mb-10 animate-float">
          <div className="shadow-avatar-glow flex h-44 w-44 items-center justify-center rounded-full bg-white p-2">
            <div className="h-full w-full overflow-hidden rounded-full bg-ring-purple p-1">
              <KidCharacter variant="amara" />
            </div>
          </div>
          <span className="absolute -bottom-1 -right-1 rounded-full bg-fluent-yellow px-4 py-1.5 text-sm font-bold text-fluent-purple-dark shadow-soft">
            Ages 3+
          </span>
        </div>

        <Link
          href="/learners"
          className="touch-target w-full max-w-xs rounded-full bg-fluent-purple py-4 text-center text-lg font-bold text-white shadow-card active:scale-95"
        >
          Start learning →
        </Link>
        <Link
          href="/parent"
          className="touch-target mt-4 text-sm font-semibold text-fluent-purple-dark/50 underline"
        >
          Parent dashboard
        </Link>
      </div>

      <p className="relative z-10 pb-8 text-center text-sm text-fluent-purple-soft">
        iamfluent.com
      </p>
    </main>
  );
}
