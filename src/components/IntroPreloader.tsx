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
  const [isPortraitMobile, setIsPortraitMobile] = useState<boolean | null>(null);
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);
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
    }, 600);
  };

  useEffect(() => {
    if (!siteConfig.features.enableIntroPreloader) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    // Определяем: вертикальный экран телефона/PWA (9:16) или горизонтальный ПК (16:9)
    const checkIsMobilePortrait = () => {
      return window.innerWidth < 768 || window.innerHeight > window.innerWidth;
    };
    setIsPortraitMobile(checkIsMobilePortrait());

    // Блокируем скролл страницы во время заставки
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Через ~3.2 сек (столкновение и взрыв Быка и Медведя) выводим титры
    const titleTimer = setTimeout(() => {
      setShowTitles(true);
    }, 3200);

    // Плавный переход на сайт
    const exitTimer = setTimeout(() => {
      handleFinish();
    }, 6200);

    return () => {
      document.body.style.overflow = prevOverflow;
      clearTimeout(titleTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  // Запускаем видео сразу после выбора нужного файла (9:16 или 16:9)
  useEffect(() => {
    if (isPortraitMobile !== null && mainVideoRef.current) {
      mainVideoRef.current.play().catch(() => {});
    }
  }, [isPortraitMobile]);

  const videoSrc =
    isPortraitMobile === null
      ? null
      : isPortraitMobile
      ? assetPath("/videos/bull-bear-intro-mobile.mp4")
      : assetPath("/videos/bull-bear-intro.mp4");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="ftl-bull-bear-video-intro"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: "blur(6px)",
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
          style={{
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
            paddingLeft: "env(safe-area-inset-left)",
            paddingRight: "env(safe-area-inset-right)",
          }}
          className="fixed inset-0 z-[150] flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-[#04060A] text-white select-none"
        >
          {/* Видео-заставка:
              - Телефон / PWA (9:16): bull-bear-intro-mobile.mp4 во весь вертикальный экран (object-cover)
              - ПК / Горизонтальный экран (16:9): bull-bear-intro.mp4 четко по размеру экрана (object-contain) */}
          {videoSrc && (
            <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-[#04060A]">
              <video
                ref={mainVideoRef}
                key={videoSrc}
                src={videoSrc}
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={handleFinish}
                className={
                  isPortraitMobile
                    ? "h-full w-full object-cover"
                    : "h-full w-full max-h-[100dvh] max-w-[100vw] object-contain"
                }
              />
            </div>
          )}

          {/* Мягкое затемнение при вылете титров */}
          <motion.div
            initial={{ opacity: 0.12 }}
            animate={{ opacity: showTitles ? 0.62 : 0.12 }}
            transition={{ duration: 0.65 }}
            className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-[#04060A]/65 via-[#04060A]/25 to-[#04060A]/75"
          />

          {/* Слева сверху — ТОЛЬКО логотип (без надписи) */}
          <div className="pointer-events-none absolute left-4 top-4 sm:left-7 sm:top-6 z-30">
            <img
              src={assetPath("/logo.png")}
              alt="ForexTraining Life"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl border border-[#F5B041]/70 object-cover shadow-[0_0_20px_rgba(245,176,65,0.35)]"
            />
          </div>

          {/* Кнопка Пропустить справа сверху */}
          <button
            onClick={handleFinish}
            className="group absolute right-4 top-4 sm:right-7 sm:top-6 z-40 flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/25 bg-black/60 px-3.5 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white backdrop-blur-md hover:border-[#F5B041] hover:bg-black/85 transition cursor-pointer shadow-xl"
          >
            <span>{t.intro.skip}</span>
            <SkipForward className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#F5B041] transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Титры: название ForexTraining Life (EN) + слоган «Торгуй и зарабатывай вместе с нами» (RU) */}
          <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center">
            <AnimatePresence>
              {showTitles && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  className="flex w-full max-w-[92vw] sm:max-w-3xl flex-col items-center rounded-2xl bg-black/40 px-4 py-6 sm:px-8 sm:py-8 backdrop-blur-sm border border-white/10 shadow-2xl"
                >
                  {/* Логотип бренда */}
                  <motion.img
                    src={assetPath("/logo.png")}
                    alt="ForexTraining Life"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.45, type: "spring", stiffness: 210 }}
                    className="mb-3.5 sm:mb-5 h-14 w-14 sm:h-20 sm:w-20 rounded-2xl border-2 border-[#F5B041] object-cover shadow-[0_0_35px_rgba(245,176,65,0.55)]"
                  />

                  {/* Побуквенное появление названия ForexTraining Life */}
                  <h1 className="flex flex-wrap items-center justify-center text-2xl font-black tracking-tight sm:text-5xl md:text-6xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
                    {brandLetters.map((char, idx) => {
                      const isLife = idx >= 14;
                      return (
                        <motion.span
                          key={`${char}-${idx}`}
                          initial={{ opacity: 0, y: 20, scale: 0.85, filter: "blur(5px)" }}
                          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                          transition={{
                            duration: 0.32,
                            delay: idx * 0.038,
                            ease: "easeOut",
                          }}
                          className={
                            char === " "
                              ? "w-2 sm:w-4"
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

                  {/* Золотая линия */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="my-3 sm:my-4 h-0.5 w-36 sm:w-72 bg-gradient-to-r from-transparent via-[#F5B041] to-transparent"
                  />

                  {/* Слоган на русском */}
                  <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.65 }}
                    className="text-sm font-bold tracking-wide text-slate-100 sm:text-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
                  >
                    Торгуй и зарабатывай вместе с нами
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Тонкая полоса прогресса в самом низу */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-40 h-1 bg-white/10">
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
