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
import { siteConfig } from "@/config/siteConfig";
import { usePWAInstall } from "@/context/PWAInstallContext";

export default function Footer() {
  const { triggerInstall, openHelpModal } = usePWAInstall();

  return (
    <footer
      id="contacts"
      className="relative bg-[#0B0E14] pt-14 pb-10 text-slate-400"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Блок Контактов и Соцсетей (Telegram, YouTube, Instagram) */}
        <div className="rounded-2xl border border-white/10 bg-[#111622] p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3.5">
                <img
                  src="/logo.png"
                  alt={siteConfig.name}
                  className="h-12 w-12 rounded-xl border border-[#F5B041]/50 object-cover"
                />
                <div>
                  <h3 className="text-lg font-extrabold text-white">
                    ForexTraining <span className="text-[#F5B041]">Life</span>
                  </h3>
                  <p className="text-xs text-slate-400">{siteConfig.tagline}</p>
                </div>
              </div>
              <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-slate-300">
                Присоединяйтесь к нашему сообществу трейдеров в Telegram, смотрите свежие обзоры рынка на YouTube и установите PWA-приложение на свой смартфон.
              </p>
            </div>

            {/* 3 карточки контактов: Telegram, YouTube, Instagram */}
            <div className="lg:col-span-7 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
              {/* Telegram */}
              <a
                href={siteConfig.socials.telegram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-xl border border-[#2AABEE]/30 bg-[#0B0E14] p-4 hover:border-[#2AABEE] transition"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2AABEE]/15 text-[#2AABEE]">
                    <Send className="h-4 w-4" />
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-[#2AABEE]" />
                </div>
                <div className="mt-3">
                  <div className="text-xs font-bold text-white">Telegram-канал</div>
                  <div className="mt-0.5 font-mono text-[11px] text-[#2AABEE] truncate">
                    {siteConfig.socials.telegram.handle}
                  </div>
                </div>
              </a>

              {/* YouTube */}
              <a
                href={siteConfig.socials.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-xl border border-[#FF3D57]/30 bg-[#0B0E14] p-4 hover:border-[#FF3D57] transition"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF3D57]/15 text-[#FF3D57]">
                    <Youtube className="h-4 w-4" />
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-[#FF3D57]" />
                </div>
                <div className="mt-3">
                  <div className="text-xs font-bold text-white">YouTube-канал</div>
                  <div className="mt-0.5 font-mono text-[11px] text-[#FF3D57] truncate">
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
                className="group flex flex-col justify-between rounded-xl border border-pink-500/30 bg-[#0B0E14] p-4 hover:border-pink-400 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-500/15 text-pink-400">
                    <Instagram className="h-4 w-4" />
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-pink-400" />
                </div>
                <div className="mt-3">
                  <div className="text-xs font-bold text-white">Instagram</div>
                  <div className="mt-0.5 font-mono text-[11px] text-pink-400 truncate">
                    {siteConfig.socials.instagram.handle}
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Панель установки PWA-приложения на смартфон (Android/Desktop + инструкция iOS Safari) */}
          <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00E676]/15 text-[#00E676]">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  Мобильное PWA-приложение ForexTraining Life
                </h4>
                <p className="text-xs text-slate-400">
                  Установите на главный экран iOS (Safari «На экран Домой») или Android в один клик
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={triggerInstall}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F5B041] to-[#00E676] px-4 py-2.5 text-xs font-extrabold text-[#0B0E14] shadow-lg hover:opacity-95 transition cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Установить приложение</span>
              </button>
              <button
                onClick={openHelpModal}
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-[#0B0E14] px-3.5 py-2.5 text-xs font-semibold text-slate-300 hover:border-[#F5B041] hover:text-white transition cursor-pointer"
              >
                Инструкция для iOS / Android
              </button>
            </div>
          </div>
        </div>

        {/* Дисклеймер о рисках */}
        <div className="mt-8 rounded-xl border border-white/5 bg-[#111622]/50 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-[#F5B041] shrink-0 mt-0.5" />
            <p className="text-[11px] sm:text-xs leading-relaxed text-slate-400">
              {siteConfig.footer.riskDisclaimer}
            </p>
          </div>
        </div>

        {/* Нижняя строка копирайта */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row">
          <span>{siteConfig.footer.copyright}</span>
          <div className="flex items-center gap-5">
            <a href="#about" className="hover:text-slate-300">
              О проекте
            </a>
            <a href="#education" className="hover:text-slate-300">
              Обучение
            </a>
            <a href="#signals" className="hover:text-slate-300">
              Сигналы
            </a>
            <a href="#market-review" className="hover:text-slate-300">
              Обзор рынка
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
