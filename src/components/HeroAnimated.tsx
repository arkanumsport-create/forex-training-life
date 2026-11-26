"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  PlayCircle,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  BarChart3,
  Zap,
} from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function HeroAnimated() {
  // Триггер для периодического повтора побуквенного проявления заголовка по ТЗ
  const [animCycle, setAnimCycle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimCycle((prev) => prev + 1);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const titleWords = siteConfig.hero.animatedTitle.split(" ");

  return (
    <section className="relative overflow-hidden bg-[#0B0E14] pt-8 pb-0 sm:pt-14">
      {/* Фоновые эффекты и сетка */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
      <div className="pointer-events-none absolute -top-28 left-1/3 h-96 w-96 rounded-full bg-[#F5B041]/10 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 right-10 h-96 w-96 rounded-full bg-[#00E676]/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Левая колонка (7 колонок): Анимированный заголовок, описание и CTA кнопки */}
          <div className="lg:col-span-7">
            {/* Верхний бейдж */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F5B041]/30 bg-[#111622] px-3.5 py-1.5 text-xs font-bold tracking-wider text-[#F5B041] shadow-[0_0_20px_rgba(245,176,65,0.12)]">
              <span className="h-2 w-2 rounded-full bg-[#00E676] animate-pulse" />
              <span>{siteConfig.hero.badge}</span>
            </div>

            {/* Периодически проявляющийся по буквам заголовок: «Добро пожаловать на наш сайт ForexTraining Life» */}
            <h1
              key={animCycle}
              aria-label={siteConfig.hero.animatedTitle}
              className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[52px] lg:leading-[1.15]"
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
                      const delay = (wordIdx * 6 + charIdx) * 0.032;
                      return (
                        <motion.span
                          key={`${char}-${charIdx}`}
                          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          transition={{
                            duration: 0.32,
                            delay,
                            ease: "easeOut",
                          }}
                          className={
                            isBrand
                              ? " inline-block bg-gradient-to-r from-[#F5B041] via-[#FFD166] to-[#00E676] bg-clip-text text-transparent"
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

            {/* Подзаголовок и описание сути проекта */}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {siteConfig.hero.subtitle}
            </p>

            {/* Целевые кнопки (CTA) */}
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              {/* Основная кнопка: Золото/Зеленый градиент */}
              <a
                href={siteConfig.hero.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#F5B041] via-[#c7d95b] to-[#00E676] px-6 py-4 text-sm sm:text-base font-extrabold text-[#0B0E14] shadow-[0_0_30px_rgba(0,230,118,0.28)] hover:opacity-95 hover:shadow-[0_0_40px_rgba(245,176,65,0.45)] transition"
              >
                <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <span>{siteConfig.hero.primaryCta.label}</span>
              </a>

              {/* Вторичная кнопка: Контурная (скролл к видео-блоку Обзор рынка) */}
              <a
                href={siteConfig.hero.secondaryCta.href}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-[#111622]/90 px-6 py-4 text-sm sm:text-base font-bold text-white hover:border-[#F5B041] hover:text-[#F5B041] transition"
              >
                <PlayCircle className="h-5 w-5 text-[#F5B041]" />
                <span>{siteConfig.hero.secondaryCta.label}</span>
              </a>
            </div>

            {/* 3 ключевых преимущества под кнопками */}
            <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {siteConfig.hero.highlights.map((item, idx) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-[#111622]/80 p-3.5 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
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

          {/* Правая колонка (5 колонок): Брендовый аналитический терминал XAU/USD (БЕЗ фото автора по ТЗ) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-white/15 bg-[#111622]/95 p-5 shadow-[0_0_50px_rgba(0,0,0,0.75)]">
              {/* Верхняя шапка терминала */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/logo.png"
                    alt="FTL Logo"
                    className="h-9 w-9 rounded-lg border border-[#F5B041]/50 object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-extrabold text-white">
                        XAU / USD
                      </span>
                      <span className="rounded bg-[#F5B041]/20 px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#F5B041]">
                        GOLD SPOT
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Опционные зоны & Структура H4
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-lg font-black text-[#00E676]">
                    $2,718.45
                  </div>
                  <div className="font-mono text-xs font-bold text-[#00E676]">
                    +1.42% (+38.10) ▲
                  </div>
                </div>
              </div>

              {/* Визуализация графика и уровней Take-Profit / Liquidity */}
              <div className="relative my-4 rounded-xl border border-white/5 bg-[#0B0E14] p-3.5">
                <div className="mb-2 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-[#00E676] font-bold">
                    ● BUY ZONE ACTIVE (LONG)
                  </span>
                  <span className="font-mono text-slate-400">RR 1 : 3.2</span>
                </div>

                <svg viewBox="0 0 420 175" className="h-40 w-full overflow-visible">
                  <defs>
                    <linearGradient id="heroChartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00E676" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#00E676" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Уровень Take Profit */}
                  <line
                    x1="10"
                    y1="26"
                    x2="410"
                    y2="26"
                    stroke="#00E676"
                    strokeDasharray="4 4"
                    strokeOpacity="0.6"
                  />
                  <text
                    x="14"
                    y="20"
                    fill="#00E676"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    TAKE PROFIT 2: 2,738.50
                  </text>

                  {/* Уровень баланса / входа */}
                  <line
                    x1="10"
                    y1="95"
                    x2="410"
                    y2="95"
                    stroke="#F5B041"
                    strokeDasharray="4 4"
                    strokeOpacity="0.5"
                  />
                  <text
                    x="14"
                    y="89"
                    fill="#F5B041"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    OPTION BALANCE / ENTRY: 2,710.00
                  </text>

                  {/* Уровень Stop Loss */}
                  <line
                    x1="10"
                    y1="150"
                    x2="410"
                    y2="150"
                    stroke="#FF3D57"
                    strokeDasharray="4 4"
                    strokeOpacity="0.5"
                  />
                  <text
                    x="14"
                    y="163"
                    fill="#FF3D57"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    STOP LOSS: 2,698.00
                  </text>

                  {/* Область и кривая цены */}
                  <path
                    d="M 15 135 L 55 120 L 95 130 L 135 98 L 175 112 L 215 76 L 255 88 L 295 58 L 335 68 L 375 38 L 405 28 L 405 165 L 15 165 Z"
                    fill="url(#heroChartGrad)"
                  />
                  <motion.path
                    d="M 15 135 L 55 120 L 95 130 L 135 98 L 175 112 L 215 76 L 255 88 L 295 58 L 335 68 L 375 38 L 405 28"
                    fill="none"
                    stroke="#00E676"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.2, ease: "easeInOut" }}
                  />

                  {/* Точка текущей цены */}
                  <circle cx="405" cy="28" r="5" fill="#F5B041" />
                  <circle
                    cx="405"
                    cy="28"
                    r="10"
                    fill="none"
                    stroke="#F5B041"
                    strokeWidth="1.5"
                    opacity="0.6"
                  />
                </svg>
              </div>

              {/* Нижние метрики терминала */}
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="rounded-xl border border-white/5 bg-[#0B0E14] p-2.5">
                  <span className="block text-[10px] uppercase text-slate-400">
                    Тренд D1/H4
                  </span>
                  <span className="mt-0.5 block font-mono text-xs font-extrabold text-[#00E676]">
                    BULLISH ▲
                  </span>
                </div>
                <div className="rounded-xl border border-white/5 bg-[#0B0E14] p-2.5">
                  <span className="block text-[10px] uppercase text-slate-400">
                    Инструменты
                  </span>
                  <span className="mt-0.5 block font-mono text-xs font-extrabold text-[#F5B041]">
                    Forex & Crypto
                  </span>
                </div>
                <div className="rounded-xl border border-white/5 bg-[#0B0E14] p-2.5">
                  <span className="block text-[10px] uppercase text-slate-400">
                    Опыт в рынке
                  </span>
                  <span className="mt-0.5 block font-mono text-xs font-extrabold text-white">
                    17+ ЛЕТ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Бегущая строка / Виджет котировок (Ticker Tape): XAU/USD, EUR/USD, GBP/USD, BTC/USDT, ETH/USDT */}
      <div className="mt-12 border-y border-white/10 bg-[#111622]/90 py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {siteConfig.tickers.map((ticker) => (
              <div
                key={ticker.symbol}
                className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-[#0B0E14]/80 px-3.5 py-2"
              >
                <span
                  className={`font-mono text-xs font-extrabold ${
                    ticker.isGold ? "text-[#F5B041]" : "text-white"
                  }`}
                >
                  {ticker.symbol}
                </span>
                <span className="font-mono text-xs font-bold text-slate-200">
                  {ticker.price}
                </span>
                <span
                  className={`inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 font-mono text-[11px] font-bold ${
                    ticker.isPositive
                      ? "bg-[#00E676]/15 text-[#00E676]"
                      : "bg-[#FF3D57]/15 text-[#FF3D57]"
                  }`}
                >
                  {ticker.isPositive ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {ticker.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
