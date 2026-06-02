import { KidVariant } from "@/components/characters/KidCharacter";

export interface LearnerProfile {
  id: KidVariant;
  name: string;
  ringColor: "purple" | "green" | "orange" | "pink";
}

export const learners: LearnerProfile[] = [
  { id: "amara", name: "Amara", ringColor: "purple" },
  { id: "kofi", name: "Kofi", ringColor: "green" },
  { id: "zara", name: "Zara", ringColor: "orange" },
  { id: "nia", name: "Nia", ringColor: "pink" },
];

export const LEARNER_STORAGE_KEY = "fluent-kids-learner";
