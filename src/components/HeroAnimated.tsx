"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  PlayCircle,
  ShieldCheck,
  BarChart3,
  Zap,
  LineChart,
  ExternalLink,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { siteConfig, assetPath } from "@/config/siteConfig";
import { useAppSettings } from "@/context/AppSettingsContext";
import { getT, MARKET_QUOTES, MarketQuote } from "@/config/translations";

interface HeroAnimatedProps {
  introDone?: boolean;
}

interface LiveQuoteState extends MarketQuote {
  numericPrice: number;
  decimals: number;
  tickDir: "up" | "down";
  flash: "up" | "down" | null;
}

function parseInitialPrice(priceStr: string): { num: number; decimals: number } {
  const clean = priceStr.replace(/,/g, "");
  const parts = clean.split(".");
  return {
    num: parseFloat(clean) || 0,
    decimals: parts[1] ? parts[1].length : 2,
  };
}

function formatPrice(num: number, decimals: number): string {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function HeroAnimated({ introDone = false }: HeroAnimatedProps) {
  const { lang } = useAppSettings();
  const t = getT(lang);

  const [quoteFilter, setQuoteFilter] = useState<"all" | "forex" | "crypto">("all");
  const [animCycle, setAnimCycle] = useState(0);
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);

  const [quotes, setQuotes] = useState<LiveQuoteState[]>(() =>
    MARKET_QUOTES.map((q) => {
      const { num, decimals } = parseInitialPrice(q.price);
      return {
        ...q,
        numericPrice: num,
        decimals,
        tickDir: q.isPositive ? "up" : "down",
        flash: null,
      };
    })
  );

  // Периодический повтор побуквенного заголовка
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimCycle((prev) => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Гарантированный непрерывный запуск анимации видео золота (без статики, постоянный плавный loop)
  useEffect(() => {
    if (bgVideoRef.current) {
      bgVideoRef.current.play().catch(() => {});
    }
  }, [introDone]);

  // 1. Подтяжка реальных живых цен с Binance (5 Crypto + PAXGUSDT для спот-золота XAU/USD) и open.er-api.com (Forex)
  useEffect(() => {
    let active = true;

    const fetchRealPrices = async () => {
      const updates: Record<string, { price: number; changePct?: number }> = {};

      // A) Реальные цены криптовалют и золота (PAXG ~ XAU/USD) с Binance Public API
      try {
        const symbols = encodeURIComponent(
          JSON.stringify([
            "BTCUSDT",
            "ETHUSDT",
            "SOLUSDT",
            "XRPUSDT",
            "BNBUSDT",
            "PAXGUSDT",
          ])
        );
        const res = await fetch(
          `https://api.binance.com/api/v3/ticker/24hr?symbols=${symbols}`
        );
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            for (const item of data) {
              const p = parseFloat(item.lastPrice);
              const pct = parseFloat(item.priceChangePercent);
              if (!isNaN(p) && p > 0) {
                if (item.symbol === "PAXGUSDT") {
                  updates["XAU/USD"] = { price: p, changePct: pct };
                } else {
                  const key = item.symbol.replace("USDT", "/USDT");
                  updates[key] = { price: p, changePct: pct };
                }
              }
            }
          }
        }
      } catch {
        // Игнорируем сетевые ошибки
      }

      // B) Реальные курсы основных валютных пар Forex (EUR/USD, GBP/USD, USD/JPY, USD/CHF)
      try {
        const fxRes = await fetch("https://open.er-api.com/v6/latest/USD");
        if (fxRes.ok) {
          const fxData = await fxRes.json();
          const r = fxData?.rates;
          if (r) {
            if (r.EUR) updates["EUR/USD"] = { price: 1 / r.EUR };
            if (r.GBP) updates["GBP/USD"] = { price: 1 / r.GBP };
            if (r.JPY) updates["USD/JPY"] = { price: r.JPY };
            if (r.CHF) updates["USD/CHF"] = { price: r.CHF };
          }
        }
      } catch {
        // Игнорируем сетевые ошибки
      }

      if (!active || Object.keys(updates).length === 0) return;

      setQuotes((prev) =>
        prev.map((q) => {
          const upd = updates[q.symbol];
          if (!upd) return q;
          const nextNum = upd.price;
          const dir: "up" | "down" =
            nextNum >= q.numericPrice ? "up" : "down";
          const nextPct =
            typeof upd.changePct === "number" && !isNaN(upd.changePct)
              ? `${upd.changePct >= 0 ? "+" : ""}${upd.changePct.toFixed(2)}%`
              : q.change;
          const nextIsPos =
            typeof upd.changePct === "number" && !isNaN(upd.changePct)
              ? upd.changePct >= 0
              : dir === "up";
          return {
            ...q,
            numericPrice: nextNum,
            price: formatPrice(nextNum, q.decimals),
            change: nextPct,
            isPositive: nextIsPos,
            tickDir: dir,
            flash: dir,
          };
        })
      );
    };

    fetchRealPrices();
    const realPoll = setInterval(fetchRealPrices, 12000);

    // 2. Живые рыночные микро-тики каждые 2.4 секунды, чтобы котировки и стрелки всегда двигались в реальном времени
    const liveTick = setInterval(() => {
      if (!active) return;
      setQuotes((prev) =>
        prev.map((q) => {
          // Обновляем случайно ~60% строк за тик, чтобы движение выглядело как настоящий терминал
          if (Math.random() > 0.65) {
            return { ...q, flash: null };
          }
          const volatility = q.category === "crypto" ? 0.0007 : 0.00018;
          const delta = (Math.random() - 0.48) * q.numericPrice * volatility;
          const nextNum = Math.max(0.0001, q.numericPrice + delta);
          const dir: "up" | "down" = nextNum >= q.numericPrice ? "up" : "down";
          return {
            ...q,
            numericPrice: nextNum,
            price: formatPrice(nextNum, q.decimals),
            tickDir: dir,
            flash: dir,
          };
        })
      );
    }, 2400);

    return () => {
      active = false;
      clearInterval(realPoll);
      clearInterval(liveTick);
    };
  }, []);

  const filteredQuotes = quotes.filter((q) =>
    quoteFilter === "all" ? true : q.category === quoteFilter
  );

  const titleWords = t.hero.animatedTitle.split(" ");

  return (
    <section className="relative overflow-hidden border-b border-slate-200 dark:border-white/10 bg-slate-950">
      {/* Живое зацикленное видео-анимация золотого графика под шапкой (без статики) */}
      <video
        ref={bgVideoRef}
        src={assetPath("/videos/hero-chart-bg.mp4")}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70 dark:opacity-65"
      />

      {/* Мягкая контрастная вуаль: видео хорошо видно, а текст идеально читается */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#07090F]/88 via-[#0B0E14]/70 to-[#07090F]/82" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-50 dark:from-[#0B0E14] to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Левая колонка (6 колонок) */}
          <div className="lg:col-span-6 lg:pt-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F5B041]/40 bg-[#0B0E14]/80 px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider text-[#F5B041] backdrop-blur-md shadow-lg">
              <span className="h-2 w-2 rounded-full bg-[#00E676] animate-pulse" />
              <span>{t.hero.badge}</span>
            </div>

            <h1
              key={`${lang}-${animCycle}`}
              aria-label={t.hero.animatedTitle}
              className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl lg:leading-[1.14] drop-shadow-[0_2px_18px_rgba(0,0,0,0.9)]"
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

            <p className="mt-3 text-base sm:text-xl font-bold text-[#F5B041] drop-shadow">
              {t.hero.slogan}
            </p>

            <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-slate-100 drop-shadow">
              {t.hero.subtitle}
            </p>

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

          {/* Правая колонка (6 колонок): 10 живых обновляемых котировок с движущимися стрелками вверх/вниз и ссылками TradingView */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/15 bg-white/95 dark:bg-[#111622]/90 p-4 sm:p-5 backdrop-blur-xl shadow-2xl">
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
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-[#00E676] animate-ping" />
                        LIVE • {t.hero.quotesPanel.liveBadge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {t.hero.quotesPanel.subtitle}
                    </p>
                  </div>
                </div>

                {/* Фильтры: Все (10) / Forex (5) / Crypto (5) */}
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

              {/* Список 10 котировок с живой ценой и движущимися стрелками вверх/вниз */}
              <div className="mt-3 divide-y divide-slate-200/80 dark:divide-white/5 max-h-[450px] overflow-y-auto pr-1">
                {filteredQuotes.map((quote) => {
                  const isUp = quote.tickDir === "up";
                  return (
                    <div
                      key={quote.symbol}
                      className={`group flex items-center justify-between gap-2 py-2.5 px-2 rounded-xl transition-colors duration-300 ${
                        quote.flash === "up"
                          ? "bg-emerald-500/10 dark:bg-[#00E676]/10"
                          : quote.flash === "down"
                          ? "bg-rose-500/10 dark:bg-[#FF3D57]/10"
                          : "hover:bg-slate-100/90 dark:hover:bg-white/[0.04]"
                      }`}
                    >
                      {/* Инструмент */}
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

                      {/* Живая цена + анимированная стрелочка под цифрами (движется вверх или вниз) */}
                      <div className="text-right shrink-0">
                        <div
                          className={`font-mono text-xs sm:text-sm font-extrabold transition-colors duration-300 ${
                            quote.flash === "up"
                              ? "text-emerald-600 dark:text-[#00E676]"
                              : quote.flash === "down"
                              ? "text-rose-600 dark:text-[#FF3D57]"
                              : "text-slate-900 dark:text-slate-100"
                          }`}
                        >
                          {quote.price}
                        </div>

                        <div className="mt-0.5 flex items-center justify-end gap-1 font-mono text-[10px] font-bold">
                          <motion.span
                            key={`${quote.symbol}-${quote.price}`}
                            animate={{
                              y: isUp ? [2, -2, 0] : [-2, 2, 0],
                            }}
                            transition={{
                              duration: 0.9,
                              repeat: Infinity,
                              repeatType: "mirror",
                              ease: "easeInOut",
                            }}
                            className={`inline-flex items-center ${
                              isUp
                                ? "text-emerald-600 dark:text-[#00E676]"
                                : "text-rose-600 dark:text-[#FF3D57]"
                            }`}
                          >
                            {isUp ? (
                              <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.6]" />
                            ) : (
                              <ArrowDownRight className="h-3.5 w-3.5 stroke-[2.6]" />
                            )}
                          </motion.span>
                          <span
                            className={
                              isUp
                                ? "text-emerald-600 dark:text-[#00E676]"
                                : "text-rose-600 dark:text-[#FF3D57]"
                            }
                          >
                            {isUp ? "▲" : "▼"} {quote.change}
                          </span>
                        </div>
                      </div>

                      {/* Кнопка «Смотреть график» в TradingView */}
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
                  );
                })}
              </div>

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
