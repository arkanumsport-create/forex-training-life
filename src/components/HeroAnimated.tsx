"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  PlayCircle,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  BarChart3,
  Zap,
  LineChart,
  ExternalLink,
} from "lucide-react";
import { siteConfig, assetPath } from "@/config/siteConfig";
import { useAppSettings } from "@/context/AppSettingsContext";
import { getT, MARKET_QUOTES } from "@/config/translations";

interface HeroAnimatedProps {
  introDone?: boolean;
}

export default function HeroAnimated({ introDone = false }: HeroAnimatedProps) {
  const { lang } = useAppSettings();
  const t = getT(lang);

  // Фильтр в списке 10 котировок справа: Все (10) / Forex (5) / Crypto (5)
  const [quoteFilter, setQuoteFilter] = useState<"all" | "forex" | "crypto">("all");
  const [animCycle, setAnimCycle] = useState(0);
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);
  const videoPlayedOnceRef = useRef(false);

  // Периодический повтор анимации букв заголовка
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimCycle((prev) => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Видео-фон графика проигрывается 1 раз сразу после заставки и застывает на последнем кадре (статика)
  useEffect(() => {
    if (introDone && bgVideoRef.current && !videoPlayedOnceRef.current) {
      videoPlayedOnceRef.current = true;
      bgVideoRef.current.currentTime = 0;
      bgVideoRef.current.play().catch(() => {});
    }
  }, [introDone]);

  const filteredQuotes = MARKET_QUOTES.filter((q) =>
    quoteFilter === "all" ? true : q.category === quoteFilter
  );

  const titleWords = t.hero.animatedTitle.split(" ");

  return (
    <section className="relative overflow-hidden border-b border-slate-200 dark:border-white/10 bg-slate-950">
      {/* Анимационный видео-фон графика (под верхней шапкой): играет 1 раз и застывает на финальном кадре */}
      <video
        ref={bgVideoRef}
        src={assetPath("/videos/hero-chart-bg.mp4")}
        muted
        playsInline
        preload="auto"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55 dark:opacity-50"
      />

      {/* Контрастная вуаль для 100% читаемости текста и в Тёмной, и в Светлой теме */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#07090F]/92 via-[#0B0E14]/82 to-[#07090F]/88 dark:from-[#07090F]/90 dark:via-[#0B0E14]/78 dark:to-[#07090F]/88" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-50 dark:from-[#0B0E14] to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Левая колонка (6 колонок): Заголовок, слоган, описание и целевые кнопки */}
          <div className="lg:col-span-6 lg:pt-4">
            {/* Верхний бейдж */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F5B041]/40 bg-[#0B0E14]/80 px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider text-[#F5B041] backdrop-blur-md shadow-lg">
              <span className="h-2 w-2 rounded-full bg-[#00E676] animate-pulse" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Побуквенно проявляющийся заголовок */}
            <h1
              key={`${lang}-${animCycle}`}
              aria-label={t.hero.animatedTitle}
              className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl lg:leading-[1.14] drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]"
            >
              {titleWords.map((word, wordIdx) => {
                const isBrand =
                  word.includes("ForexTraining") || word.includes("Life");
                return (
                  <span
                    key={`${word}-${wordIdx}`}
                    className="mr-3 inline-block whitespace-nowrap"
                  >
                    {Array.from(word).map((char, charIdx) => {
                      const delay = (wordIdx * 5 + charIdx) * 0.028;
                      return (
                        <motion.span
                          key={`${char}-${charIdx}`}
                          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          transition={{
                            duration: 0.3,
                            delay,
                            ease: "easeOut",
                          }}
                          className={
                            isBrand
                              ? "inline-block bg-gradient-to-r from-[#F5B041] via-[#FFD166] to-[#00E676] bg-clip-text text-transparent"
                              : "inline-block text-white"
                          }
                        >
                          {char}
                        </motion.span>
                      );
                    })}
                  </span>
                );
              })}
            </h1>

            {/* Слоган */}
            <p className="mt-3 text-base sm:text-xl font-bold text-[#F5B041] drop-shadow">
              {t.hero.slogan}
            </p>

            {/* Описание проекта */}
            <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-slate-200">
              {t.hero.subtitle}
            </p>

            {/* Целевые кнопки CTA */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={siteConfig.socials.telegram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#F5B041] via-[#cbe05a] to-[#00E676] px-6 py-4 text-sm sm:text-base font-extrabold text-[#0B0E14] shadow-[0_0_30px_rgba(245,176,65,0.35)] hover:opacity-95 transition"
              >
                <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <span>{t.hero.primaryCta}</span>
              </a>

              <a
                href="#market-review"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/25 bg-[#0B0E14]/75 px-6 py-4 text-sm sm:text-base font-bold text-white backdrop-blur-md hover:border-[#F5B041] hover:text-[#F5B041] transition"
              >
                <PlayCircle className="h-5 w-5 text-[#F5B041]" />
                <span>{t.hero.secondaryCta}</span>
              </a>
            </div>

            {/* 3 ключевых блока преимуществ */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {t.hero.highlights.map((item, idx) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/15 bg-[#0B0E14]/75 p-3.5 backdrop-blur-md"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    {idx === 0 && <BarChart3 className="h-4 w-4 text-[#F5B041]" />}
                    {idx === 1 && <ShieldCheck className="h-4 w-4 text-[#00E676]" />}
                    {idx === 2 && <Zap className="h-4 w-4 text-[#F5B041]" />}
                    <span>{item.label}</span>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm font-bold text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Правая колонка (6 колонок): Список 10 котировок (5 Forex + 5 Crypto) с кнопкой «Смотреть график» в TradingView */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/15 bg-white/95 dark:bg-[#111622]/92 p-4 sm:p-5 backdrop-blur-xl shadow-2xl">
              {/* Заголовок панели котировок */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 dark:bg-[#F5B041]/15 border border-amber-500/30 dark:border-[#F5B041]/40 text-amber-600 dark:text-[#F5B041]">
                    <LineChart className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                        {t.hero.quotesPanel.title}
                      </h2>
                      <span className="inline-flex items-center gap-1 rounded bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-700 dark:text-[#00E676]">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-[#00E676] animate-pulse" />
                        {t.hero.quotesPanel.liveBadge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {t.hero.quotesPanel.subtitle}
                    </p>
                  </div>
                </div>

                {/* Фильтр: Все (10) / Forex (5) / Crypto (5) */}
                <div className="flex items-center rounded-xl bg-slate-100 dark:bg-[#0B0E14] p-1 border border-slate-200 dark:border-white/10">
                  {(
                    [
                      { key: "all", label: t.hero.quotesPanel.tabAll },
                      { key: "forex", label: t.hero.quotesPanel.tabForex },
                      { key: "crypto", label: t.hero.quotesPanel.tabCrypto },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setQuoteFilter(tab.key)}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition cursor-pointer ${
                        quoteFilter === tab.key
                          ? "bg-amber-500 dark:bg-[#F5B041] text-white dark:text-[#0B0E14] shadow-sm"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Список котировок (до 10 штук: 5 Forex + 5 Crypto) */}
              <div className="mt-3 divide-y divide-slate-200/80 dark:divide-white/5 max-h-[440px] overflow-y-auto pr-1">
                {filteredQuotes.map((quote) => (
                  <div
                    key={quote.symbol}
                    className="group flex items-center justify-between gap-2 py-2.5 px-2 rounded-xl hover:bg-slate-100/90 dark:hover:bg-white/[0.04] transition"
                  >
                    {/* Инструмент и категория */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[9px] font-extrabold uppercase ${
                          quote.category === "forex"
                            ? "bg-amber-500/15 text-amber-700 dark:text-[#F5B041] border border-amber-500/30"
                            : "bg-sky-500/15 text-sky-700 dark:text-sky-400 border border-sky-500/30"
                        }`}
                      >
                        {quote.category === "forex" ? "FX" : "CR"}
                      </span>
                      <div className="min-w-0">
                        <div
                          className={`font-mono text-xs sm:text-sm font-extrabold truncate ${
                            quote.isGold
                              ? "text-amber-600 dark:text-[#F5B041]"
                              : "text-slate-900 dark:text-white"
                          }`}
                        >
                          {quote.symbol}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {quote.label}
                        </div>
                      </div>
                    </div>

                    {/* Цена и процент */}
                    <div className="text-right shrink-0">
                      <div className="font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                        {quote.price}
                      </div>
                      <div
                        className={`inline-flex items-center gap-0.5 font-mono text-[10px] font-bold ${
                          quote.isPositive
                            ? "text-emerald-600 dark:text-[#00E676]"
                            : "text-rose-600 dark:text-[#FF3D57]"
                        }`}
                      >
                        {quote.isPositive ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {quote.change}
                      </div>
                    </div>

                    {/* Кнопка «Смотреть график» — открывает TradingView */}
                    <a
                      href={quote.tvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-amber-500/40 dark:border-[#F5B041]/40 bg-amber-500/10 dark:bg-[#F5B041]/10 px-2.5 py-1.5 text-[11px] font-bold text-amber-700 dark:text-[#F5B041] hover:bg-amber-500 hover:text-white dark:hover:bg-[#F5B041] dark:hover:text-[#0B0E14] transition"
                    >
                      <span>{t.hero.quotesPanel.viewChart}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                ))}
              </div>

              {/* Подсказка внизу панели */}
              <div className="mt-3 border-t border-slate-200 dark:border-white/10 pt-2.5 text-center text-[11px] text-slate-500 dark:text-slate-400">
                {t.hero.quotesPanel.footerNote}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
