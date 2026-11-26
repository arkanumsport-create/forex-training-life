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
import { useAppSettings } from "@/context/AppSettingsContext";
import { getT } from "@/config/translations";

export default function ServicesSection() {
  const { lang } = useAppSettings();
  const t = getT(lang);
  const sig = siteConfig.services.signals.sampleSignal;

  return (
    <section className="relative bg-white dark:bg-[#0B0E14] py-16 sm:py-24 border-b border-slate-200 dark:border-white/5 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 dark:border-[#00E676]/30 bg-slate-50 dark:bg-[#111622] px-3.5 py-1 text-xs font-bold tracking-wider text-emerald-700 dark:text-[#00E676]">
            <Layers className="h-3.5 w-3.5" />
            {t.services.badge}
          </span>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t.services.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.services.subtitle}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Карточка 1: Обучение трейдингу */}
          <div
            id="education"
            className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111622] p-6 sm:p-8 shadow-lg dark:shadow-2xl hover:border-amber-500/50 dark:hover:border-[#F5B041]/40 transition"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-700 dark:text-[#F5B041] border border-amber-500/30">
                  <GraduationCap className="h-4 w-4" />
                  {t.services.education.tag}
                </span>
                <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
                  FOREX • XAU/USD • CRYPTO
                </span>
              </div>

              <h3 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {t.services.education.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {t.services.education.description}
              </p>

              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-[#F5B041]">
                  {t.services.education.programTitle}
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {t.services.education.modules.map((mod) => (
                    <li
                      key={mod}
                      className="flex items-start gap-2.5 rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-[#0B0E14]/80 p-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                    >
                      <CheckCircle2 className="h-4 w-4 text-amber-600 dark:text-[#F5B041] shrink-0 mt-0.5" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B0E14] p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-[#00E676]">
                  <Video className="h-4 w-4" />
                  <span>{t.services.education.formatTitle}</span>
                </div>
                <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {t.services.education.formats.map((fmt) => (
                    <div
                      key={fmt}
                      className="rounded-lg bg-slate-50 dark:bg-[#111622] p-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5"
                    >
                      {fmt}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <a
              href={siteConfig.socials.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-500/60 bg-amber-500/15 py-3.5 text-sm font-extrabold text-amber-800 dark:text-[#F5B041] hover:bg-amber-500 hover:text-white dark:hover:bg-[#F5B041] dark:hover:text-[#0B0E14] transition"
            >
              <GraduationCap className="h-4 w-4" />
              <span>{t.services.education.ctaLabel}</span>
            </a>
          </div>

          {/* Карточка 2: Telegram-канал с прогнозами и сигналами */}
          <div
            id="signals"
            className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111622] p-6 sm:p-8 shadow-lg dark:shadow-2xl hover:border-emerald-500/50 dark:hover:border-[#00E676]/40 transition"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-[#00E676] border border-emerald-500/30">
                  <Send className="h-3.5 w-3.5" />
                  {t.services.signals.tag}
                </span>
                <span className="font-mono text-xs font-semibold text-sky-600 dark:text-[#2AABEE]">
                  {siteConfig.socials.telegram.handle}
                </span>
              </div>

              <h3 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {t.services.signals.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {t.services.signals.description}
              </p>

              <ul className="mt-5 space-y-2">
                {t.services.signals.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-[#00E676] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Визуальный мокап поста с сигналом из Telegram */}
              <div className="mt-6 rounded-2xl border border-sky-500/30 bg-white dark:bg-[#0B0E14] p-4 shadow-md">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={assetPath("/logo.png")}
                      alt="Telegram Channel"
                      className="h-9 w-9 rounded-full border border-[#F5B041]/50 object-cover"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {t.services.signals.sample.channelName}
                      </div>
                      <div className="text-[11px] text-sky-600 dark:text-[#2AABEE]">
                        {sig.handle} • {t.services.signals.sample.time}
                      </div>
                    </div>
                  </div>
                  <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] font-extrabold text-emerald-700 dark:text-[#00E676]">
                    {sig.direction}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-amber-600 dark:text-[#F5B041]" />
                    <span className="font-mono text-sm font-black text-amber-600 dark:text-[#F5B041]">
                      {sig.pair}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    Risk/Reward:{" "}
                    <strong className="text-slate-900 dark:text-white">{sig.riskReward}</strong>
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 font-mono text-xs">
                  <div className="rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111622] p-2">
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                      ENTRY
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">{sig.entry}</span>
                  </div>
                  <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-2">
                    <span className="flex items-center gap-1 text-[10px] text-rose-700 dark:text-[#FF3D57]">
                      <ShieldAlert className="h-3 w-3" /> STOP-LOSS
                    </span>
                    <span className="font-bold text-rose-700 dark:text-[#FF3D57]">
                      {sig.stopLoss}
                    </span>
                  </div>
                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2">
                    <span className="flex items-center gap-1 text-[10px] text-emerald-700 dark:text-[#00E676]">
                      <Target className="h-3 w-3" /> TP 1
                    </span>
                    <span className="font-bold text-emerald-700 dark:text-[#00E676]">
                      {sig.takeProfit1}
                    </span>
                  </div>
                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2">
                    <span className="flex items-center gap-1 text-[10px] text-emerald-700 dark:text-[#00E676]">
                      <Target className="h-3 w-3" /> TP 2
                    </span>
                    <span className="font-bold text-emerald-700 dark:text-[#00E676]">
                      {sig.takeProfit2}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  {t.services.signals.sample.comment}
                </p>

                <div className="mt-3 rounded-lg bg-emerald-500/15 px-3 py-1.5 text-[11px] font-bold text-emerald-800 dark:text-[#00E676] flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-600 dark:bg-[#00E676] animate-ping" />
                  <span>{t.services.signals.sample.status}</span>
                </div>
              </div>
            </div>

            <a
              href={siteConfig.socials.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00E676] to-[#2AABEE] py-3.5 text-sm font-extrabold text-[#0B0E14] shadow-md hover:opacity-95 transition"
            >
              <Send className="h-4 w-4" />
              <span>{t.services.signals.ctaLabel}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
