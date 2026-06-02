/**
 * Language picker characters — flat illustration style (Yoruba boy, Twi girl).
 */

interface LanguageCharacterProps {
  language: "yoruba" | "twi";
  className?: string;
}

export function LanguageCharacter({
  language,
  className = "",
}: LanguageCharacterProps) {
  if (language === "yoruba") {
    return (
      <svg
        viewBox="0 0 140 160"
        className={className}
        aria-hidden
      >
        <ellipse cx="70" cy="155" rx="40" ry="5" fill="rgba(45,27,78,0.1)" />
        {/* Body — striped top like Sapiens ref */}
        <path d="M42 105 Q70 98 98 105 L94 150 Q70 156 46 150 Z" fill="#F472B6" />
        <path d="M46 102 Q70 95 94 102 L96 128 Q70 132 44 128 Z" fill="#FDE047" />
        <path d="M46 115 h48" stroke="#F472B6" strokeWidth="4" opacity={0.5} />
        <path d="M46 122 h48" stroke="#FDE047" strokeWidth="4" opacity={0.5} />
        {/* Arms */}
        <ellipse cx="38" cy="118" rx="10" ry="14" fill="#C68642" />
        <ellipse cx="102" cy="118" rx="10" ry="14" fill="#C68642" />
        {/* Head */}
        <ellipse cx="70" cy="72" rx="36" ry="38" fill="#C68642" />
        <ellipse cx="58" cy="68" rx="8" ry="10" fill="white" />
        <ellipse cx="82" cy="68" rx="8" ry="10" fill="white" />
        <circle cx="59" cy="70" r="5" fill="#2D1B4E" />
        <circle cx="83" cy="70" r="5" fill="#2D1B4E" />
        <circle cx="61" cy="68" r="1.5" fill="white" />
        <circle cx="85" cy="68" r="1.5" fill="white" />
        <path d="M62 82 Q70 88 78 82" stroke="#2D1B4E" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="52" cy="78" rx="6" ry="4" fill="#E8A87C" opacity={0.6} />
        <ellipse cx="88" cy="78" rx="6" ry="4" fill="#E8A87C" opacity={0.6} />
        {/* Fila cap */}
        <ellipse cx="70" cy="42" rx="38" ry="16" fill="#DC2626" />
        <path d="M34 44 Q70 22 106 44 L104 52 Q70 38 36 52 Z" fill="#B91C1C" />
        <ellipse cx="70" cy="36" rx="28" ry="10" fill="#EF4444" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 140 160" className={className} aria-hidden>
      <ellipse cx="70" cy="155" rx="40" ry="5" fill="rgba(45,27,78,0.1)" />
      <path d="M42 105 Q70 98 98 105 L94 150 Q70 156 46 150 Z" fill="#60A5FA" />
      <path d="M46 102 Q70 95 94 102 L96 128 Q70 132 44 128 Z" fill="#FDE047" />
      <ellipse cx="38" cy="118" rx="10" ry="14" fill="#C68642" />
      <ellipse cx="102" cy="118" rx="10" ry="14" fill="#C68642" />
      <ellipse cx="70" cy="72" rx="36" ry="38" fill="#C68642" />
      <ellipse cx="58" cy="68" rx="8" ry="10" fill="white" />
      <ellipse cx="82" cy="68" rx="8" ry="10" fill="white" />
      <circle cx="59" cy="70" r="5" fill="#2D1B4E" />
      <circle cx="83" cy="70" r="5" fill="#2D1B4E" />
      <path d="M62 82 Q70 88 78 82" stroke="#2D1B4E" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Headwrap / beads */}
      <path d="M32 50 Q70 28 108 50 Q100 62 70 58 Q40 62 32 50" fill="#FACC15" />
      <circle cx="45" cy="48" r="4" fill="#DC2626" />
      <circle cx="60" cy="42" r="4" fill="#22C55E" />
      <circle cx="80" cy="42" r="4" fill="#DC2626" />
      <circle cx="95" cy="48" r="4" fill="#FACC15" />
      <ellipse cx="70" cy="52" rx="32" ry="8" fill="#EAB308" opacity={0.5} />
    </svg>
  );
}

/** Journey guide — friendly flat ranger */
export function JourneyGuide({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 130" className={className} aria-hidden>
      <ellipse cx="60" cy="125" rx="35" ry="4" fill="rgba(45,27,78,0.1)" />
      <path d="M35 75 Q60 68 85 75 L82 115 Q60 120 38 115 Z" fill="#7B5BB8" />
      <path d="M40 72 Q60 65 80 72 L82 95 Q60 100 38 95 Z" fill="#C4B5FD" />
      <ellipse cx="60" cy="48" rx="28" ry="30" fill="#E8B88A" />
      <ellipse cx="52" cy="46" rx="6" ry="8" fill="white" />
      <ellipse cx="68" cy="46" rx="6" ry="8" fill="white" />
      <circle cx="53" cy="47" r="3.5" fill="#2D1B4E" />
      <circle cx="69" cy="47" r="3.5" fill="#2D1B4E" />
      <path d="M54 56 Q60 60 66 56" stroke="#2D1B4E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="38" y="22" width="44" height="14" rx="4" fill="#92400E" />
      <ellipse cx="60" cy="28" rx="32" ry="14" fill="#6D28D9" />
      <ellipse cx="60" cy="24" rx="28" ry="10" fill="#7C3AED" />
    </svg>
  );
}
