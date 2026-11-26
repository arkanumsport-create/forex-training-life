"use client";

import React from "react";
import {
  GraduationCap,
  Send,
  CheckCircle2,
  TrendingUp,
  ShieldAlert,
  Target,
  Layers,
  Video,
} from "lucide-react";
import { siteConfig, assetPath } from "@/config/siteConfig";

export default function ServicesSection() {
  const { education, signals } = siteConfig.services;
  const sig = signals.sampleSignal;

  return (
    <section className="relative bg-[#0B0E14] py-16 sm:py-24 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#00E676]/30 bg-[#111622] px-3.5 py-1 text-xs font-bold tracking-wider text-[#00E676]">
            <Layers className="h-3.5 w-3.5" />
            {siteConfig.services.badge}
          </span>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
            {siteConfig.services.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {siteConfig.services.subtitle}
          </p>
        </div>

        {/* Две равнозначные карточки/секции по модели Forex Mentor Pro */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Карточка 1: Обучение трейдингу */}
          <div
            id="education"
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111622] p-6 sm:p-8 shadow-2xl hover:border-[#F5B041]/40 transition"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F5B041]/15 px-3 py-1 text-xs font-bold text-[#F5B041] border border-[#F5B041]/30">
                  <GraduationCap className="h-4 w-4" />
                  {education.tag}
                </span>
                <span className="font-mono text-xs font-semibold text-slate-400">
                  FOREX • XAU/USD • CRYPTO
                </span>
              </div>

              <h3 className="mt-4 text-xl sm:text-2xl font-extrabold text-white">
                {education.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                {education.description}
              </p>

              {/* Программа обучения */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5B041]">
                  Структурированная программа обучения:
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {education.modules.map((mod) => (
                    <li
                      key={mod}
                      className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-[#0B0E14]/80 p-3 text-xs sm:text-sm text-slate-200"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#F5B041] shrink-0 mt-0.5" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Формат работы */}
              <div className="mt-6 rounded-xl border border-white/10 bg-[#0B0E14] p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00E676]">
                  <Video className="h-4 w-4" />
                  <span>Формат подготовки и практики:</span>
                </div>
                <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {education.formats.map((fmt) => (
                    <div
                      key={fmt}
                      className="rounded-lg bg-[#111622] p-2.5 text-xs font-medium text-slate-300 border border-white/5"
                    >
                      {fmt}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <a
              href={education.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#F5B041]/50 bg-[#F5B041]/15 py-3.5 text-sm font-extrabold text-[#F5B041] hover:bg-[#F5B041] hover:text-[#0B0E14] transition"
            >
              <GraduationCap className="h-4 w-4" />
              <span>{education.ctaLabel}</span>
            </a>
          </div>

          {/* Карточка 2: Telegram-канал с прогнозами и сигналами */}
          <div
            id="signals"
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111622] p-6 sm:p-8 shadow-2xl hover:border-[#00E676]/40 transition"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#00E676]/15 px-3 py-1 text-xs font-bold text-[#00E676] border border-[#00E676]/30">
                  <Send className="h-3.5 w-3.5" />
                  {signals.tag}
                </span>
                <span className="font-mono text-xs font-semibold text-[#2AABEE]">
                  {siteConfig.socials.telegram.handle}
                </span>
              </div>

              <h3 className="mt-4 text-xl sm:text-2xl font-extrabold text-white">
                {signals.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                {signals.description}
              </p>

              {/* Как устроена работа */}
              <ul className="mt-5 space-y-2">
                {signals.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#00E676] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Визуальный мокап поста с сигналом из Telegram */}
              <div className="mt-6 rounded-2xl border border-[#2AABEE]/30 bg-[#0B0E14] p-4 shadow-inner">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={assetPath("/logo.png")}
                      alt="Telegram Channel"
                      className="h-9 w-9 rounded-full border border-[#F5B041]/50 object-cover"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">
                        {sig.channelName}
                      </div>
                      <div className="text-[11px] text-[#2AABEE]">
                        {sig.handle} • {sig.time}
                      </div>
                    </div>
                  </div>
                  <span className="rounded-md bg-[#00E676]/15 px-2 py-0.5 font-mono text-[10px] font-extrabold text-[#00E676]">
                    {sig.direction}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-[#F5B041]" />
                    <span className="font-mono text-sm font-black text-[#F5B041]">
                      {sig.pair}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-400">
                    Risk/Reward: <strong className="text-white">{sig.riskReward}</strong>
                  </span>
                </div>

                {/* Координаты ордера: Entry, SL, TP1, TP2 */}
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 font-mono text-xs">
                  <div className="rounded-lg border border-white/10 bg-[#111622] p-2">
                    <span className="block text-[10px] text-slate-400">ENTRY</span>
                    <span className="font-bold text-white">{sig.entry}</span>
                  </div>
                  <div className="rounded-lg border border-[#FF3D57]/30 bg-[#FF3D57]/10 p-2">
                    <span className="flex items-center gap-1 text-[10px] text-[#FF3D57]">
                      <ShieldAlert className="h-3 w-3" /> STOP-LOSS
                    </span>
                    <span className="font-bold text-[#FF3D57]">{sig.stopLoss}</span>
                  </div>
                  <div className="rounded-lg border border-[#00E676]/30 bg-[#00E676]/10 p-2">
                    <span className="flex items-center gap-1 text-[10px] text-[#00E676]">
                      <Target className="h-3 w-3" /> TAKE-PROFIT 1
                    </span>
                    <span className="font-bold text-[#00E676]">{sig.takeProfit1}</span>
                  </div>
                  <div className="rounded-lg border border-[#00E676]/30 bg-[#00E676]/10 p-2">
                    <span className="flex items-center gap-1 text-[10px] text-[#00E676]">
                      <Target className="h-3 w-3" /> TAKE-PROFIT 2
                    </span>
                    <span className="font-bold text-[#00E676]">{sig.takeProfit2}</span>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-slate-300">
                  {sig.comment}
                </p>

                <div className="mt-3 rounded-lg bg-[#00E676]/15 px-3 py-1.5 text-[11px] font-bold text-[#00E676] flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#00E676] animate-ping" />
                  <span>{sig.status}</span>
                </div>
              </div>
            </div>

            <a
              href={signals.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00E676] to-[#2AABEE] py-3.5 text-sm font-extrabold text-[#0B0E14] shadow-[0_0_25px_rgba(0,230,118,0.25)] hover:opacity-95 transition"
            >
              <Send className="h-4 w-4" />
              <span>{signals.ctaLabel}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
