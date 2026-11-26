"use client";

import React, { useState, useEffect } from "react";
import { Download, Menu, X, Send, Youtube, Instagram, CheckCircle2 } from "lucide-react";
import { siteConfig, assetPath } from "@/config/siteConfig";
import { usePWAInstall } from "@/context/PWAInstallContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { triggerInstall, isStandalone } = usePWAInstall();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#0B0E14]/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "border-b border-white/5 bg-[#0B0E14]/75 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Слева: Официальный логотип с YouTube-канала */}
        <a
          href="#"
          className="group flex items-center gap-3 focus:outline-none"
        >
          <div className="relative">
            <img
              src={assetPath("/logo.png")}
              alt={siteConfig.name}
              className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border border-[#F5B041]/50 object-cover shadow-[0_0_15px_rgba(245,176,65,0.2)] transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0B0E14] bg-[#00E676]" />
          </div>
          <div>
            <span className="block text-base sm:text-lg font-extrabold tracking-tight text-white">
              ForexTraining <span className="text-[#F5B041]">Life</span>
            </span>
            <span className="block text-[10px] sm:text-[11px] font-medium text-slate-400">
              Forex & Crypto Academy
            </span>
          </div>
        </a>

        {/* По центру: Навигация */}
        <nav className="hidden lg:flex items-center gap-7">
          {siteConfig.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-[#F5B041] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Справа: Соцсети (Telegram, YouTube, Instagram) + Кнопка установки PWA */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Telegram */}
          <a
            href={siteConfig.socials.telegram.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Telegram ${siteConfig.socials.telegram.handle}`}
            className="flex items-center gap-1.5 rounded-xl border border-[#2AABEE]/30 bg-[#2AABEE]/10 px-3 py-2 text-xs font-semibold text-[#2AABEE] hover:bg-[#2AABEE]/20 transition"
          >
            <Send className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">Telegram</span>
          </a>

          {/* YouTube */}
          <a
            href={siteConfig.socials.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`YouTube ${siteConfig.socials.youtube.handle}`}
            className="flex items-center gap-1.5 rounded-xl border border-[#FF3D57]/30 bg-[#FF3D57]/10 px-3 py-2 text-xs font-semibold text-[#FF3D57] hover:bg-[#FF3D57]/20 transition"
          >
            <Youtube className="h-4 w-4" />
            <span className="hidden xl:inline">YouTube</span>
          </a>

          {/* Instagram (значок в шапке и контактах) */}
          <a
            href={siteConfig.socials.instagram.url}
            target={siteConfig.socials.instagram.url.startsWith("http") ? "_blank" : undefined}
            rel={
              siteConfig.socials.instagram.url.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
            title="Instagram ForexTraining Life"
            className="flex items-center justify-center rounded-xl border border-pink-500/30 bg-pink-500/10 p-2 text-pink-400 hover:bg-pink-500/20 transition"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>

          {/* Кнопка Установить приложение (PWA) */}
          <button
            onClick={triggerInstall}
            className="flex items-center gap-2 rounded-xl border border-[#F5B041]/40 bg-gradient-to-r from-[#F5B041]/20 to-[#00E676]/20 px-3.5 py-2 text-xs font-bold text-white hover:border-[#F5B041] hover:shadow-[0_0_20px_rgba(245,176,65,0.25)] transition cursor-pointer"
          >
            {isStandalone ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-[#00E676]" />
                <span>PWA Активно</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4 text-[#F5B041]" />
                <span>Установить приложение</span>
              </>
            )}
          </button>
        </div>

        {/* Мобильные кнопки: PWA + Бургер */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={triggerInstall}
            className="flex items-center gap-1.5 rounded-xl border border-[#F5B041]/40 bg-[#111622] px-2.5 py-2 text-xs font-bold text-[#F5B041]"
            aria-label="Установить приложение"
          >
            <Download className="h-3.5 w-3.5" />
            <span>PWA</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-xl border border-white/10 bg-[#111622] p-2 text-slate-200 hover:text-white"
            aria-label="Меню"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Мобильное выпадающее меню */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#111622] px-4 pt-3 pb-5 md:hidden">
          <nav className="flex flex-col space-y-2">
            {siteConfig.navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/5 hover:text-[#F5B041]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
            <a
              href={siteConfig.socials.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-[#2AABEE]/30 bg-[#2AABEE]/10 py-2.5 text-xs font-bold text-[#2AABEE]"
            >
              <Send className="h-3.5 w-3.5" />
              Telegram
            </a>
            <a
              href={siteConfig.socials.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-[#FF3D57]/30 bg-[#FF3D57]/10 py-2.5 text-xs font-bold text-[#FF3D57]"
            >
              <Youtube className="h-4 w-4" />
              YouTube
            </a>
            <a
              href={siteConfig.socials.instagram.url}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-pink-500/30 bg-pink-500/10 py-2.5 text-xs font-bold text-pink-400"
            >
              <Instagram className="h-4 w-4" />
              Instagram
            </a>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              triggerInstall();
            }}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F5B041] to-[#00E676] py-3 text-xs font-extrabold text-[#0B0E14] shadow-lg"
          >
            <Download className="h-4 w-4" />
            <span>Установить приложение на смартфон</span>
          </button>
        </div>
      )}
    </header>
  );
}
