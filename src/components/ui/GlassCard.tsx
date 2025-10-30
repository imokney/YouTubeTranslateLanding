import React, { PropsWithChildren } from "react";

/**
 * GlassCard — стеклянная карточка без артефактов:
 * - градиентная рамка только на hover (opacity), без mask-composite
 * - нет вспышки границы при загрузке
 * - внутренний слой .inner имеет свой z-index для чётких углов
 */
export default function GlassCard({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`glass-card ${className}`}>
      <div className="inner p-6">{children}</div>
    </div>
  );
}
