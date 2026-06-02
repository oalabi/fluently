/**
 * Flat, Sapiens-inspired child characters — large eyes, soft shapes, warm skin tones.
 */

export type KidVariant = "amara" | "kofi" | "zara" | "nia";

interface KidCharacterProps {
  variant: KidVariant;
  className?: string;
}

const SKIN = "#C68642";
const SKIN_SHADOW = "#A66B32";
const EYE = "#2D1B4E";
const CHEEK = "#E8A87C";

function Eyes({ cx = 50 }: { cx?: number }) {
  return (
    <>
      <ellipse cx={cx - 12} cy={48} rx={7} ry={9} fill="white" />
      <ellipse cx={cx + 12} cy={48} rx={7} ry={9} fill="white" />
      <circle cx={cx - 11} cy={49} r={4} fill={EYE} />
      <circle cx={cx + 13} cy={49} r={4} fill={EYE} />
      <circle cx={cx - 10} cy={47} r={1.5} fill="white" />
      <circle cx={cx + 14} cy={47} r={1.5} fill="white" />
    </>
  );
}

function Face({ cx = 50 }: { cx?: number }) {
  return (
    <>
      <ellipse cx={cx} cy={52} rx={32} ry={34} fill={SKIN} />
      <ellipse cx={cx} cy={58} rx={26} ry={22} fill={SKIN_SHADOW} opacity={0.15} />
      <Eyes cx={cx} />
      <ellipse cx={cx - 18} cy={58} rx={5} ry={3} fill={CHEEK} opacity={0.5} />
      <ellipse cx={cx + 18} cy={58} rx={5} ry={3} fill={CHEEK} opacity={0.5} />
      <path
        d={`M${cx - 8} 64 Q${cx} 70 ${cx + 8} 64`}
        stroke={EYE}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

function Body({ shirt, pants }: { shirt: string; pants: string }) {
  return (
    <>
      <path d="M28 82 Q50 76 72 82 L68 118 Q50 122 32 118 Z" fill={pants} />
      <path d="M32 78 Q50 72 68 78 L72 95 Q50 98 28 95 Z" fill={shirt} />
      <ellipse cx={38} cy={88} rx={6} ry={8} fill={shirt} opacity={0.3} />
      <ellipse cx={62} cy={88} rx={6} ry={8} fill={shirt} opacity={0.3} />
    </>
  );
}

/** Amara — purple afro */
function Amara() {
  return (
    <svg viewBox="0 0 100 120" className="h-full w-full" aria-hidden>
      <ellipse cx="50" cy="118" rx="22" ry="4" fill="rgba(45,27,78,0.08)" />
      <Body shirt="#E9D5FF" pants="#7B5BB8" />
      <Face />
      <ellipse cx="50" cy="28" rx="34" ry="30" fill="#4C1D95" />
      <ellipse cx="50" cy="32" rx="30" ry="26" fill="#6D28D9" />
      <circle cx="35" cy="22" r="8" fill="#5B21B6" />
      <circle cx="65" cy="22" r="8" fill="#5B21B6" />
      <circle cx="50" cy="16" r="10" fill="#7C3AED" />
    </svg>
  );
}

/** Kofi — green cap / short hair */
function Kofi() {
  return (
    <svg viewBox="0 0 100 120" className="h-full w-full" aria-hidden>
      <ellipse cx="50" cy="118" rx="22" ry="4" fill="rgba(45,27,78,0.08)" />
      <Body shirt="#A7F3D0" pants="#34D399" />
      <Face />
      <ellipse cx="50" cy="30" rx="32" ry="18" fill="#166534" />
      <path d="M22 32 Q50 8 78 32 L76 42 Q50 28 24 42 Z" fill="#15803D" />
    </svg>
  );
}

/** Zara — orange braids */
function Zara() {
  return (
    <svg viewBox="0 0 100 120" className="h-full w-full" aria-hidden>
      <ellipse cx="50" cy="118" rx="22" ry="4" fill="rgba(45,27,78,0.08)" />
      <Body shirt="#FED7AA" pants="#FB923C" />
      <rect x="14" y="40" width="8" height="36" rx="4" fill="#92400E" />
      <rect x="78" y="40" width="8" height="36" rx="4" fill="#92400E" />
      <circle cx="18" cy="78" r="5" fill="#B45309" />
      <circle cx="82" cy="78" r="5" fill="#B45309" />
      <Face />
      <ellipse cx="50" cy="32" rx="30" ry="22" fill="#78350F" />
      <path d="M22 36 Q50 18 78 36" fill="#92400E" />
    </svg>
  );
}

/** Nia — pink space buns */
function Nia() {
  return (
    <svg viewBox="0 0 100 120" className="h-full w-full" aria-hidden>
      <ellipse cx="50" cy="118" rx="22" ry="4" fill="rgba(45,27,78,0.08)" />
      <Body shirt="#FBCFE8" pants="#F472B6" />
      <Face />
      <ellipse cx="50" cy="34" rx="28" ry="20" fill="#831843" />
      <circle cx="28" cy="28" r="12" fill="#DB2777" />
      <circle cx="72" cy="28" r="12" fill="#DB2777" />
      <circle cx="28" cy="26" r="6" fill="#F9A8D4" />
      <circle cx="72" cy="26" r="6" fill="#F9A8D4" />
    </svg>
  );
}

const VARIANTS: Record<KidVariant, () => JSX.Element> = {
  amara: Amara,
  kofi: Kofi,
  zara: Zara,
  nia: Nia,
};

export function KidCharacter({ variant, className = "" }: KidCharacterProps) {
  const Component = VARIANTS[variant];
  return (
    <div className={`h-full w-full ${className}`}>
      <Component />
    </div>
  );
}
