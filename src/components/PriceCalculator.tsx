import React, { useMemo, useState } from "react";
import { track } from "../lib/analytics";

export default function PriceCalculator() {
  const [minutes, setMinutes] = useState(10);
  const [subs, setSubs] = useState(true);
  const [voice, setVoice] = useState(true);
  const [langs, setLangs] = useState(1);

  const price = useMemo(() => {
    let perMin = 0;
    if (subs) perMin += 6;
    if (voice) perMin += 12;
    const multiplier = 1 + (Math.max(1, langs) - 1) * 0.3; // +30% за доп. язык
    return Math.round(perMin * minutes * multiplier);
  }, [minutes, subs, voice, langs]);

  return (
    <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-6">
      <div className="font-semibold mb-2">Калькулятор</div>
      <div className="space-y-4 text-sm">
        <div>
          <div className="flex justify-between">
            <label className="text-gray-600 dark:text-neutral-300">Длительность, мин</label>
            <span className="font-semibold">{minutes}</span>
          </div>
          <input
            type="range" min={1} max={60} value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={subs} onChange={(e) => setSubs(e.target.checked)} />
          Перевод + субтитры (от $6/мин)
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={voice} onChange={(e) => setVoice(e.target.checked)} />
          Озвучка (от $12/мин)
        </label>

        <div className="flex items-center justify-between">
          <label className="text-gray-600 dark:text-neutral-300">Языков</label>
          <input
            type="number" min={1} max={10} value={langs}
            onChange={(e) => setLangs(Math.min(10, Math.max(1, parseInt(e.target.value || "1"))))}
            className="w-20 rounded-lg bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 px-2 py-1 text-right"
          />
        </div>

        <div className="text-lg">
          Итог: <b>${price}</b>
          <span className="text-gray-500 dark:text-neutral-400"> (оценка)</span>
        </div>

        <button
          onClick={() => track("calc_submit", { minutes, subs, voice, langs, price })}
          className="mt-2 inline-flex items-center justify-center rounded-2xl bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 shadow-orange-600/25 shadow-lg"
        >
          Получить точный расчёт
        </button>
      </div>
    </div>
  );
}

