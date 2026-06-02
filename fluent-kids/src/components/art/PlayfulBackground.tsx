/** Scattered dots & sparkles — matches "Choose Your Learner" reference */

export function PlayfulBackground() {
  const dots = [
    { x: "8%", y: "12%", s: 6, c: "#C4B5FD" },
    { x: "92%", y: "8%", s: 4, c: "#F9A8D4" },
    { x: "15%", y: "45%", s: 3, c: "#93C5FD" },
    { x: "88%", y: "38%", s: 5, c: "#FDE047" },
    { x: "5%", y: "78%", s: 4, c: "#6EE7B7" },
    { x: "95%", y: "72%", s: 3, c: "#C4B5FD" },
    { x: "48%", y: "5%", s: 3, c: "#F472B6" },
    { x: "72%", y: "92%", s: 5, c: "#A78BFA" },
    { x: "25%", y: "88%", s: 3, c: "#FDBA74" },
  ];

  const dashes = [
    { x: "20%", y: "22%", r: 25 },
    { x: "80%", y: "55%", r: -15 },
    { x: "60%", y: "18%", r: 40 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full opacity-60"
          style={{
            left: d.x,
            top: d.y,
            width: d.s,
            height: d.s,
            backgroundColor: d.c,
          }}
        />
      ))}
      {dashes.map((d, i) => (
        <span
          key={`dash-${i}`}
          className="absolute h-0.5 w-6 rounded-full bg-fluent-purple-soft/25"
          style={{ left: d.x, top: d.y, transform: `rotate(${d.r}deg)` }}
        />
      ))}
      <span className="absolute right-[12%] top-[28%] text-lg text-white animate-sparkle">
        ✦
      </span>
      <span
        className="absolute left-[10%] bottom-[22%] text-sm text-fluent-purple-soft/50 animate-sparkle"
        style={{ animationDelay: "0.8s" }}
      >
        ✦
      </span>
      <span
        className="absolute right-[8%] bottom-[18%] text-xl text-fluent-yellow/70 animate-sparkle"
        style={{ animationDelay: "1.2s" }}
      >
        ✦
      </span>
    </div>
  );
}
