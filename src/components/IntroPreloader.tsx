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
  const [isMobileView, setIsMobileView] = useState<boolean | null>(null);
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);
  const finishedRef = useRef(false);
  const { lang } = useAppSettings();
  const t = getT(lang);

  const brandLetters = Array.from("ForexTraining Life");

  const unlockScroll = () => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  };

  const handleFinish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    unlockScroll();
    setIsVisible(false);
    setTimeout(() => {
      onComplete?.();
    }, 600);
  };

  // Блокируем/разблокируем скролл строго синхронно с видимостью заставки
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      unlockScroll();
    }
    return () => {
      unlockScroll();
    };
  }, [isVisible]);

  useEffect(() => {
    if (!siteConfig.features.enableIntroPreloader) {
      unlockScroll();
      setIsVisible(false);
      onComplete?.();
      return;
    }

    // Надежное определение смартфона / PWA (вертикальный экран 9:16) vs ПК (16:9)
    const detectMobile = () => {
      const ua = navigator.userAgent || "";
      const isPhoneUA = /Android|iPhone|iPod|Mobile/i.test(ua);
      const isNarrow = window.innerWidth <= 820;
      const isPortrait = window.innerHeight > window.innerWidth;
      return isPhoneUA || isNarrow || isPortrait;
    };

    setIsMobileView(detectMobile());

    const handleResize = () => {
      setIsMobileView(detectMobile());
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Через ~3.2 сек (столкновение и взрыв Быка и Медведя) выводим титры
    const titleTimer = setTimeout(() => {
      setShowTitles(true);
    }, 3200);

    // Плавный переход на сайт
    const exitTimer = setTimeout(() => {
      handleFinish();
    }, 6300);

    return () => {
      unlockScroll();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      clearTimeout(titleTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  // Гарантированный запуск автопроигрывания в Google Chrome / Safari / PWA на телефоне
  const forcePlayVideo = () => {
    const vid = mainVideoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.defaultMuted = true;
    vid.playsInline = true;
    vid.play().catch(() => {});
  };

  useEffect(() => {
    if (isMobileView !== null) {
      forcePlayVideo();
    }
  }, [isMobileView]);

  const videoSrc =
    isMobileView === null
      ? null
      : isMobileView
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
          className="fixed inset-0 z-[150] flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-[#030508] text-white select-none"
        >
          {/* Видео-заставка:
              - Телефон / Google Chrome / Мобильная PWA (9:16): bull-bear-intro-mobile.mp4 во весь вертикальный экран (идеальное вписывание 9:16 без обрезания персонажей)
              - ПК / Широкий экран (16:9): bull-bear-intro.mp4 четко по центру экрана */}
          {videoSrc && (
            <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-[#030508]">
              {isMobileView ? (
                /* Мобильный 9:16 режим для телефона и PWA */
                <div className="relative flex h-[100dvh] w-full max-w-[540px] items-center justify-center overflow-hidden bg-[#030508]">
                  <video
                    ref={mainVideoRef}
                    key={videoSrc}
                    src={videoSrc}
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    onLoadedData={forcePlayVideo}
                    onCanPlay={forcePlayVideo}
                    onEnded={handleFinish}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ) : (
                /* ПК 16:9 режим */
                <video
                  ref={mainVideoRef}
                  key={videoSrc}
                  src={videoSrc}
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  onLoadedData={forcePlayVideo}
                  onCanPlay={forcePlayVideo}
                  onEnded={handleFinish}
                  className="h-full w-full max-h-[100dvh] max-w-[100vw] object-contain"
                />
              )}
            </div>
          )}

          {/* Кинематографичная мягкая виньетка сверху и снизу (усиливается на титрах) */}
          <motion.div
            initial={{ opacity: 0.15 }}
            animate={{ opacity: showTitles ? 0.65 : 0.15 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-[#030508]/70 via-transparent to-[#030508]/80"
          />

          {/* Верхняя панель с безопасным отступом safe-area для PWA / iPhone / Android */}
          <div
            style={{
              paddingTop: "max(16px, env(safe-area-inset-top))",
              paddingLeft: "max(16px, env(safe-area-inset-left))",
              paddingRight: "max(16px, env(safe-area-inset-right))",
            }}
            className="pointer-events-none absolute top-0 left-0 right-0 z-40 flex items-center justify-between sm:px-7 sm:pt-6"
          >
            {/* Слева — ТОЛЬКО чистый логотип */}
            <img
              src={assetPath("/logo.png")}
              alt="ForexTraining Life"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl border border-[#F5B041]/75 object-cover shadow-[0_0_24px_rgba(245,176,65,0.4)]"
            />

            {/* Справа — кнопка Пропустить */}
            <button
              onClick={handleFinish}
              className="pointer-events-auto group flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/25 bg-black/60 px-3.5 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white backdrop-blur-md hover:border-[#F5B041] hover:bg-black/85 transition cursor-pointer shadow-xl"
            >
              <span>{t.intro.skip}</span>
              <SkipForward className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#F5B041] transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Центральные титры: ForexTraining Life (EN) + «Торгуй и зарабатывай вместе с нами» (RU) */}
          <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-5 text-center">
            <AnimatePresence>
              {showTitles && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex w-full max-w-[90vw] sm:max-w-3xl flex-col items-center rounded-2xl border border-[#F5B041]/25 bg-black/45 px-5 py-6 sm:px-8 sm:py-8 backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.85)]"
                >
                  {/* Логотип бренда */}
                  <motion.img
                    src={assetPath("/logo.png")}
                    alt="ForexTraining Life"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.45, type: "spring", stiffness: 210 }}
                    className="mb-3.5 sm:mb-5 h-14 w-14 sm:h-20 sm:w-20 rounded-2xl border-2 border-[#F5B041] object-cover shadow-[0_0_35px_rgba(245,176,65,0.6)]"
                  />

                  {/* Побуквенно вылетающее название ForexTraining Life */}
                  <h1 className="flex flex-wrap items-center justify-center text-[26px] leading-tight font-black tracking-tight sm:text-5xl md:text-6xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
                    {brandLetters.map((char, idx) => {
                      const isLife = idx >= 14;
                      return (
                        <motion.span
                          key={`${char}-${idx}`}
                          initial={{ opacity: 0, y: 18, scale: 0.85, filter: "blur(5px)" }}
                          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                          transition={{
                            duration: 0.3,
                            delay: idx * 0.036,
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

                  {/* Золотой разделитель */}
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

          {/* Индикатор прогресса внизу экрана (с учетом нижнего safe-area на iPhone/Android) */}
          <div
            style={{ bottom: "env(safe-area-inset-bottom)" }}
            className="pointer-events-none absolute left-0 right-0 z-40 h-1 bg-white/10"
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 6.2, ease: "linear" }}
              className="h-full bg-gradient-to-r from-[#00E676] via-[#F5B041] to-[#FF3D57]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
