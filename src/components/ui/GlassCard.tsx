import React, { PropsWithChildren } from "react";

/**
 * GlassCard
 * - корректный тёмный фон (без «молочной» пелены)
 * - аккуратная градиентная окантовка на hover
 * - совместим с hover-анимациями снаружи (Framer Motion)
 */
export default function GlassCard({
  children,
  className = "",
  interactive = true,
}: PropsWithChildren<{ className?: string; interactive?: boolean }>) {
  return (
    <div className={`glass-card ${interactive ? "glass-card--interactive" : ""} ${className}`}>
      <div className="glass-card__inner">{children}</div>
    </div>
  );
}
