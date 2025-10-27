import React, { useEffect, useRef, useState } from "react";

// Тизер → HLS по клику, аудиотреки EN/RU/ES
type Track = { id: number; name: string; lang?: string };

export default function VideoShowcase() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<any>(null);

  const [visible, setVisible] = useState(false);
  const [upgraded, setUpgraded] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(false);

  // Рендерим только когда блок попал в viewport
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

  const isSafariHls = () => {
    const v = document.createElement("video");
    return v.canPlayType("application/vnd.apple.mpegurl") !== "";
  };

  const setupHls = async () => {
    if (!videoRef.current || upgraded) return;
    setLoading(true);
    const video = videoRef.current;
    const src = "/demo/master.m3u8";

    try {
      if (isSafariHls()) {
        video.src = src;
        await video.play().catch(() => {});
        const iv = setInterval(() => {
          const at: any = (video as any).audioTracks;
          if (at && at.length) {
            const list: Track[] = [];
            for (let i = 0; i < at.length; i++) {
              const t = at[i];
              list.push({
                id: i,
                name: t.label || t.language || `Track ${i + 1}`,
                lang: t.language,
              });
            }
            setTracks(list);
            setCurrentTrack(at.selectedIndex ?? 0);
            clearInterval(iv);
          }
        }, 300);
      } else {
        const { default: Hls } = await import("hls.js");
        const hls = new Hls({ startLevel: 0 });
        hls.attachMedia(video);
        hls.on(Hls.Events.MEDIA_ATTACHED, () => hls.loadSource(src));
        hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}));
        hls.on(Hls.Events.AUDIO_TRACKS_UPDATED, (_: any, data: any) => {
          const list: Track[] = data.audioTracks.map((t: any, idx: number) => ({
            id: idx,
            name: t.name || t.lang || `Track ${idx + 1}`,
            lang: t.lang,
          }));
          setTracks(list);
          setCurrentTrack(hls.audioTrack ?? 0);
        });
        hls.on(Hls.Events.AUDIO_TRACK_SWITCHED, (_: any, data: any) =>
          setCurrentTrack(data.id)
        );
        hlsRef.current = hls;
      }
      setUpgraded(true);
    } finally {
      setLoading(false);
    }
  };

  const onSelectTrack = (id: number) => {
    setCurrentTrack(id);
    const video = videoRef.current!;
    const at: any = (video as any).audioTracks;
    if (at && at.length) {
      for (let i = 0; i < at.length; i++) at[i].enabled = i === id;
      return;
    }
    if (hlsRef.current) {
      hlsRef.current.audioTrack = id;
    }
  };

  const onUnmutePlay = async () => {
    const v = videoRef.current!;
    try {
      v.muted = false;
      setMuted(false);
      await v.play();
    } catch {}
  };

  useEffect(() => {
    return () => {
      if (hlsRef.current) {
        try {
          hlsRef.current.destroy();
        } catch {}
        hlsRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={hostRef}>
      {!visible ? (
        <div
          className="rounded-2xl border border-black/5 dark:border-white/10 bg-black/80"
          style={{ aspectRatio: "16/9" }}
        />
      ) : (
        <div className="relative rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden bg-black">
          <video
            ref={videoRef}
            className="w-full aspect-video"
            playsInline
            muted
            loop={!upgraded}
            autoPlay
            preload="metadata"
            poster="/demo/poster.jpg"
            src={upgraded ? undefined : "/demo/teaser.mp4"}
            controls={upgraded}
          />

          <div className="absolute top-3 right-3 left-3 flex flex-wrap gap-2 items-center justify-between">
            {upgraded && tracks.length > 0 && (
              <div className="ml-auto flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-2 rounded-xl text-white">
                <span className="text-xs opacity-80">Язык</span>
                <select
                  className="bg-black/30 border border-white/20 rounded-lg text-sm px-2 py-1"
                  value={currentTrack ?? 0}
                  onChange={(e) => onSelectTrack(parseInt(e.target.value, 10))}
                >
                  {tracks.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                {muted && (
                  <button
                    onClick={onUnmutePlay}
                    className="ml-2 text-xs bg-orange-600 hover:bg-orange-700 px-2 py-1 rounded-lg"
                    title="Включить звук"
                  >
                    Включить звук
                  </button>
                )}
              </div>
            )}
          </div>

          {!upgraded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={setupHls}
                className="rounded-2xl bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 shadow-lg shadow-orange-600/25 text-sm md:text-base"
                disabled={loading}
              >
                {loading ? "Загрузка…" : "Слушать демо (EN/RU/ES)"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
