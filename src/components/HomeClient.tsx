"use client";

import React, { useState } from "react";
import IntroPreloader from "@/components/IntroPreloader";
import Navbar from "@/components/Navbar";
import HeroAnimated from "@/components/HeroAnimated";
import AboutTrader from "@/components/AboutTrader";
import ServicesSection from "@/components/ServicesSection";
import WeeklyReviews from "@/components/WeeklyReviews";
import PricingCards from "@/components/PricingCards";
import Footer from "@/components/Footer";

export default function HomeClient() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0E14] text-slate-900 dark:text-white transition-colors">
      {/* Полноэкранная видео-заставка Быка и Медведя с титрами ForexTraining Life */}
      <IntroPreloader onComplete={() => setIntroDone(true)} />

      {/* Шапка сайта с переключателями RU/EN, Dark/Light и PWA */}
      <Navbar />

      {/* Основной контент */}
      <main>
        {/* Первый экран с однократно проигрываемым видео-фоном графика и списком 10 котировок TradingView */}
        <HeroAnimated introDone={introDone} />

        {/* 17 лет в рынке */}
        <AboutTrader />

        {/* Обучение + Telegram-сигналы */}
        <ServicesSection />

        {/* Вкладка Обзор рынка (4 свежих видео с YouTube-обложками и автосинхронизацией) */}
        <WeeklyReviews />

        {/* Тарифы (скрыты при showPricing: false) */}
        <PricingCards />
      </main>

      {/* Контакты (Telegram, YouTube, Instagram) + PWA + Дисклеймер */}
      <Footer />
    </div>
  );
}
