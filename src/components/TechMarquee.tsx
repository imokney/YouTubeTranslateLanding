import React, { useEffect, useRef } from "react";

interface LogoItem {
  alt: string;
  lightSrc: string;
  darkSrc: string;
  scale?: number;
}

const items: LogoItem[] = [
  { alt: "OpenAI",      lightSrc: "/logos/OpenAI-black-monoblossom.png",  darkSrc: "/logos/OpenAI-white-monoblossom.png",  scale: 1 },
  { alt: "ElevenLabs",  lightSrc: "/logos/elevenlabs-logo-black.png",     darkSrc: "/logos/elevenlabs-logo-white.png",     scale: 1 },
  { alt: "Vercel",      lightSrc: "/logos/vercel-logotype-light.png",     darkSrc: "/logos/vercel-logotype-dark.png",     scale: 1 },
  { alt: "Zapier",      lightSrc: "/logos/zapier-logo_black.png",         darkSrc: "/logos/zapier-logo_white.png",         scale: 1 },
  { alt: "DeepL",       lightSrc: "/logos/DeepL-dark.png",                darkSrc: "/logos/DeepL-white.png",               scale: 1 },
  { alt: "Notion",      lightSrc: "/logos/notion.png",                    darkSrc: "/logos/notion.png",                    scale: 1 },
  { alt: "Adobe",       lightSrc: "/logos/adobe-dark.png",                darkSrc: "/logos/adobe-white.png",               scale: 1 },
];

export default function TechMarquee() {
  const renderRow = (suffix = "") =>
    items.map((item, i) => (
      <div
        key={`${suffix}${i}`}
        className="shrink-0 w-[280px] h-[80px] mx-6 flex items-center justify-center"
      >
        <img
          src={item.lightSrc}
          alt={item.alt}
          style={{ transform: `scale(${item.scale})` }}
          className="max-h-full max-w-full object-contain block dark:hidden opacity-80 hover:opacity-100 transition"
        />
        <img
          src={item.darkSrc}
          alt={item.alt}
          style={{ transform: `scale(${item.scale})` }}
          className="max-h-full max-w-full object-contain hidden dark:block opacity-80 hover:opacity-100 transition"
        />
      </div>
    ));

  return (
    <section className="w-full overflow-hidden py-14 mt-24 bg-neutral-100/40 dark:bg-neutral-900/60 backdrop-blur">
      <h3 className="text-center text-xl font-semibold text-gray-800 dark:text-gray-100 mb-8">
        Technology stack &amp; integrations
      </h3>

      <div className="relative overflow-hidden">
        <div
          className="
            flex items-center whitespace-nowrap
            animate-marquee
            [animation-duration:35s]
            hover:[animation-play-state:paused]
          "
        >
          {renderRow()}
          {renderRow("dup-")}
        </div>
      </div>
    </section>
  );
}