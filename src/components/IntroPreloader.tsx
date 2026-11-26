"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkipForward, TrendingUp, TrendingDown } from "lucide-react";
import { siteConfig, assetPath } from "@/config/siteConfig";

interface IntroPreloaderProps {
  onComplete?: () => void;
}

interface CandleData {
  x: number;
  open: number;
  close: number;
  high: number;
  low: number;
  bull: boolean;
}

// Данные свечного графика XAU/USD (координаты Y в SVG: меньше = выше цена)
const XAU_CANDLES: CandleData[] = [
  { x: 50, open: 255, close: 230, high: 218, low: 268, bull: true },
  { x: 95, open: 230, close: 205, high: 192, low: 242, bull: true },
  { x: 140, open: 205, close: 228, high: 196, low: 240, bull: false },
  { x: 185, open: 228, close: 185, high: 170, low: 236, bull: true },
  { x: 230, open: 185, close: 158, high: 145, low: 196, bull: true },
  { x: 275, open: 158, close: 188, high: 150, low: 202, bull: false },
  { x: 320, open: 188, close: 210, high: 178, low: 224, bull: false },
  { x: 365, open: 210, close: 168, high: 152, low: 218, bull: true },
  { x: 410, open: 168, close: 132, high: 118, low: 176, bull: true },
  { x: 455, open: 132, close: 156, high: 124, low: 168, bull: false },
  { x: 500, open: 156, close: 115, high: 102, low: 165, bull: true },
  { x: 545, open: 115, close: 88, high: 74, low: 125, bull: true },
  { x: 590, open: 88, close: 118, high: 80, low: 132, bull: false },
  { x: 635, open: 118, close: 78, high: 62, low: 126, bull: true },
  { x: 680, open: 78, close: 52, high: 38, low: 88, bull: true },
  { x: 725, open: 52, close: 76, high: 46, low: 92, bull: false },
  { x: 770, open: 76, close: 44, high: 28, low: 84, bull: true },
  { x: 815, open: 44, close: 26, high: 14, low: 54, bull: true },
];

// Точки для плавной золотой линии тренда XAU/USD
const TREND_LINE_PATH =
  "M 30 265 L 50 230 L 95 205 L 140 228 L 185 185 L 230 158 L 275 188 L 320 210 L 365 168 L 410 132 L 455 156 L 500 115 L 545 88 L 590 118 L 635 78 L 680 52 L 725 76 L 770 44 L 815 26 L 855 18";

const TREND_AREA_PATH = `${TREND_LINE_PATH} L 855 300 L 30 300 Z`;

// Импульсные стрелки вдоль графика (зелёные на росте, красные на коррекциях)
const TREND_ARROWS = [
  { id: 1, x: 92, y: 172, type: "bull" as const, delay: 0.35, label: "+140 pts" },
  { id: 2, x: 140, y: 254, type: "bear" as const, delay: 0.65, label: "-55 pts" },
  { id: 3, x: 228, y: 124, type: "bull" as const, delay: 0.9, label: "+210 pts" },
  { id: 4, x: 318, y: 238, type: "bear" as const, delay: 1.15, label: "-95 pts" },
  { id: 5, x: 410, y: 98, type: "bull" as const, delay: 1.4, label: "+260 pts" },
  { id: 6, x: 545, y: 54, type: "bull" as const, delay: 1.75, label: "BUY XAU/USD" },
  { id: 7, x: 590, y: 148, type: "bear" as const, delay: 1.95, label: "RETEST" },
  { id: 8, x: 790, y: 16, type: "bull" as const, delay: 2.2, label: "TP 2,738.50" },
];

export default function IntroPreloader({ onComplete }: IntroPreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [impactTriggered, setImpactTriggered] = useState(false);
  const [livePrice, setLivePrice] = useState(2694.2);

  useEffect(() => {
    if (!siteConfig.features.enableIntroPreloader) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    // Живой счетчик цены XAU/USD во время отрисовки графика
    const priceInterval = setInterval(() => {
      setLivePrice((prev) => {
        const next = prev + (Math.random() * 2.8 - 0.5);
        return next > 2738.5 ? 2738.5 : Number(next.toFixed(2));
      });
    }, 90);

    // Момент столкновения Быка и Медведя (~1.85 сек)
    const impactTimer = setTimeout(() => {
      setImpactTriggered(true);
    }, 1850);

    // Автоматическое завершение заставки (~3.3 сек)
    const finishTimer = setTimeout(() => {
      handleSkip();
    }, 3300);

    return () => {
      clearInterval(priceInterval);
      clearTimeout(impactTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete?.();
    }, 550);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="ftl-intro-preloader"
          initial={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: "blur(8px)",
            transition: { duration: 0.55, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[120] flex flex-col justify-between overflow-hidden bg-[#0B0E14] text-white select-none"
        >
          {/* Фоновое свечение и терминальная сетка */}
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-[#00E676]/10 blur-[130px]" />
          <div className="pointer-events-none absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-[#FF3D57]/10 blur-[130px]" />
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-[#F5B041]/10 blur-[120px]" />

          {/* Верхняя панель заставки: Бренд + Котировка XAU/USD + Кнопка Пропустить */}
          <div className="relative z-20 flex items-center justify-between px-5 pt-5 sm:px-10 sm:pt-7">
            <div className="flex items-center gap-3">
              <img
                src={assetPath("/logo.png")}
                alt="ForexTraining Life"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl border border-[#F5B041]/50 object-cover shadow-[0_0_20px_rgba(245,176,65,0.25)]"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-extrabold tracking-tight text-white">
                    ForexTraining <span className="text-[#F5B041]">Life</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center rounded-md bg-[#00E676]/15 px-2 py-0.5 text-[10px] font-bold text-[#00E676] border border-[#00E676]/30">
                    LIVE TERMINAL
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Forex & Crypto Trading Academy
                </p>
              </div>
            </div>

            {/* Живой тикер золота XAU/USD */}
            <div className="hidden md:flex items-center gap-4 rounded-xl border border-[#F5B041]/30 bg-[#111622]/90 px-4 py-2 backdrop-blur-md shadow-[0_0_25px_rgba(245,176,65,0.12)]">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#00E676] animate-ping" />
                <span className="text-xs font-bold tracking-wider text-[#F5B041]">
                  XAU / USD (GOLD)
                </span>
              </div>
              <span className="font-mono text-base font-extrabold text-white">
                ${livePrice.toFixed(2)}
              </span>
              <span className="rounded bg-[#00E676]/15 px-2 py-0.5 font-mono text-xs font-bold text-[#00E676]">
                +1.64% ▲
              </span>
            </div>

            {/* Кнопка Пропустить */}
            <button
              onClick={handleSkip}
              className="group flex items-center gap-2 rounded-xl border border-white/15 bg-[#111622]/90 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:border-[#F5B041]/60 hover:text-white transition shadow-lg cursor-pointer"
            >
              <span>Пропустить</span>
              <SkipForward className="h-4 w-4 text-[#F5B041] transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Центральная сцена: Живой свечной и линейный график XAU/USD с зелёными и красными стрелками */}
          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4">
            <div className="mb-2 flex items-center gap-3 md:hidden">
              <span className="text-xs font-bold text-[#F5B041]">XAU/USD</span>
              <span className="font-mono text-sm font-extrabold text-white">
                ${livePrice.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-[#00E676]">+1.64% ▲</span>
            </div>

            <div className="relative w-full rounded-2xl border border-white/10 bg-[#111622]/60 p-3 sm:p-6 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.6)]">
              {/* Заголовок графика */}
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="rounded bg-[#F5B041]/20 px-2 py-0.5 font-mono font-bold text-[#F5B041] border border-[#F5B041]/40">
                    XAUUSD • H4
                  </span>
                  <span className="text-slate-400">
                    Золото / Доллар США — Рыночная структура и импульсы ликвидности
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[11px]">
                  <span className="flex items-center gap-1 text-[#00E676] font-semibold">
                    <TrendingUp className="h-3.5 w-3.5" /> Импульс роста (LONG)
                  </span>
                  <span className="flex items-center gap-1 text-[#FF3D57] font-semibold">
                    <TrendingDown className="h-3.5 w-3.5" /> Коррекция (SHORT)
                  </span>
                </div>
              </div>

              {/* SVG График XAU/USD */}
              <svg
                viewBox="0 0 880 300"
                className="h-44 sm:h-64 w-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="xauAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F5B041" stopOpacity="0.28" />
                    <stop offset="55%" stopColor="#00E676" stopOpacity="0.09" />
                    <stop offset="100%" stopColor="#0B0E14" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="xauLineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#F5B041" />
                    <stop offset="50%" stopColor="#00E676" />
                    <stop offset="100%" stopColor="#F5B041" />
                  </linearGradient>
                  <filter id="neonGlowGreen" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="neonGlowRed" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Горизонтальные уровни ликвидности */}
                {[60, 120, 180, 240].map((yLevel, idx) => (
                  <g key={yLevel}>
                    <line
                      x1="20"
                      y1={yLevel}
                      x2="860"
                      y2={yLevel}
                      stroke="rgba(255,255,255,0.06)"
                      strokeDasharray="5 5"
                    />
                    <text
                      x="864"
                      y={yLevel + 4}
                      fill="rgba(148,163,184,0.45)"
                      fontSize="10"
                      fontFamily="monospace"
                    >
                      {(2740 - idx * 20).toFixed(0)}
                    </text>
                  </g>
                ))}

                {/* Заливка под графиком */}
                <motion.path
                  d={TREND_AREA_PATH}
                  fill="url(#xauAreaGrad)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                />

                {/* Японские свечи XAU/USD */}
                {XAU_CANDLES.map((c, idx) => {
                  const color = c.bull ? "#00E676" : "#FF3D57";
                  const bodyTop = Math.min(c.open, c.close);
                  const bodyHeight = Math.max(Math.abs(c.close - c.open), 6);
                  return (
                    <motion.g
                      key={c.x}
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      transition={{
                        duration: 0.25,
                        delay: idx * 0.11,
                        ease: "easeOut",
                      }}
                      style={{ transformOrigin: `${c.x}px ${bodyTop + bodyHeight / 2}px` }}
                    >
                      {/* Фитиль свечи */}
                      <line
                        x1={c.x}
                        y1={c.high}
                        x2={c.x}
                        y2={c.low}
                        stroke={color}
                        strokeWidth="2"
                      />
                      {/* Тело свечи */}
                      <rect
                        x={c.x - 8}
                        y={bodyTop}
                        width="16"
                        height={bodyHeight}
                        rx="2"
                        fill={color}
                        fillOpacity={c.bull ? 0.9 : 0.85}
                        stroke={color}
                        strokeWidth="1"
                      />
                    </motion.g>
                  );
                })}

                {/* Плавная золотая/изумрудная линия тренда поверх свечей */}
                <motion.path
                  d={TREND_LINE_PATH}
                  fill="none"
                  stroke="url(#xauLineGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.1, ease: "easeInOut" }}
                />

                {/* Анимированные зеленые стрелки вверх (импульсы роста) и красные вниз (коррекции) */}
                {TREND_ARROWS.map((arrow) => {
                  const isBull = arrow.type === "bull";
                  const color = isBull ? "#00E676" : "#FF3D57";
                  return (
                    <motion.g
                      key={arrow.id}
                      initial={{
                        opacity: 0,
                        y: isBull ? 18 : -18,
                        scale: 0.6,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: arrow.delay,
                        type: "spring",
                        stiffness: 220,
                      }}
                      filter={isBull ? "url(#neonGlowGreen)" : "url(#neonGlowRed)"}
                    >
                      {isBull ? (
                        // Зеленая стрелка вверх (#00E676)
                        <g transform={`translate(${arrow.x}, ${arrow.y})`}>
                          <path
                            d="M 0 -16 L -10 -2 L -4 -2 L -4 12 L 4 12 L 4 -2 L 10 -2 Z"
                            fill={color}
                          />
                          <rect
                            x="-34"
                            y="-35"
                            width="68"
                            height="16"
                            rx="4"
                            fill="#0B0E14"
                            stroke={color}
                            strokeWidth="1"
                          />
                          <text
                            x="0"
                            y="-24"
                            textAnchor="middle"
                            fill={color}
                            fontSize="9"
                            fontWeight="bold"
                            fontFamily="monospace"
                          >
                            ▲ {arrow.label}
                          </text>
                        </g>
                      ) : (
                        // Красная стрелка вниз (#FF3D57)
                        <g transform={`translate(${arrow.x}, ${arrow.y})`}>
                          <path
                            d="M 0 16 L -10 2 L -4 2 L -4 -12 L 4 -12 L 4 2 L 10 2 Z"
                            fill={color}
                          />
                          <rect
                            x="-32"
                            y="20"
                            width="64"
                            height="16"
                            rx="4"
                            fill="#0B0E14"
                            stroke={color}
                            strokeWidth="1"
                          />
                          <text
                            x="0"
                            y="31"
                            textAnchor="middle"
                            fill={color}
                            fontSize="9"
                            fontWeight="bold"
                            fontFamily="monospace"
                          >
                            ▼ {arrow.label}
                          </text>
                        </g>
                      )}
                    </motion.g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Нижняя сцена: Противостояние рынка — Неоновые Бык (#00E676) и Медведь (#FF3D57) движутся навстречу и сталкиваются */}
          <div className="relative z-20 mx-auto w-full max-w-5xl px-4 pb-6 sm:pb-8">
            <div className="relative flex h-28 sm:h-36 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#00E676]/10 via-[#111622] to-[#FF3D57]/10 px-4">
              {/* Левый угол: Подпись BULLS */}
              <div className="absolute left-4 top-2.5 flex items-center gap-1.5 text-[11px] font-extrabold tracking-widest text-[#00E676]">
                <span className="h-2 w-2 rounded-full bg-[#00E676]" />
                BULLS • ПОКУПАТЕЛИ
              </div>

              {/* Правый угол: Подпись BEARS */}
              <div className="absolute right-4 top-2.5 flex items-center gap-1.5 text-[11px] font-extrabold tracking-widest text-[#FF3D57]">
                БЕАРС • ПРОДАВЦЫ
                <span className="h-2 w-2 rounded-full bg-[#FF3D57]" />
              </div>

              {/* Силуэт Быка (движется слева к центру) */}
              <motion.div
                initial={{ x: "-42vw", opacity: 0.4, scale: 0.85 }}
                animate={{
                  x: impactTriggered ? -18 : -10,
                  opacity: 1,
                  scale: impactTriggered ? 1.08 : 1,
                }}
                transition={{
                  duration: 1.85,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex items-center"
              >
                <svg
                  viewBox="0 0 180 110"
                  className="h-20 w-32 sm:h-28 sm:w-44 drop-shadow-[0_0_18px_rgba(0,230,118,0.65)]"
                >
                  {/* Неоновый геометрический силуэт атакующего Быка с рогами вправо */}
                  <path
                    d="M15 85 L35 55 L55 45 L85 42 L112 30 L132 14 L126 34 L148 38 L168 24 L156 48 L164 62 L144 70 L118 68 L105 92 L92 92 L98 70 L65 72 L52 94 L38 94 L46 70 Z"
                    fill="rgba(0, 230, 118, 0.18)"
                    stroke="#00E676"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  {/* Внутренние грани Быка */}
                  <path
                    d="M55 45 L95 55 L132 34 M85 42 L118 68 M35 55 L65 72"
                    stroke="#00E676"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                    fill="none"
                  />
                  {/* Светящийся глаз Быка */}
                  <circle cx="142" cy="48" r="3" fill="#F5B041" />
                </svg>
              </motion.div>

              {/* Центральная вспышка столкновения Быка и Медведя */}
              <div className="relative z-30 flex items-center justify-center">
                <AnimatePresence>
                  {impactTriggered && (
                    <>
                      {/* Ударная волна */}
                      <motion.div
                        initial={{ scale: 0.2, opacity: 1 }}
                        animate={{ scale: 3.4, opacity: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="pointer-events-none absolute h-20 w-20 rounded-full border-2 border-[#F5B041] shadow-[0_0_40px_#F5B041]"
                      />
                      <motion.div
                        initial={{ scale: 0.2, opacity: 0.9 }}
                        animate={{ scale: 2.2, opacity: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                        className="pointer-events-none absolute h-16 w-16 rounded-full bg-gradient-to-r from-[#00E676] via-[#F5B041] to-[#FF3D57] blur-md"
                      />
                      {/* Центральный бейдж импульса XAU/USD */}
                      <motion.div
                        initial={{ scale: 0, rotate: -15 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 16 }}
                        className="relative z-30 flex flex-col items-center rounded-xl border border-[#F5B041] bg-[#0B0E14]/95 px-3 py-1.5 shadow-[0_0_30px_rgba(245,176,65,0.6)]"
                      >
                        <span className="text-[10px] font-black tracking-widest text-[#F5B041]">
                          XAU / USD
                        </span>
                        <span className="text-[11px] font-extrabold text-white">
                          IMPULSE
                        </span>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Силуэт Медведя (движется справа к центру) */}
              <motion.div
                initial={{ x: "42vw", opacity: 0.4, scale: 0.85 }}
                animate={{
                  x: impactTriggered ? 18 : 10,
                  opacity: 1,
                  scale: impactTriggered ? 1.08 : 1,
                }}
                transition={{
                  duration: 1.85,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex items-center"
              >
                <svg
                  viewBox="0 0 180 110"
                  className="h-20 w-32 sm:h-28 sm:w-44 drop-shadow-[0_0_18px_rgba(255,61,87,0.65)]"
                >
                  {/* Неоновый геометрический силуэт атакующего Медведя влево */}
                  <path
                    d="M165 85 L150 50 L125 32 L92 28 L65 36 L48 24 L42 36 L22 44 L14 58 L28 66 L18 82 L36 86 L55 72 L70 94 L84 94 L78 72 L114 74 L126 94 L142 94 L135 72 Z"
                    fill="rgba(255, 61, 87, 0.18)"
                    stroke="#FF3D57"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  {/* Внутренние грани Медведя */}
                  <path
                    d="M125 32 L85 52 L42 36 M92 28 L65 72 M150 50 L114 74"
                    stroke="#FF3D57"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                    fill="none"
                  />
                  {/* Светящийся глаз Медведя */}
                  <circle cx="38" cy="48" r="3" fill="#F5B041" />
                </svg>
              </motion.div>
            </div>

            {/* Полоса прогресса загрузки терминала */}
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
              <span>Синхронизация графиков XAU/USD и видеообзоров...</span>
              <span className="font-mono text-[#F5B041]">FTL TERMINAL v1.0</span>
            </div>
            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3.1, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-[#00E676] via-[#F5B041] to-[#FF3D57]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
