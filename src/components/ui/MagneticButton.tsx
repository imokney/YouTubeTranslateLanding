import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function MagneticButton({
  children, className = "", onClick,
}: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const x = useTransform(mx, v => v * 0.25);
  const y = useTransform(my, v => v * 0.25);

  return (
    <motion.button
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect(); if (!r) return;
        mx.set(e.clientX - (r.left + r.width / 2));
        my.set(e.clientY - (r.top + r.height / 2));
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ x, y }}
      onClick={onClick}
      className={`rounded-2xl bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 shadow-lg shadow-orange-600/25 ${className}`}
    >
      {children}
    </motion.button>
  );
}
