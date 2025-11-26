import React, { useRef, useState, useEffect } from "react";
import Flag from "./Flag";

interface Props {
  lang: "ru" | "en" | "pt";
  onChange: (l: "ru" | "en" | "pt") => void;
}

export default function LanguageSlider({ lang, onChange }: Props) {
  const languages = [
    { id: "ru", code: "ru" },
    { id: "en", code: "us" },
    { id: "pt", code: "pt" }
  ] as const;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [dragging, setDragging] = useState(false);

  const getIndex = (l: string) => languages.findIndex(x => x.id === l);

  const [pos, setPos] = useState(getIndex(lang));

  useEffect(() => {
    setPos(getIndex(lang));
  }, [lang]);

  const handleDrag = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const rel = (clientX - rect.left) / rect.width;

    const index = Math.round(rel * (languages.length - 1));
    const clamped = Math.max(0, Math.min(languages.length - 1, index));

    setPos(clamped);
    onChange(languages[clamped].id);
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

        {/* Флаги */}
        <div className="flex justify-between relative z-20">
          {languages.map((l) => (
            <div
              key={l.id}
              onClick={() => onChange(l.id)}
              className={`px-4 py-1 transition ${
                lang === l.id
                  ? "opacity-100"
                  : "opacity-50 hover:opacity-80"
              }`}
              style={{ width: 70, textAlign: "center" }}
            >
              <Flag code={l.code} />
            </div>
          ))}
        </div>

        {/* Бегунок */}
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
