import React, { PropsWithChildren } from "react";

export default function GlassCard({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`border-gradient ${className}`}>
      <div className="bg glass rounded-2xl p-6">
        {children}
      </div>
    </div>
  );
}
