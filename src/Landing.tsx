import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PlayCircle,
  Globe2,
  Subtitles,
  Mic2,
  Clapperboard,
  Check,
  Clock,
  Shield,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";

const AGENCY_NAME = "Studio Translate";
const TELEGRAM_LINK = "https://t.me/your_agency";
const EMAIL = "hello@youragency.com";

const getPreferredTheme = (): "light" | "dark" => {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {}
  if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
};

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

/** iOS-like theme switch with Moon/Sun */
function ThemeSwitch({ theme, setTheme }: { theme: "light" | "dark"; setTheme: (t: "light" | "dark") => void }) {
  const isDark = theme === "dark";

  useEffect(() => {
    try { localStorage.setItem("theme", theme); } catch {}
  }, [theme]);

  return (
    <button
      role="switch"
      aria-checked={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative inline-flex h-7 w-12 items-center rounded-full border transition-colors duration-300
        ${isDark ? "bg-orange-600 border-orange-600" : "bg-gray-300 border-gray-300"}
        dark:${isDark ? "bg-orange-600 border-orange-600" : "bg-neutral-700 border-neutral-700"}`}
      aria-label="Переключить тему"
      title={isDark ? "Светлая тема" : "Тёмная тема"}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute flex items-center justify-center h-5 w-5 rounded-full bg-white shadow-sm text-orange-500 ${isDark ? "right-0.5" : "left-0.5"}`}
      >
        {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
      </motion.span>
    </button>
  );
}

export default function Landing() {
  const [theme, setTheme] = useState<"light" | "dark">(() => getPreferredTheme());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="theme-transition min-h-screen bg-white text-gray-900 dark:bg-neutral-950 dark:text-neutral-100 relative overflow-hidden">
        {/* Subtle global texture (defined in index.css as .bg-noise) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-noise" />

        {/* Animated hero gradient blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-[40%] blur-3xl opacity-40 animate-gradient
                     bg-gradient-to-r from-orange-600 via-amber-500 to-rose-500 dark:opacity-25"
        />

        {/* Fixed transparent header with shadow on scroll */}
        <header
          className={`fixed top-0 left-0 w-full z-50 backdrop-blur transition-all duration-300 border-b border-black/5 dark:border-white/10 ${
            scrolled ? "bg-white/80 dark:bg-neutral-950/70 shadow-md" : "bg-white/50 dark:bg-neutral-950/40"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe2 className="w-5 h-5" />
              <span className="font-semibold text-sm md:text-base">{AGENCY_NAME}</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#services" className="hover:text-gray-700 dark:hover:text-neutral-300">Услуги</a>
              <a href="#process" className="hover:text-gray-700 dark:hover:text-neutral-300">Как мы работаем</a>
              <a href="#pricing" className="hover:text-gray-700 dark:hover:text-neutral-300">Тарифы</a>
              <a href="#cases" className="hover:text-gray-700 dark:hover:text-neutral-300">Кейсы</a>
              <a href="#faq" className="hover:text-gray-700 dark:hover:text-neutral-300">FAQ</a>
            </nav>
            <div className="flex items-center gap-3">
              <ThemeSwitch theme={theme} setTheme={setTheme} />
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 shadow-md shadow-orange-600/20 text-sm"
              >
                Связаться
              </motion.a>
            </div>
          </div>
        </header>

        {/* Hero (add top padding to clear fixed header) */}
        <section className="relative pt-28 md:pt-32">
          <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold leading-tight">
                Переводим и озвучиваем ваши{" "}
                <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">YouTube-ролики</span>
                <br />для выхода на новые рынки
              </motion.h1>
              <motion.p variants={fadeInUp} className="mt-4 text-lg text-gray-600 dark:text-neutral-300">
                Локализация контента на испанский, английский, русский и другие языки. Больше просмотров, CPM и подписчиков без смены формата.
              </motion.p>
              <motion.div variants={fadeInUp} className="mt-6 flex flex-col sm:flex-row gap-3">
                <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                  href={TELEGRAM_LINK} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white px-4 py-2">
                  Заказать бесплатное демо <ArrowRight className="w-4 h-4" />
                </motion.a>
                <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-2xl border border-orange-300 text-orange-700 hover:bg-orange-50 px-4 py-2 dark:border-orange-500/40 dark:text-orange-300 dark:hover:bg-orange-500/10">
                  Смотреть тарифы <PlayCircle className="w-5 h-5" />
                </motion.a>
              </motion.div>
              <motion.div variants={fadeInUp} className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-neutral-300">
                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-orange-600" />Срок от 48 часов</div>
                <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-orange-600" />Сохранение стиля автора</div>
                <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-orange-600" />AI + человек-редактор</div>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="relative">
              <div className="aspect-video rounded-2xl shadow-xl border border-black/5 dark:border-white/10 overflow-hidden grid grid-cols-2">
                <div className="relative p-6 bg-gray-50 dark:bg-neutral-900 flex flex-col justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-400 mb-2">Оригинал</div>
                    <div className="h-40 rounded-xl bg-white dark:bg-neutral-800 shadow-inner flex items-center justify-center text-gray-400 dark:text-neutral-500">Видео</div>
                  </div>
                  <div className="text-gray-500 dark:text-neutral-400 text-sm">EN / RU / ES</div>
                </div>
                <div className="relative p-6 bg-gradient-to-br from-orange-600 to-rose-600 text-white flex flex-col justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-white/70 mb-2">Локализация</div>
                    <div className="h-40 rounded-xl bg-black/30 border border-white/10 flex items-center justify-center">Озвучка / Субтитры</div>
                  </div>
                  <div className="text-white/80 text-sm">Адаптация под культуру</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="scroll-mt-24 py-20 bg-orange-50 dark:bg-neutral-950" data-testid="section-services">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2 variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-3xl font-bold">Услуги</motion.h2>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-gray-600 dark:text-neutral-300 mt-2">
              Соберите нужный пакет или оформите подписку на несколько роликов в месяц.
            </motion.p>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mt-10 grid md:grid-cols-3 gap-6">
              {[{
                icon: <Subtitles className="w-5 h-5" />,
                title: "Перевод + субтитры",
                items: ["Проверка редактором", "Адаптация терминов", "Быстрый релиз"],
                desc: "Точный перевод и стилевое выравнивание, тайм-коды и экспорт .srt/.vtt."
              }, {
                icon: <Mic2 className="w-5 h-5" />,
                title: "Перевод + озвучка",
                items: ["AI-голоса или актёры", "Сохранение интонаций", "Файлы .wav/.mp3 + финальный .mp4"],
                desc: "Даббинг с выбором голоса (м/ж, тембр), шумоподавление, сведение с оригиналом."
              }, {
                icon: <Clapperboard className="w-5 h-5" />,
                title: "Полная локализация канала",
                items: ["Аудит канала", "Подбор рынков (ES/DE/FR/AR)", "Запуск за 7–10 дней"],
                desc: "Обложки, описания, теги, перевод шапки/о канале, эндскрины и плейлисты."
              }].map((s, idx) => (
                <motion.div key={idx} variants={fadeInUp} whileHover={{ y: -4 }}>
                  <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-6">
                    <div className="flex items-center gap-2 font-semibold">{s.icon}{s.title}</div>
                    <p className="text-sm text-gray-600 dark:text-neutral-300 mt-2">{s.desc}</p>
                    <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-neutral-300">
                      {s.items.map((it) => (
                        <li key={it} className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-600" />{it}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="scroll-mt-24 py-20" data-testid="section-process">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2 variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-3xl font-bold">Как мы работаем</motion.h2>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mt-10 grid md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Бриф", text: "Вы выбираете язык, отправляете ссылку на ролик и пожелания." },
                { step: "2", title: "Демо", text: "Делам бесплатный 20–30 сек фрагмент для согласования голоса и стиля." },
                { step: "3", title: "Перевод/Озвучка", text: "Готовим субтитры и/или даббинг, согласовываем правки." },
                { step: "4", title: "Публикация", text: "Отдаём финальные файлы или помогаем с выгрузкой на канал." },
              ].map((i) => (
                <motion.div key={i.step} variants={fadeInUp} whileHover={{ y: -3 }}>
                  <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-6">
                    <div className="text-xl font-semibold">Шаг {i.step}. {i.title}</div>
                    <div className="text-gray-600 dark:text-neutral-300 mt-2">{i.text}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-24 py-20 bg-orange-50 dark:bg-neutral-950" data-testid="section-pricing">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2 variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-3xl font-bold">Тарифы</motion.h2>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-gray-600 dark:text-neutral-300 mt-2">
              Прозрачная стоимость. Скидки при подписке от 4 роликов в месяц.
            </motion.p>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mt-10 grid md:grid-cols-3 gap-6">
              <motion.div variants={fadeInUp} whileHover={{ y: -4 }}>
                <div className="rounded-2xl border border-gray-300 dark:border-white/10 bg-white dark:bg-neutral-900 p-6">
                  <div className="font-semibold">Субтитры</div>
                  <div className="text-3xl font-bold mt-2">от $6 <span className="text-base font-normal text-gray-500 dark:text-neutral-400">/ мин</span></div>
                  <ul className="text-sm text-gray-600 dark:text-neutral-300 space-y-2 mt-3">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-600" />Перевод + тайм-коды</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-600" />Форматы .srt/.vtt</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-600" />1 круг правок</li>
                  </ul>
                  <motion.a whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    href={TELEGRAM_LINK} target="_blank"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 shadow-orange-600/25 shadow-lg">
                    Заказать демо
                  </motion.a>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} whileHover={{ y: -4 }}>
                <div className="rounded-2xl border-2 border-orange-600 bg-white dark:bg-neutral-900 p-6">
                  <div className="font-semibold">Озвучка</div>
                  <div className="text-3xl font-bold mt-2">от $12 <span className="text-base font-normal text-gray-500 dark:text-neutral-400">/ мин</span></div>
                  <ul className="text-sm text-gray-600 dark:text-neutral-300 space-y-2 mt-3">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-600" />AI-голоса или актёры</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-600" />Сведение и шумоподавление</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-600" />2 круга правок</li>
                  </ul>
                  <motion.a whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    href={TELEGRAM_LINK} target="_blank"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 shadow-orange-600/25 shadow-lg">
                    Заказать демо
                  </motion.a>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} whileHover={{ y: -4 }}>
                <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 p-6">
                  <div className="font-semibold">Локализация канала</div>
                  <div className="text-3xl font-bold mt-2">по запросу</div>
                  <ul className="text-sm text-gray-600 dark:text-neutral-300 space-y-2 mt-3">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-600" />Обложки, описания, теги</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-600" />Аудит и стратегия выхода</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-600" />Локализация плейлистов</li>
                  </ul>
                  <motion.a whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    href={TELEGRAM_LINK} target="_blank"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 shadow-orange-600/25 shadow-lg">
                    Обсудить проект
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Cases */}
        <section id="cases" className="scroll-mt-24 py-20" data-testid="section-cases">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2 variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-3xl font-bold">Кейсы</motion.h2>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-gray-600 dark:text-neutral-300 mt-2">
              Несколько примеров до/после. Замените заглушки на ваши ролики.
            </motion.p>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mt-10 grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4 }}>
                  <div className="rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900">
                    <div className="aspect-video bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-gray-400 dark:text-neutral-500">Видео {i}</div>
                    <div className="p-4">
                      <div className="text-base font-semibold">Tech review → Spanish</div>
                      <div className="text-sm text-gray-600 dark:text-neutral-400">+130% просмотров из Латам</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-24 py-20 bg-gray-50 dark:bg-neutral-950" data-testid="section-contact">
          <div className="max-w-2xl mx-auto px-4">
            <motion.h2 variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-3xl font-bold text-center">Расскажите о проекте</motion.h2>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-gray-600 dark:text-neutral-300 text-center mt-2">
              Мы ответим в течение рабочего дня. Или напишите сразу в Telegram.
            </motion.p>
            <motion.form variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              onSubmit={(e) => { e.preventDefault(); alert("Спасибо! Мы свяжемся с вами в Telegram/по email."); }}
              className="mt-8 grid gap-4">
              <input placeholder="Ваше имя" required className="rounded-2xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 px-4 py-2" />
              <input type="email" placeholder="Почта" required className="rounded-2xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 px-4 py-2" />
              <input placeholder="Ссылка на канал/видео" className="rounded-2xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 px-4 py-2" />
              <textarea placeholder="Кратко опишите задачу (язык, длительность, дедлайн)" className="rounded-2xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 px-4 py-2" rows={5} />
              <div className="flex gap-3">
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                  type="submit" className="rounded-2xl bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 shadow-lg shadow-orange-600/25">
                  Отправить
                </motion.button>
                <motion.a whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                  href={TELEGRAM_LINK} target="_blank"
                  className="rounded-2xl border border-orange-300 text-orange-700 hover:bg-orange-50 px-4 py-2 dark:border-orange-500/40 dark:text-orange-300 dark:hover:bg-orange-500/10">
                  Написать в Telegram
                </motion.a>
              </div>
              <p className="text-xs text-gray-500 dark:text-neutral-400">Или напишите на почту: <a href={`mailto:${EMAIL}`} className="underline text-orange-700 hover:text-orange-800 dark:text-orange-300 dark:hover:text-orange-200">{EMAIL}</a></p>
            </motion.form>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-24 py-20" data-testid="section-faq">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2 variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-3xl font-bold">FAQ</motion.h2>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              {[
                { q: "Сколько занимает перевод и озвучка?", a: "Обычно 48–72 часа для ролика до 10 минут. Большие проекты — по договорённости." },
                { q: "Какие языки вы поддерживаете?", a: "EN/ES/RU/DE/FR — базово. Другие — по запросу, подключаем носителей." },
                { q: "Можно ли получить бесплатное демо?", a: "Да, делаем демо-фрагмент 20–30 секунд, чтобы утвердить голос и стиль." },
                { q: "Как считаете стоимость?", a: "По минутам финального видео. При подписке от 4 роликов — скидка." },
              ].map((f, i) => (
                <motion.div key={i} variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                  <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-6">
                    <div className="font-semibold">{f.q}</div>
                    <div className="text-gray-600 dark:text-neutral-300 mt-2">{f.a}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-black/5 dark:border-white/10 py-10">
          <div className="max-w-6xl mx-auto px-4 text-sm text-gray-600 dark:text-neutral-400 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>© {new Date().getFullYear()} {AGENCY_NAME}. Все права защищены.</div>
            <div className="flex items-center gap-4">
              <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer" className="underline text-orange-700 hover:text-orange-800 dark:text-orange-300 dark:hover:text-orange-200">Telegram</a>
              <a href={`mailto:${EMAIL}`} className="underline text-orange-700 hover:text-orange-800 dark:text-orange-300 dark:hover:text-orange-200">Email</a>
              <a href="#" className="underline text-orange-700 hover:text-orange-800 dark:text-orange-300 dark:hover:text-orange-200">Политика конфиденциальности</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

