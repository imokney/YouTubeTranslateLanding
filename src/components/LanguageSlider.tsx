import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import Flag from "./Flag";

interface Props {
  lang: "ru" | "en" | "pt";
  onChange: (l: "ru" | "en" | "pt") => void;
}

export default function LanguageSlider({ lang, onChange }: Props) {
  const languages = useMemo(
    () =>
      [
        { id: "ru", code: "ru" },
        { id: "en", code: "us" },
        { id: "pt", code: "pt" },
      ] as const,
    []
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [pill, setPill] = useState({ left: 0, width: 0 });

  const measure = () => {
    const container = containerRef.current;
    const activeEl = itemRefs.current[lang];
    if (!container || !activeEl) return;

    const c = container.getBoundingClientRect();
    const a = activeEl.getBoundingClientRect();

    // позиция активного сегмента относительно контейнера
    const left = a.left - c.left;
    const width = a.width;

    setPill({ left, width });
  };

  useLayoutEffect(() => {
    measure();
    // пересчёт при ресайзе/изменении шрифтов/и т.п.
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [lang]);

  return (
    <div className="flex justify-center mt-3 select-none">
      <div
        ref={containerRef}
        className="relative bg-black/70 backdrop-blur px-2 py-2 rounded-xl border border-white/10"
        style={{ width: 260 }}
      >
        {/* Заливка */}
        <div
          className="absolute top-2 bottom-2 bg-orange-600 rounded-lg z-10"
          style={{
            left: pill.left,
            width: pill.width,
            transition: "left 180ms ease, width 180ms ease",
          }}
          aria-hidden
        />

        {/* Флаги */}
        <div className="flex justify-between relative z-20">
          {languages.map((l) => {
            const active = lang === l.id;
            return (
              <button
                key={l.id}
                ref={(el) => {
                  itemRefs.current[l.id] = el;
                }}
                type="button"
                onClick={() => onChange(l.id)}
                className={[
                  "w-[70px] px-4 py-1",
                  "flex items-center justify-center",
                  "transition",
                  active ? "opacity-100" : "opacity-50 hover:opacity-80",
                ].join(" ")}
              >
                <Flag code={l.code} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
