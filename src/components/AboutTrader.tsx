"use client";

import React from "react";
import { Award, TrendingUp, Youtube, Users, CheckCircle2, Sparkles } from "lucide-react";
import { siteConfig, assetPath } from "@/config/siteConfig";
import { useAppSettings } from "@/context/AppSettingsContext";
import { getT } from "@/config/translations";

export default function AboutTrader() {
  const { showAuthorPhoto } = siteConfig.features;
  const { lang } = useAppSettings();
  const t = getT(lang);

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-slate-50 dark:bg-[#0B0E14] py-16 sm:py-24 border-b border-slate-200 dark:border-white/5 transition-colors"
    >
      <div className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 h-96 w-96 rounded-full bg-amber-500/10 dark:bg-[#F5B041]/8 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 dark:border-[#F5B041]/30 bg-white dark:bg-[#111622] px-3.5 py-1 text-xs font-bold tracking-wider text-amber-700 dark:text-[#F5B041] shadow-sm">
            <Award className="h-3.5 w-3.5" />
            {t.about.badge}
          </span>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t.about.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t.about.subtitle}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 items-center lg:grid-cols-12">
          {showAuthorPhoto ? (
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-amber-500/40 bg-white dark:bg-[#111622] p-3 shadow-xl">
                <img
                  src={assetPath(siteConfig.about.authorPhotoPath)}
                  alt={t.about.authorName}
                  className="h-96 w-full rounded-xl object-cover"
                />
                <div className="mt-3 flex items-center justify-between px-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {t.about.authorName}
                    </h3>
                    <p className="text-xs text-amber-600 dark:text-[#F5B041]">
                      {t.about.authorRole}
                    </p>
                  </div>
                  <span className="rounded-lg bg-emerald-500/15 px-2.5 py-1 font-mono text-xs font-bold text-emerald-700 dark:text-[#00E676]">
                    17+ YEARS
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-gradient-to-br dark:from-[#111622] dark:via-[#111622] dark:to-[#0B0E14] p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-4 border-b border-slate-200 dark:border-white/10 pb-5">
                  <img
                    src={assetPath("/logo.png")}
                    alt="ForexTraining Life"
                    className="h-16 w-16 rounded-2xl border border-[#F5B041]/60 object-cover shadow-md"
                  />
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-2 py-0.5 text-[11px] font-bold text-amber-700 dark:text-[#F5B041]">
                      <Sparkles className="h-3 w-3" /> {t.about.methodTag}
                    </span>
                    <h3 className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white">
                      ForexTraining Life
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t.about.authorRole}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3.5">
                  {t.about.pillars.map((pillar, idx) => (
                    <div
                      key={pillar.title}
                      className="flex items-start gap-3 rounded-xl border border-slate-200/80 dark:border-white/5 bg-slate-50 dark:bg-[#0B0E14]/80 p-3.5"
                    >
                      <CheckCircle2
                        className={`h-5 w-5 shrink-0 mt-0.5 ${
                          idx === 1
                            ? "text-amber-600 dark:text-[#F5B041]"
                            : "text-emerald-600 dark:text-[#00E676]"
                        }`}
                      />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {pillar.title}
                        </h4>
                        <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111622]/85 p-6 sm:p-8 space-y-4 shadow-md">
              {t.about.storyParagraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
              {t.about.counters.map((counter, idx) => {
                const isGold = counter.accent === "gold";
                return (
                  <div
                    key={counter.label}
                    className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111622] p-4 text-center shadow-sm hover:border-amber-500/50 dark:hover:border-[#F5B041]/50 transition"
                  >
                    <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-[#0B0E14] border border-slate-200 dark:border-white/10">
                      {idx === 0 && <Award className="h-4 w-4 text-amber-600 dark:text-[#F5B041]" />}
                      {idx === 1 && <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-[#00E676]" />}
                      {idx === 2 && <Youtube className="h-4 w-4 text-rose-600 dark:text-[#FF3D57]" />}
                      {idx === 3 && <Users className="h-4 w-4 text-amber-600 dark:text-[#F5B041]" />}
                    </div>
                    <div
                      className={`font-mono text-lg sm:text-xl font-black ${
                        isGold
                          ? "text-amber-600 dark:text-[#F5B041]"
                          : "text-emerald-600 dark:text-[#00E676]"
                      }`}
                    >
                      {counter.value}
                    </div>
                    <div className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-400">
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
