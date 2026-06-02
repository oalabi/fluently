"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlayfulBackground } from "@/components/art/PlayfulBackground";
import { FluentLogo } from "@/components/art/FluentLogo";
import { AvatarRing } from "@/components/art/AvatarRing";
import { KidCharacter, KidVariant } from "@/components/characters/KidCharacter";
import { learners } from "@/data/learners";
import { setSelectedLearner } from "@/lib/learner";

export default function ChooseLearnerPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<KidVariant | null>(null);

  const continueNext = () => {
    if (!selected) return;
    setSelectedLearner(selected);
    router.push("/languages");
  };

  return (
    <main className="mobile-shell onboarding-bg relative min-h-dvh">
      <PlayfulBackground />

      <div className="relative z-10 flex flex-1 flex-col px-6 py-10">
        <div className="mb-10 flex justify-center pt-4">
          <FluentLogo />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="flex flex-wrap justify-center gap-5 px-2">
            {learners.map((learner) => (
              <AvatarRing
                key={learner.id}
                color={learner.ringColor}
                selected={selected === learner.id}
                size="lg"
                onClick={() => setSelected(learner.id)}
                label={learner.name}
              >
                <KidCharacter variant={learner.id} />
              </AvatarRing>
            ))}
          </div>
        </div>

        <div className="pb-6 pt-8 text-center">
          <h1 className="text-2xl font-extrabold text-fluent-purple-dark">
            Choose Your Learner
          </h1>
          <p className="mt-2 text-sm text-fluent-purple-dark/60">
            Who is learning today?
          </p>

          <button
            type="button"
            onClick={continueNext}
            disabled={!selected}
            className="touch-target mt-8 w-full max-w-xs rounded-full bg-fluent-purple py-4 text-lg font-bold text-white shadow-card disabled:opacity-40 active:scale-95"
          >
            Continue →
          </button>
        </div>

        <span className="absolute bottom-6 right-6 text-2xl text-fluent-purple-soft/40 animate-sparkle">
          ✦
        </span>
      </div>
    </main>
  );
}
