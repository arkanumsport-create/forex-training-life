"use client";

import React, { useState, useEffect } from "react";
import {
  Download,
  Menu,
  X,
  Send,
  Youtube,
  Instagram,
  CheckCircle2,
  Sun,
  Moon,
  Globe,
} from "lucide-react";
import { siteConfig, assetPath } from "@/config/siteConfig";
import { usePWAInstall } from "@/context/PWAInstallContext";
import { useAppSettings } from "@/context/AppSettingsContext";
import { getT } from "@/config/translations";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { triggerInstall, isStandalone } = usePWAInstall();
  const { lang, toggleLang, theme, toggleTheme } = useAppSettings();
  const t = getT(lang);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.education, href: "#education" },
    { label: t.nav.signals, href: "#signals" },
    { label: t.nav.marketReview, href: "#market-review" },
    { label: t.nav.contacts, href: "#contacts" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0B0E14]/92 backdrop-blur-xl shadow-md dark:shadow-[0_10px_30px_rgba(0,0,0,0.55)]"
          : "border-b border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0B0E14]/85 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Слева: Логотип с YouTube-канала */}
        <a href="#" className="group flex items-center gap-3 shrink-0">
          <div className="relative">
            <img
              src={assetPath("/logo.png")}
              alt={siteConfig.name}
              className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border border-[#F5B041]/60 object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-[#0B0E14] bg-[#00E676]" />
          </div>
          <div>
            <span className="block text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
              ForexTraining <span className="text-amber-600 dark:text-[#F5B041]">Life</span>
            </span>
            <span className="block text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {t.nav.subtitle}
            </span>
          </div>
        </a>

        {/* По центру: Навигация */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-700 hover:text-amber-600 dark:text-slate-300 dark:hover:text-[#F5B041] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Справа: Переключатели RU/EN и Темная/Светлая тема + Соцсети + PWA */}
        <div className="hidden md:flex items-center gap-2">
          {/* Переключатель языка RU / EN */}
          <button
            onClick={toggleLang}
            title={lang === "ru" ? "Switch to English" : "Переключить на Русский"}
            className="flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-[#111622] px-2.5 py-2 text-xs font-extrabold text-slate-800 dark:text-white hover:border-amber-500 dark:hover:border-[#F5B041] transition cursor-pointer"
          >
            <Globe className="h-3.5 w-3.5 text-amber-600 dark:text-[#F5B041]" />
            <span>{lang === "ru" ? "RU" : "EN"}</span>
          </button>

          {/* Переключатель темы Dark / Light */}
          <button
            onClick={toggleTheme}
            title={theme === "dark" ? t.nav.lightTheme : t.nav.darkTheme}
            className="flex items-center justify-center rounded-xl border border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-[#111622] p-2 text-slate-700 dark:text-[#F5B041] hover:border-amber-500 dark:hover:border-[#F5B041] transition cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4 text-slate-800" />
            )}
          </button>

          {/* Telegram */}
          <a
            href={siteConfig.socials.telegram.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Telegram ${siteConfig.socials.telegram.handle}`}
            className="flex items-center justify-center rounded-xl border border-[#2AABEE]/40 bg-[#2AABEE]/10 p-2 text-[#0088cc] dark:text-[#2AABEE] hover:bg-[#2AABEE]/20 transition"
            aria-label="Telegram"
          >
            <Send className="h-4 w-4" />
          </a>

          {/* YouTube */}
          <a
            href={siteConfig.socials.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`YouTube ${siteConfig.socials.youtube.handle}`}
            className="flex items-center justify-center rounded-xl border border-[#FF3D57]/40 bg-[#FF3D57]/10 p-2 text-[#e0243e] dark:text-[#FF3D57] hover:bg-[#FF3D57]/20 transition"
            aria-label="YouTube"
          >
            <Youtube className="h-4 w-4" />
          </a>

          {/* Instagram */}
          <a
            href={siteConfig.socials.instagram.url}
            target={siteConfig.socials.instagram.url.startsWith("http") ? "_blank" : undefined}
            rel={
              siteConfig.socials.instagram.url.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
            title="Instagram ForexTraining Life"
            className="flex items-center justify-center rounded-xl border border-pink-500/40 bg-pink-500/10 p-2 text-pink-600 dark:text-pink-400 hover:bg-pink-500/20 transition"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>

          {/* Кнопка Установить PWA */}
          <button
            onClick={triggerInstall}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#F5B041] to-[#00E676] px-3.5 py-2 text-xs font-extrabold text-[#0B0E14] shadow-md hover:opacity-95 transition cursor-pointer"
          >
            {isStandalone ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>{t.nav.pwaActive}</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span>{t.nav.installApp}</span>
              </>
            )}
          </button>
        </div>

        {/* Мобильные кнопки управления */}
        <div className="flex items-center gap-1.5 md:hidden">
          <button
            onClick={toggleLang}
            className="rounded-xl border border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-[#111622] px-2.5 py-2 text-xs font-extrabold text-slate-900 dark:text-white"
            aria-label="Switch language"
          >
            {lang.toUpperCase()}
          </button>

          <button
            onClick={toggleTheme}
            className="rounded-xl border border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-[#111622] p-2 text-slate-800 dark:text-[#F5B041]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-xl border border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-[#111622] p-2 text-slate-900 dark:text-slate-100"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#111622] px-4 pt-3 pb-5 md:hidden shadow-xl">
          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-amber-600 dark:hover:text-[#F5B041]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-200 dark:border-white/10 pt-4">
            <a
              href={siteConfig.socials.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-[#2AABEE]/40 bg-[#2AABEE]/10 py-2.5 text-xs font-bold text-[#0088cc] dark:text-[#2AABEE]"
            >
              <Send className="h-3.5 w-3.5" />
              Telegram
            </a>
            <a
              href={siteConfig.socials.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-[#FF3D57]/40 bg-[#FF3D57]/10 py-2.5 text-xs font-bold text-[#e0243e] dark:text-[#FF3D57]"
            >
              <Youtube className="h-4 w-4" />
              YouTube
            </a>
            <a
              href={siteConfig.socials.instagram.url}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-pink-500/40 bg-pink-500/10 py-2.5 text-xs font-bold text-pink-600 dark:text-pink-400"
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
            <span>{t.nav.installMobile}</span>
          </button>
        </div>
      )}
    </header>
  );
}
