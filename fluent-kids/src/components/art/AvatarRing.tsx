import { ReactNode } from "react";

type RingColor = "purple" | "green" | "orange" | "pink";

const RING_BG: Record<RingColor, string> = {
  purple: "bg-ring-purple",
  green: "bg-ring-green",
  orange: "bg-ring-orange",
  pink: "bg-ring-pink",
};

interface AvatarRingProps {
  children: ReactNode;
  color: RingColor;
  selected?: boolean;
  size?: "md" | "lg";
  onClick?: () => void;
  label?: string;
}

/** Multi-layer glowing avatar ring from reference */
export function AvatarRing({
  children,
  color,
  selected = false,
  size = "lg",
  onClick,
  label,
}: AvatarRingProps) {
  const dim = size === "lg" ? "h-[88px] w-[88px]" : "h-[72px] w-[72px]";
  const inner = size === "lg" ? "h-[76px] w-[76px]" : "h-[62px] w-[62px]";

  const Wrapper = onClick ? "button" : "div";

  return (
    <div className="flex flex-col items-center gap-2">
      <Wrapper
        type={onClick ? "button" : undefined}
        onClick={onClick}
        className={`relative flex items-center justify-center rounded-full transition-transform active:scale-95 ${
          selected ? "shadow-avatar-glow-active scale-105" : "shadow-avatar-glow"
        } ${dim}`}
      >
        <span className="absolute inset-0 rounded-full bg-white" />
        <span
          className={`absolute inset-[5px] rounded-full ${RING_BG[color]}`}
        />
        <span
          className={`relative flex items-center justify-center overflow-hidden rounded-full ${inner}`}
        >
          {children}
        </span>
      </Wrapper>
      {label && (
        <span
          className={`text-sm font-bold ${
            selected ? "text-fluent-purple" : "text-fluent-purple-dark/70"
          }`}
        >
          {label}
        </span>
      )}
    </div>
  );
}
