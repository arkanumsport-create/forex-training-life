"use client";

import React from "react";
import { Award, TrendingUp, Youtube, Users, CheckCircle2, Sparkles } from "lucide-react";
import { siteConfig, assetPath } from "@/config/siteConfig";

export default function AboutTrader() {
  const { showAuthorPhoto } = siteConfig.features;
  const { about } = siteConfig;

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#0B0E14] py-16 sm:py-24 border-b border-white/5"
    >
      {/* Фоновый градиент */}
      <div className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 h-96 w-96 rounded-full bg-[#F5B041]/8 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#F5B041]/30 bg-[#111622] px-3.5 py-1 text-xs font-bold tracking-wider text-[#F5B041]">
            <Award className="h-3.5 w-3.5" />
            {about.badge}
          </span>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
            {about.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {about.subtitle}
          </p>
        </div>

        {/* Основная сетка контента (адаптируется под флаг showAuthorPhoto) */}
        <div
          className={`mt-12 grid grid-cols-1 gap-8 items-center ${
            showAuthorPhoto ? "lg:grid-cols-12" : "lg:grid-cols-12"
          }`}
        >
          {/* Опциональный слот для фото автора (включается флагом showAuthorPhoto: true в siteConfig.ts) */}
          {showAuthorPhoto ? (
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-[#F5B041]/30 bg-[#111622] p-3 shadow-2xl">
                <img
                  src={about.authorPhotoPath}
                  alt={about.authorName}
                  className="h-96 w-full rounded-xl object-cover"
                />
                <div className="mt-3 flex items-center justify-between px-2">
                  <div>
                    <h3 className="text-base font-bold text-white">{about.authorName}</h3>
                    <p className="text-xs text-[#F5B041]">{about.authorRole}</p>
                  </div>
                  <span className="rounded-lg bg-[#00E676]/15 px-2.5 py-1 font-mono text-xs font-bold text-[#00E676]">
                    17+ YEARS
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Брендовая карточка экспертизы и методологии (когда showAuthorPhoto = false) */
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#111622] via-[#111622] to-[#0B0E14] p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center gap-4 border-b border-white/10 pb-5">
                  <img
                    src={assetPath("/logo.png")}
                    alt="ForexTraining Life"
                    className="h-16 w-16 rounded-2xl border border-[#F5B041]/50 object-cover shadow-[0_0_25px_rgba(245,176,65,0.25)]"
                  />
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-md bg-[#F5B041]/15 px-2 py-0.5 text-[11px] font-bold text-[#F5B041]">
                      <Sparkles className="h-3 w-3" /> АВТОРСКАЯ МЕТОДОЛОГИЯ
                    </span>
                    <h3 className="mt-1 text-lg font-extrabold text-white">
                      ForexTraining Life
                    </h3>
                    <p className="text-xs text-slate-400">{about.authorRole}</p>
                  </div>
                </div>

                <div className="mt-5 space-y-3.5">
                  <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-[#0B0E14]/80 p-3.5">
                    <CheckCircle2 className="h-5 w-5 text-[#00E676] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        Опционный анализ + Техническая картина
                      </h4>
                      <p className="mt-0.5 text-xs text-slate-400">
                        Определение зон ликвидности и приоритета крупного капитала на золоте XAU/USD, валютах и крипторынке.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-[#0B0E14]/80 p-3.5">
                    <CheckCircle2 className="h-5 w-5 text-[#F5B041] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        Строгий математический риск-менеджмент
                      </h4>
                      <p className="mt-0.5 text-xs text-slate-400">
                        Защита депозита, работа с коротким стопом и каскадная фиксация прибыли с переводом в безубыток.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-[#0B0E14]/80 p-3.5">
                    <CheckCircle2 className="h-5 w-5 text-[#00E676] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        Открытая публичная аналитика
                      </h4>
                      <p className="mt-0.5 text-xs text-slate-400">
                        Еженедельные воскресные обзоры рынка на YouTube и ежедневное ведение сценариев в Telegram.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Правая колонка (7 колонок): История трейдера + 4 ключевых счетчика */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#111622]/80 p-6 sm:p-8 space-y-4">
              {about.storyParagraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-base leading-relaxed text-slate-300"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Ключевые цифры (Counters): 17+ лет опыта | Forex & Crypto | Еженедельные разборы | Поддержка комьюнити */}
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
              {about.counters.map((counter, idx) => {
                const isGold = counter.accent === "gold";
                return (
                  <div
                    key={counter.label}
                    className="rounded-2xl border border-white/10 bg-[#111622] p-4 text-center hover:border-[#F5B041]/40 transition"
                  >
                    <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#0B0E14] border border-white/10">
                      {idx === 0 && <Award className="h-4 w-4 text-[#F5B041]" />}
                      {idx === 1 && <TrendingUp className="h-4 w-4 text-[#00E676]" />}
                      {idx === 2 && <Youtube className="h-4 w-4 text-[#FF3D57]" />}
                      {idx === 3 && <Users className="h-4 w-4 text-[#F5B041]" />}
                    </div>
                    <div
                      className={`font-mono text-lg sm:text-xl font-black ${
                        isGold ? "text-[#F5B041]" : "text-[#00E676]"
                      }`}
                    >
                      {counter.value}
                    </div>
                    <div className="mt-1 text-xs font-medium text-slate-400">
                      {counter.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
