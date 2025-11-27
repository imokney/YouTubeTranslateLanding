import React from "react";

export default function Dust() {
  const particles = Array.from({ length: 32 });

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-[0.16]">
      {particles.map((_, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px] rounded-full bg-white/80 dark:bg-white/60 animate-dust"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
}
