import React, { useRef, useState, useEffect } from "react";

interface Props {
  lang: "ru" | "en" | "pt";
  onChange: (l: "ru" | "en" | "pt") => void;
}

export default function LanguageSlider({ lang, onChange }: Props) {
  const languages = ["ru", "en", "pt"] as const;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const getIndex = (l: string) => languages.indexOf(l as any);

  const [pos, setPos] = useState(getIndex(lang));

  useEffect(() => {
    setPos(getIndex(lang));
  }, [lang]);

  const handleDrag = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const rel = (clientX - rect.left) / rect.width;

    // диапазон 0 - 1 → переводим в 0 - 2
    const index = Math.round(rel * 2);

    const clamped = Math.max(0, Math.min(2, index));

    setPos(clamped);
    onChange(languages[clamped]);
  };

  return (
    <div className="flex justify-center mt-3 select-none">
      <div
        ref={containerRef}
        className="relative bg-black/70 backdrop-blur px-2 py-2 rounded-xl border border-white/10"
        style={{ width: 260, cursor: dragging ? "grabbing" : "pointer" }}
        onMouseMove={(e) => dragging && handleDrag(e.clientX)}
        onTouchMove={(e) => dragging && handleDrag(e.touches[0].clientX)}
        onMouseUp={() => setDragging(false)}
        onTouchEnd={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
      >
        {/* подписи */}
        <div className="flex justify-between relative z-20">
          {languages.map((l) => (
            <div
              key={l}
              onClick={() => onChange(l)}
              className={`px-4 py-1 text-sm uppercase transition font-medium ${
                lang === l
                  ? "text-white"
                  : "text-white/60 hover:text-white/80"
              }`}
              style={{ width: 70, textAlign: "center" }}
            >
              {l}
            </div>
          ))}
        </div>

        {/* оранжевый бегунок */}
        <div
          className="absolute top-2 bottom-2 bg-orange-600 rounded-lg transition-all z-10"
          style={{
            width: 70,
            left: pos === 0 ? 4 : pos === 1 ? 95 : 186
          }}
          onMouseDown={() => setDragging(true)}
          onTouchStart={() => setDragging(true)}
        />
      </div>
    </div>
  );
}
