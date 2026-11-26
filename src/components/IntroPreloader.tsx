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
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);
  const ambientVideoRef = useRef<HTMLVideoElement | null>(null);
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

    // Блокируем скролл страницы, пока идет заставка
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Запускаем основное и фоновое амбиент-видео синхронно
    mainVideoRef.current?.play().catch(() => {});
    ambientVideoRef.current?.play().catch(() => {});

    // На ~3.2 сек (столкновение и взрыв Быка и Медведя) выводим титры
    const titleTimer = setTimeout(() => {
      setShowTitles(true);
    }, 3200);

    // Плавный выход на сайт
    const exitTimer = setTimeout(() => {
      handleFinish();
    }, 6200);

    return () => {
      document.body.style.overflow = prevOverflow;
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
          className="fixed inset-0 z-[150] flex h-[100dvh] w-screen flex-col items-center justify-center overflow-hidden bg-[#04060A] text-white select-none"
        >
          {/* Мягкий размытый амбиент-фон (заполняет пустые поля на вертикальном экране PWA/телефона и сверхшироких мониторах ПК) */}
          <video
            ref={ambientVideoRef}
            src={assetPath("/videos/bull-bear-intro.mp4")}
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-2xl"
          />

          {/* Основной четкий видео-контейнер с точным вписыванием в экран:
              - Мобильный / PWA (вертикальный экран): полная ширина экрана, формат 16:9 по центру (Бык и Медведь видны целиком!)
              - ПК / Планшет (горизонтальный экран): четкое вписывание в 100vw x 100dvh без обрезания краев (object-contain) */}
          <div className="relative z-10 flex h-full w-full items-center justify-center px-0 sm:px-4 md:px-8">
            <div className="relative flex w-full max-w-[100vw] items-center justify-center md:h-full md:max-h-[92dvh] md:max-w-[1520px]">
              <video
                ref={mainVideoRef}
                src={assetPath("/videos/bull-bear-intro.mp4")}
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={handleFinish}
                className="w-full max-h-[58dvh] object-contain sm:max-h-[75dvh] md:h-full md:max-h-[90dvh] md:w-full md:rounded-2xl md:border md:border-white/10 md:shadow-[0_0_80px_rgba(0,0,0,0.9)]"
              />
            </div>
          </div>

          {/* Темная кинематографичная вуаль, усиливающаяся при появлении букв */}
          <motion.div
            initial={{ opacity: 0.2 }}
            animate={{ opacity: showTitles ? 0.68 : 0.2 }}
            transition={{ duration: 0.65 }}
            className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-[#04060A]/80 via-[#04060A]/35 to-[#04060A]/85"
          />

          {/* Верхняя строка для мобильного PWA (бренд-бейдж сверху) */}
          <div className="pointer-events-none absolute left-4 top-4 sm:left-8 sm:top-7 z-30 flex items-center gap-2.5">
            <img
              src={assetPath("/logo.png")}
              alt="FTL"
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl border border-[#F5B041]/60 object-cover shadow-lg"
            />
            <span className="text-xs sm:text-sm font-extrabold tracking-wide text-white/90 drop-shadow">
              FTL <span className="text-[#F5B041]">TRADING</span>
            </span>
          </div>

          {/* Кнопка Пропустить (с учетом отступа safe-area на iPhone/Android PWA) */}
          <button
            onClick={handleFinish}
            className="group absolute right-4 top-4 sm:right-8 sm:top-7 z-40 flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/25 bg-black/65 px-3.5 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white backdrop-blur-md hover:border-[#F5B041] hover:bg-black/85 transition cursor-pointer shadow-xl"
          >
            <span>{t.intro.skip}</span>
            <SkipForward className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#F5B041] transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Титры поверх экрана — идеально масштабированы отдельно под мобильный/PWA и под ПК */}
          <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center">
            <AnimatePresence>
              {showTitles && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  className="flex w-full max-w-[92vw] sm:max-w-3xl flex-col items-center rounded-2xl bg-black/35 px-4 py-6 sm:px-8 sm:py-8 backdrop-blur-sm border border-white/10 shadow-2xl"
                >
                  {/* Логотип канала */}
                  <motion.img
                    src={assetPath("/logo.png")}
                    alt="ForexTraining Life"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.45, type: "spring", stiffness: 210 }}
                    className="mb-3.5 sm:mb-5 h-14 w-14 sm:h-20 sm:w-20 rounded-2xl border-2 border-[#F5B041] object-cover shadow-[0_0_35px_rgba(245,176,65,0.55)]"
                  />

                  {/* Побуквенно вылетающее название ForexTraining Life */}
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

          {/* Индикатор прогресса в самом низу */}
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
