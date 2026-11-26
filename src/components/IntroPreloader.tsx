"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkipForward } from "lucide-react";
import { siteConfig, assetPath } from "@/config/siteConfig";
import { useAppSettings } from "@/context/AppSettingsContext";
import { getT } from "@/config/translations";

interface IntroPreloaderProps {
  onComplete?: () => void;
}

export default function IntroPreloader({ onComplete }: IntroPreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [showTitles, setShowTitles] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const finishedRef = useRef(false);
  const { lang } = useAppSettings();
  const t = getT(lang);

  const brandLetters = Array.from("ForexTraining Life");

  const handleFinish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setIsVisible(false);
    setTimeout(() => {
      onComplete?.();
    }, 650);
  };

  useEffect(() => {
    if (!siteConfig.features.enableIntroPreloader) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    // Стараемся гарантированно запустить видео
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    // Через ~3.4 сек (момент столкновения и взрыва Быка и Медведя) выводим буквы названия и слоган
    const titleTimer = setTimeout(() => {
      setShowTitles(true);
    }, 3200);

    // Плавный переход на сайт (~6.2 сек, чтобы успеть прочитать название и слоган)
    const exitTimer = setTimeout(() => {
      handleFinish();
    }, 6200);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="ftl-bull-bear-video-intro"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(6px)",
            transition: { duration: 0.65, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[150] flex items-center justify-center overflow-hidden bg-[#05070B] text-white select-none"
        >
          {/* Полноэкранное видео Быка и Медведя */}
          <video
            ref={videoRef}
            src={assetPath("/videos/bull-bear-intro.mp4")}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleFinish}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Мягкая виньетка, усиливающаяся при появлении титров для идеальной читаемости */}
          <motion.div
            initial={{ opacity: 0.25 }}
            animate={{ opacity: showTitles ? 0.72 : 0.28 }}
            transition={{ duration: 0.7 }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#05070B]/70 via-[#05070B]/40 to-[#05070B]/85"
          />

          {/* Кнопка Пропустить в правом верхнем углу */}
          <button
            onClick={handleFinish}
            className="group absolute right-4 top-4 sm:right-8 sm:top-7 z-30 flex items-center gap-2 rounded-full border border-white/25 bg-black/55 px-4 py-2 text-xs sm:text-sm font-semibold text-white/90 backdrop-blur-md hover:border-[#F5B041] hover:bg-black/80 hover:text-white transition cursor-pointer shadow-lg"
          >
            <span>{t.intro.skip}</span>
            <SkipForward className="h-4 w-4 text-[#F5B041] transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Титры: появляются через 3.2 сек на столкновении Быка и Медведя */}
          <div className="relative z-20 flex flex-col items-center justify-center px-5 text-center">
            <AnimatePresence>
              {showTitles && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center"
                >
                  {/* Логотип бренда */}
                  <motion.img
                    src={assetPath("/logo.png")}
                    alt="ForexTraining Life"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                    className="mb-5 h-16 w-16 sm:h-20 sm:w-20 rounded-2xl border-2 border-[#F5B041] object-cover shadow-[0_0_40px_rgba(245,176,65,0.55)]"
                  />

                  {/* Побуквенное появление названия на английском: ForexTraining Life */}
                  <h1 className="flex flex-wrap items-center justify-center text-3xl font-black tracking-tight sm:text-5xl md:text-6xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                    {brandLetters.map((char, idx) => {
                      const isLife = idx >= 14;
                      return (
                        <motion.span
                          key={`${char}-${idx}`}
                          initial={{ opacity: 0, y: 24, scale: 0.85, filter: "blur(6px)" }}
                          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                          transition={{
                            duration: 0.35,
                            delay: idx * 0.04,
                            ease: "easeOut",
                          }}
                          className={
                            char === " "
                              ? "w-3 sm:w-4"
                              : isLife
                              ? "inline-block text-[#F5B041]"
                              : "inline-block text-white"
                          }
                        >
                          {char}
                        </motion.span>
                      );
                    })}
                  </h1>

                  {/* Золотая разделительная линия */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.55, delay: 0.55 }}
                    className="my-4 h-0.5 w-48 sm:w-72 bg-gradient-to-r from-transparent via-[#F5B041] to-transparent"
                  />

                  {/* Слоган внизу на русском: «Торгуй и зарабатывай вместе с нами» */}
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="max-w-xl text-base font-bold tracking-wide text-slate-100 sm:text-2xl drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]"
                  >
                    Торгуй и зарабатывай вместе с нами
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Тонкий индикатор прогресса внизу */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 6.1, ease: "linear" }}
              className="h-full bg-gradient-to-r from-[#00E676] via-[#F5B041] to-[#FF3D57]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
