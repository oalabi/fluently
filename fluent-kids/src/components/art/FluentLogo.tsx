interface FluentLogoProps {
  variant?: "pill" | "inline";
  className?: string;
}

/** Purple pill logo with script "fluent." and pink dot — reference mockup */
export function FluentLogo({ variant = "pill", className = "" }: FluentLogoProps) {
  const wordmark = (
    <span className="logo-script relative inline-block text-2xl lowercase text-white md:text-3xl">
      fluent
      <span className="absolute -right-1 top-0 h-2 w-2 rounded-full bg-fluent-pink" />
      <span className="text-fluent-pink">.</span>
    </span>
  );

  if (variant === "inline") {
    return (
      <div className={className}>
        <span className="logo-script relative inline-block text-xl lowercase text-fluent-purple">
          fluent
          <span className="absolute -right-1 top-0 h-1.5 w-1.5 rounded-full bg-fluent-pink" />
          <span className="text-fluent-pink">.</span>
        </span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center rounded-2xl bg-fluent-purple px-8 py-3 shadow-soft ${className}`}
    >
      {wordmark}
    </div>
  );
}
