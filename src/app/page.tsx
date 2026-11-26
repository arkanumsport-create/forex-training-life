import React from "react";
import IntroPreloader from "@/components/IntroPreloader";
import Navbar from "@/components/Navbar";
import HeroAnimated from "@/components/HeroAnimated";
import AboutTrader from "@/components/AboutTrader";
import ServicesSection from "@/components/ServicesSection";
import WeeklyReviews from "@/components/WeeklyReviews";
import PricingCards from "@/components/PricingCards";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-white">
      {/* Полноэкранная вступительная заставка: график XAU/USD, стрелки и столкновение Быка и Медведя */}
      <IntroPreloader />

      {/* Шапка сайта (Sticky Header) */}
      <Navbar />

      {/* Основной контент страницы */}
      <main>
        {/* Блок 2: Первый экран с побуквенной анимацией, CTA и бегущей строкой котировок */}
        <HeroAnimated />

        {/* Блок 3: Об авторе и истории проекта («17 лет в рынке» + слот showAuthorPhoto: false) */}
        <AboutTrader />

        {/* Блок 4: Направления работы (Обучение + Telegram-сигналы с мокапом сделки XAU/USD) */}
        <ServicesSection />

        {/* Блок 5: Обзор рынка внизу (4 карточки в стиле YouTube с обложками, автообновлением и переходом на YouTube) */}
        <WeeklyReviews />

        {/* Блок 6: Тарифы (скрыт при showPricing: false в siteConfig.ts) */}
        <PricingCards />
      </main>

      {/* Блок 7: Контакты (Telegram, YouTube, Instagram), установка PWA и дисклеймер о рисках */}
      <Footer />
    </div>
  );
}
