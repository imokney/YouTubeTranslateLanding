import React, { useEffect, useRef, useState } from "react";
import LanguageSlider from "./LanguageSlider";

export default function VideoShowcase() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);

  const VIDEOS = {
    ru: "/video/video-ru.mp4",
    en: "/video/video-en.mp4",
    pt: "/video/video-pt.mp4",
  };

  const [lang, setLang] = useState<"ru" | "en" | "pt">("ru");

  // -------------------------------------------------------
  // ГАРАНТИРОВАННАЯ ФУНКЦИЯ ДЛЯ УСТАНОВКИ ГРОМКОСТИ = 0.4
  // -------------------------------------------------------
  const setVolumeSafe = () => {
    const v = videoRef.current;
    if (!v) return;

    // моментально
    v.volume = 0.4;

    // после обновления браузером
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.volume = 0.4;
      }
    }, 0);
  };

  // Обработчики volume + metadata
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    setVolumeSafe();

    const applyVolume = () => setVolumeSafe();

    v.addEventListener("loadedmetadata", applyVolume);
    v.addEventListener("loadeddata", applyVolume);
    v.addEventListener("volumechange", applyVolume);

    return () => {
      v.removeEventListener("loadedmetadata", applyVolume);
      v.removeEventListener("loadeddata", applyVolume);
      v.removeEventListener("volumechange", applyVolume);
    };
  }, []);

  // -------------------------------------------------------
  // Переключение языка без паузы
  // -------------------------------------------------------
  const switchLang = (newLang: "ru" | "en" | "pt") => {
  const v = videoRef.current;
  if (!v) return;

  // скрываем вспышку
  v.style.transition = "opacity 0.25s";
  v.style.opacity = "0";

  const t = v.currentTime;
  v.src = VIDEOS[newLang];
  v.currentTime = t;
  setVolumeSafe();

  setTimeout(() => {
    v.play().catch(() => {});
    v.style.opacity = "1"; // плавное проявление
  }, 100);

  setLang(newLang);
};


  // -------------------------------------------------------
  // Ленивая загрузка блока
  // -------------------------------------------------------
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (hostRef.current) obs.observe(hostRef.current);
    return () => obs.disconnect();
  }, []);

  // -------------------------------------------------------
  // Старт DEMO
  // -------------------------------------------------------
  const startDemo = (e: any) => {
    e.preventDefault(); // фикс — ничего не скроллит
    e.stopPropagation();

    setStarted(true);

    setTimeout(() => {
      if (videoRef.current) {
        setVolumeSafe();
        videoRef.current.play().catch(() => {});
      }
    }, 50);
  };

  return (
    <div ref={hostRef} className="select-none">
      {!visible ? (
        <div
          className="rounded-2xl border border-black/5 dark:border-white/10 bg-black/80"
          style={{ aspectRatio: "16/9" }}
        />
      ) : (
        <>
          {/* ░░░ ЗАГЛУШКА ДО СТАРТА ░░░ */}
          {!started && (
            <div
            className="
    relative rounded-2xl overflow-hidden
    border border-black/5 dark:border-white/10
    bg-black flex items-center justify-center
    transition-shadow
    hover:shadow-[0_0_25px_rgba(255,98,0,0.35),0_0_45px_rgba(255,255,255,0.15)]
  "
  style={{ aspectRatio: '16/9' }}
>

              {/* Кнопка Play */}
              <button
                onClick={startDemo}
                className="
                  group absolute left-1/2 top-1/2
                  -translate-x-1/2 -translate-y-1/2
                  w-24 h-16
                  bg-orange-600
                  rounded-2xl flex items-center justify-center
                  shadow-[0_0_25px_rgba(255,98,0,0.45)]
                  hover:bg-orange-700
                  hover:shadow-[0_0_35px_rgba(255,98,0,0.55)]
                  hover:scale-[1.02]
                  active:scale-95
                  transition-all
                "
              >
                <div
                  className="
                    w-0 h-0
                    border-t-[12px] border-t-transparent
                    border-b-[12px] border-b-transparent
                    border-l-[20px] border-l-white
                    ml-1
                  "
                />
              </button>
            </div>
          )}

          {/* ░░░ ВИДЕО ПОСЛЕ СТАРТА ░░░ */}
          {started && (
            <div className="mt-0">
              <div
                className="
                  relative rounded-2xl overflow-hidden
                  border border-black/5 dark:border-white/10 bg-black
                  shadow-[0_0_35px_rgba(255,98,0,0.5),0_0_70px_rgba(255,255,255,0.25)]
                "
              >
                <video
                  ref={videoRef}
                  className="w-full aspect-video"
                  controls
                  playsInline
                  autoPlay
                  src={VIDEOS[lang]}
                />
              </div>

              <LanguageSlider lang={lang} onChange={switchLang} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
