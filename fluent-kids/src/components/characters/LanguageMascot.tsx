/** SVG mascots inspired by Fluent mockups — Yoruba boy & Twi girl */

interface LanguageMascotProps {
  language: "yoruba" | "twi";
  size?: number;
  className?: string;
}

export function LanguageMascot({
  language,
  size = 96,
  className = "",
}: LanguageMascotProps) {
  if (language === "yoruba") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        className={className}
        aria-hidden
      >
        <circle cx="60" cy="60" r="58" fill="#4B2E83" />
        <ellipse cx="60" cy="72" rx="28" ry="32" fill="#D4A574" />
        <circle cx="60" cy="48" r="26" fill="#8D5524" />
        <ellipse cx="60" cy="38" rx="30" ry="14" fill="#C41E3A" />
        <circle cx="50" cy="46" r="4" fill="#1a1a1a" />
        <circle cx="70" cy="46" r="4" fill="#1a1a1a" />
        <path d="M52 56 Q60 62 68 56" stroke="#1a1a1a" strokeWidth="2" fill="none" />
        <text x="60" y="108" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
          Yoruba
        </text>
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      aria-hidden
    >
      <circle cx="60" cy="60" r="58" fill="#1A6B7A" />
      <ellipse cx="60" cy="72" rx="28" ry="32" fill="#D4A574" />
      <circle cx="60" cy="48" r="26" fill="#6B4423" />
      <path
        d="M30 42 Q60 20 90 42 Q85 55 60 50 Q35 55 30 42"
        fill="#FACC15"
      />
      <circle cx="50" cy="46" r="4" fill="#1a1a1a" />
      <circle cx="70" cy="46" r="4" fill="#1a1a1a" />
      <path d="M52 56 Q60 62 68 56" stroke="#1a1a1a" strokeWidth="2" fill="none" />
      <text x="60" y="108" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
        Twi
      </text>
    </svg>
  );
}

export function RangerGuide({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 180"
      className={className}
      aria-label="Your journey guide"
    >
      <ellipse cx="100" cy="170" rx="60" ry="8" fill="rgba(0,0,0,0.2)" />
      <ellipse cx="100" cy="95" rx="45" ry="55" fill="#7C3AED" />
      <circle cx="100" cy="55" r="38" fill="#F5D0C5" />
      <ellipse cx="100" cy="35" rx="42" ry="22" fill="#6B21A8" />
      <rect x="72" y="28" width="56" height="18" rx="4" fill="#92400E" />
      <circle cx="88" cy="52" r="5" fill="#1a1a1a" />
      <circle cx="112" cy="52" r="5" fill="#1a1a1a" />
      <path d="M90 65 Q100 72 110 65" stroke="#1a1a1a" strokeWidth="2" fill="none" />
    </svg>
  );
}
