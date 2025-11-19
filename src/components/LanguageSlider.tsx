import React from "react";

type Props = {
  lang: "ru" | "en" | "pt";
  onChange: (lang: "ru" | "en" | "pt") => void;
};

export default function LanguageSlider({ lang, onChange }: Props) {
  const langs = [
    { code: "ru", label: "RU", flag: "🇷🇺" },
    { code: "en", label: "EN", flag: "🇺🇸" },
    { code: "pt", label: "PT", flag: "🇵🇹" },
  ];

  return (
    <div className="flex justify-center mt-4">
      <div
        className="
          flex gap-4 px-5 py-2
          bg-black/40 backdrop-blur-md
          border border-white/10
          rounded-xl
        "
      >
        {langs.map((l) => (
          <button
            key={l.code}
            onClick={() => onChange(l.code as any)}
            className={`
              flex items-center gap-1 px-2 py-1 rounded-md text-sm
              transition-all
              ${lang === l.code
                ? "text-orange-500"
                : "text-gray-300 hover:text-white"}
            `}
          >
            <span className="text-lg">{l.flag}</span>
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
