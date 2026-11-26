"use client";

import React from "react";
import {
  Send,
  Youtube,
  Instagram,
  Download,
  Smartphone,
  ShieldAlert,
  ExternalLink,
} from "lucide-react";
import { siteConfig, assetPath } from "@/config/siteConfig";
import { usePWAInstall } from "@/context/PWAInstallContext";
import { useAppSettings } from "@/context/AppSettingsContext";
import { getT } from "@/config/translations";

export default function Footer() {
  const { triggerInstall, openHelpModal } = usePWAInstall();
  const { lang } = useAppSettings();
  const t = getT(lang);

  return (
    <footer
      id="contacts"
      className="relative bg-white dark:bg-[#0B0E14] pt-14 pb-10 text-slate-600 dark:text-slate-400 transition-colors"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111622] p-6 sm:p-8 shadow-lg dark:shadow-2xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3.5">
                <img
                  src={assetPath("/logo.png")}
                  alt={siteConfig.name}
                  className="h-12 w-12 rounded-xl border border-[#F5B041]/60 object-cover shadow"
                />
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    ForexTraining <span className="text-amber-600 dark:text-[#F5B041]">Life</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{siteConfig.tagline}</p>
                </div>
              </div>
              <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {t.footer.desc}
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
              {/* Telegram */}
              <a
                href={siteConfig.socials.telegram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-xl border border-[#2AABEE]/40 bg-white dark:bg-[#0B0E14] p-4 hover:border-[#2AABEE] transition shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2AABEE]/15 text-[#0088cc] dark:text-[#2AABEE]">
                    <Send className="h-4 w-4" />
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#2AABEE]" />
                </div>
                <div className="mt-3">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {t.footer.telegramTitle}
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] text-[#0088cc] dark:text-[#2AABEE] truncate">
                    {siteConfig.socials.telegram.handle}
                  </div>
                </div>
              </a>

              {/* YouTube */}
              <a
                href={siteConfig.socials.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-xl border border-rose-500/40 bg-white dark:bg-[#0B0E14] p-4 hover:border-rose-500 transition shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/15 text-rose-600 dark:text-[#FF3D57]">
                    <Youtube className="h-4 w-4" />
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-rose-500" />
                </div>
                <div className="mt-3">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {t.footer.youtubeTitle}
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] text-rose-600 dark:text-[#FF3D57] truncate">
                    {siteConfig.socials.youtube.handle}
                  </div>
                </div>
              </a>

              {/* Instagram */}
              <a
                href={siteConfig.socials.instagram.url}
                target={
                  siteConfig.socials.instagram.url.startsWith("http")
                    ? "_blank"
                    : undefined
                }
                rel={
                  siteConfig.socials.instagram.url.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group flex flex-col justify-between rounded-xl border border-pink-500/40 bg-white dark:bg-[#0B0E14] p-4 hover:border-pink-500 transition shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-500/15 text-pink-600 dark:text-pink-400">
                    <Instagram className="h-4 w-4" />
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-pink-500" />
                </div>
                <div className="mt-3">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {t.footer.instagramTitle}
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] text-pink-600 dark:text-pink-400 truncate">
                    {siteConfig.socials.instagram.handle}
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-slate-200 dark:border-white/10 pt-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-[#00E676]">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {t.footer.pwaTitle}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {t.footer.pwaDesc}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={triggerInstall}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F5B041] to-[#00E676] px-4 py-2.5 text-xs font-extrabold text-[#0B0E14] shadow-md hover:opacity-95 transition cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>{t.footer.installBtn}</span>
              </button>
              <button
                onClick={openHelpModal}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-[#0B0E14] px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-amber-500 dark:hover:border-[#F5B041] transition cursor-pointer"
              >
                {t.footer.guideBtn}
              </button>
            </div>
          </div>
        </div>

        {/* Дисклеймер о рисках */}
        <div className="mt-8 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#111622]/50 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-amber-600 dark:text-[#F5B041] shrink-0 mt-0.5" />
            <p className="text-[11px] sm:text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              {t.footer.riskDisclaimer}
            </p>
          </div>
        </div>

        {/* Нижняя строка */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-slate-200 dark:border-white/5 pt-6 text-xs text-slate-500 sm:flex-row">
          <span>{t.footer.copyright}</span>
          <div className="flex items-center gap-5">
            <a href="#about" className="hover:text-slate-900 dark:hover:text-slate-300">
              {t.nav.about}
            </a>
            <a href="#education" className="hover:text-slate-900 dark:hover:text-slate-300">
              {t.nav.education}
            </a>
            <a href="#signals" className="hover:text-slate-900 dark:hover:text-slate-300">
              {t.nav.signals}
            </a>
            <a href="#market-review" className="hover:text-slate-900 dark:hover:text-slate-300">
              {t.nav.marketReview}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
