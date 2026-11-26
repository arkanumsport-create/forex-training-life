import type { Language } from "@/context/AppSettingsContext";

export interface MarketQuote {
  symbol: string;
  label: string;
  category: "forex" | "crypto";
  price: string;
  change: string;
  isPositive: boolean;
  tvUrl: string;
  isGold?: boolean;
}

// 10 котировок: 5 основных Forex инструментов + 5 топ криптовалют со ссылками на TradingView
export const MARKET_QUOTES: MarketQuote[] = [
  // 5 Forex (основные торги)
  {
    symbol: "XAU/USD",
    label: "Gold Spot / USD",
    category: "forex",
    price: "2,718.45",
    change: "+1.42%",
    isPositive: true,
    tvUrl: "https://www.tradingview.com/chart/?symbol=OANDA:XAUUSD",
    isGold: true,
  },
  {
    symbol: "EUR/USD",
    label: "Euro / US Dollar",
    category: "forex",
    price: "1.0548",
    change: "+0.28%",
    isPositive: true,
    tvUrl: "https://www.tradingview.com/chart/?symbol=FX:EURUSD",
  },
  {
    symbol: "GBP/USD",
    label: "British Pound / USD",
    category: "forex",
    price: "1.2694",
    change: "-0.19%",
    isPositive: false,
    tvUrl: "https://www.tradingview.com/chart/?symbol=FX:GBPUSD",
  },
  {
    symbol: "USD/JPY",
    label: "US Dollar / Yen",
    category: "forex",
    price: "153.82",
    change: "+0.54%",
    isPositive: true,
    tvUrl: "https://www.tradingview.com/chart/?symbol=FX:USDJPY",
  },
  {
    symbol: "USD/CHF",
    label: "US Dollar / Franc",
    category: "forex",
    price: "0.8842",
    change: "-0.14%",
    isPositive: false,
    tvUrl: "https://www.tradingview.com/chart/?symbol=FX:USDCHF",
  },
  // 5 Crypto (основные крипто монеты)
  {
    symbol: "BTC/USDT",
    label: "Bitcoin",
    category: "crypto",
    price: "96,420.00",
    change: "+3.85%",
    isPositive: true,
    tvUrl: "https://www.tradingview.com/chart/?symbol=BINANCE:BTCUSDT",
  },
  {
    symbol: "ETH/USDT",
    label: "Ethereum",
    category: "crypto",
    price: "3,485.60",
    change: "+2.14%",
    isPositive: true,
    tvUrl: "https://www.tradingview.com/chart/?symbol=BINANCE:ETHUSDT",
  },
  {
    symbol: "SOL/USDT",
    label: "Solana",
    category: "crypto",
    price: "242.15",
    change: "+4.62%",
    isPositive: true,
    tvUrl: "https://www.tradingview.com/chart/?symbol=BINANCE:SOLUSDT",
  },
  {
    symbol: "XRP/USDT",
    label: "Ripple",
    category: "crypto",
    price: "1.4820",
    change: "+6.18%",
    isPositive: true,
    tvUrl: "https://www.tradingview.com/chart/?symbol=BINANCE:XRPUSDT",
  },
  {
    symbol: "BNB/USDT",
    label: "BNB Chain",
    category: "crypto",
    price: "654.30",
    change: "-0.75%",
    isPositive: false,
    tvUrl: "https://www.tradingview.com/chart/?symbol=BINANCE:BNBUSDT",
  },
];

export const translations = {
  ru: {
    intro: {
      brandName: "ForexTraining Life",
      slogan: "Торгуй и зарабатывай вместе с нами",
      skip: "Пропустить",
      enterSite: "Перейти на сайт",
    },
    nav: {
      subtitle: "Forex & Crypto Academy",
      about: "О проекте",
      education: "Обучение",
      signals: "Сигналы и Прогнозы",
      marketReview: "Обзор рынка",
      contacts: "Контакты",
      installApp: "Установить PWA",
      pwaActive: "PWA Активно",
      installMobile: "Установить приложение на смартфон",
      lightTheme: "Светлая тема",
      darkTheme: "Тёмная тема",
    },
    hero: {
      badge: "FOREX & CRYPTO TRADING ACADEMY • 17+ ЛЕТ ОПЫТА",
      animatedTitle: "Добро пожаловать на наш сайт ForexTraining Life",
      slogan: "Торгуй и зарабатывай вместе с нами",
      subtitle:
        "Профессиональный трейдинг на рынках Forex и Криптовалют. Системный подход к анализу рыночной структуры, опционов и уровней ликвидности. Обучение осознанной торговле без иллюзий и доступ к ежедневным прогнозам и торговым сигналам.",
      primaryCta: "Получать сигналы в Telegram",
      secondaryCta: "Смотреть обзор рынка",
      highlights: [
        { label: "Фокус рынка", value: "XAU/USD • Forex • Crypto" },
        { label: "Методология", value: "Опционы + Техническая картина" },
        { label: "Аналитика", value: "Еженедельные и дневные разборы" },
      ],
      quotesPanel: {
        title: "Котировки рынка",
        subtitle: "5 Forex пар + 5 Криптовалют",
        liveBadge: "TRADINGVIEW",
        tabAll: "Все (10)",
        tabForex: "Forex (5)",
        tabCrypto: "Crypto (5)",
        viewChart: "Смотреть график",
        footerNote: "Нажмите «Смотреть график», чтобы открыть интерактивный график в TradingView",
      },
    },
    about: {
      badge: "ЭКСПЕРТИЗА И ИСТОРИЯ ПРОЕКТА",
      title: "17 лет в рынке: системный трейдинг без иллюзий",
      subtitle:
        "От первых сделок на классическом валютном рынке до создания авторской методологии анализа ликвидности, опционных уровней и риск-менеджмента.",
      methodTag: "АВТОРСКАЯ МЕТОДОЛОГИЯ",
      authorName: "Основатель ForexTraining Life",
      authorRole: "Трейдер-практик • Аналитик Forex & Crypto",
      pillars: [
        {
          title: "Опционный анализ + Техническая картина",
          desc: "Определение зон ликвидности и приоритета крупного капитала на золоте XAU/USD, валютах и крипторынке.",
        },
        {
          title: "Строгий математический риск-менеджмент",
          desc: "Защита депозита, работа с коротким стопом и каскадная фиксация прибыли с переводом в безубыток.",
        },
        {
          title: "Открытая публичная аналитика",
          desc: "Еженедельные воскресные обзоры рынка на YouTube и ежедневное ведение сценариев в Telegram.",
        },
      ],
      storyParagraphs: [
        "Трейдер-практик с 17-летним опытом реальной торговли на финансовых рынках (Forex, металлы XAU/USD, нефть WTI и Криптовалюты).",
        "За годы работы пройден полный путь от классического технического анализа до создания собственной торговой системы, объединяющей рыночную структуру, зоны ликвидности, опционный анализ и строгий математический контроль рисков.",
        "Сегодня проект ForexTraining Life — это авторский YouTube-канал с регулярными еженедельными и ежедневными обзорами рынка, а также Telegram-сообщество трейдеров с торговыми идеями, сигналами и практическим обучением.",
      ],
      counters: [
        { value: "17+", label: "Лет практики в рынке", accent: "gold" as const },
        { value: "Forex & Crypto", label: "Ключевые рынки и XAU/USD", accent: "green" as const },
        { value: "Weekly & Daily", label: "Еженедельные видеоразборы", accent: "green" as const },
        { value: "24/7", label: "Поддержка Telegram-комьюнити", accent: "gold" as const },
      ],
    },
    services: {
      badge: "НАПРАВЛЕНИЯ РАБОТЫ",
      title: "Комплексная экосистема для трейдера",
      subtitle:
        "Два ключевых направления: фундаментальное обучение пониманию рынка и ежедневная практическая работа по сигналам.",
      education: {
        tag: "АКАДЕМИЯ ТРЕЙДИНГА",
        title: "Обучение системному трейдингу",
        description:
          "Структурированная программа подготовки для тех, кто хочет самостоятельно читать график, понимать логику крупного игрока и торговать с математическим перевесом.",
        programTitle: "Структурированная программа обучения:",
        modules: [
          "Анализ рыночной структуры и определение истинного тренда",
          "Уровни ликвидности, опционные зоны и баланс спроса/предложения",
          "Специфика работы с золотом (XAU/USD), мажорами Forex и нефтью WTI",
          "Криптовалютный рынок (BTC, ETH, альткоины): спот и фьючерсы",
          "Профессиональный риск-менеджмент и психология дисциплины",
        ],
        formatTitle: "Формат подготовки и практики:",
        formats: [
          "Пошаговые видеоуроки без воды",
          "Проверка и разбор домашних заданий на реальных графиках",
          "Живые сессии вопросов-ответов и разбор ошибок",
        ],
        ctaLabel: "Узнать об обучении в Telegram",
      },
      signals: {
        tag: "TELEGRAM СООБЩЕСТВО",
        title: "Telegram-канал с прогнозами и сигналами",
        description:
          "Ежедневная аналитика, готовые торговые сценарии и четкие точки входа с полным сопровождением позиции от открытия до фиксации прибыли.",
        features: [
          "Публикация торговых идей до начала импульса с графической разметкой",
          "Точные координаты сделки: уровень входа (Entry), Stop-Loss и каскад Take-Profit",
          "Оперативное сопровождение: перевод в безубыток и частичная фиксация",
          "Утренние видео-апдейты по золоту XAU/USD и основным валютным парам",
        ],
        ctaLabel: "Перейти в Telegram @InfoForexTrainingLife",
        sample: {
          channelName: "ForexTraining Life | Сигналы & Аналитика",
          time: "Сегодня, 10:15 МСК",
          comment:
            "Захват ликвидности под зоной опционного баланса D1 + реакция на блок заказов H1. При достижении TP1 фиксируем 50% объема и переводим сделку в БУ.",
          status: "TP1 ДОСТИГНУТ (+145 пунктов) • Сделка в безубытке",
        },
      },
    },
    reviews: {
      badge: "YOUTUBE ВИДЕО-ХАБ • АВТООБНОВЛЕНИЕ",
      title: "Обзор рынка и аналитика на YouTube",
      subtitle:
        "Свежие видеоролики подтягиваются автоматически с официального канала @forextraininglife. Нажмите на любой выпуск, чтобы открыть разбор на YouTube.",
      newBadge: "НОВЫЙ ВЫПУСК",
      defaultBadge: "ОБЗОР РЫНКА",
      viewsSuffix: "просм.",
      watchOnYoutube: "YouTube",
    },
    footer: {
      desc: "Присоединяйтесь к нашему сообществу трейдеров в Telegram, смотрите свежие обзоры рынка на YouTube и установите PWA-приложение на свой смартфон.",
      telegramTitle: "Telegram-канал",
      youtubeTitle: "YouTube-канал",
      instagramTitle: "Instagram",
      pwaTitle: "Мобильное PWA-приложение ForexTraining Life",
      pwaDesc: "Установите на главный экран iOS (Safari «На экран Домой») или Android в один клик",
      installBtn: "Установить приложение",
      guideBtn: "Инструкция для iOS / Android",
      riskDisclaimer:
        "Предупреждение о рисках: Торговля на финансовых рынках (Forex, контракты на разницу цен CFD, металлы XAU/USD и криптовалюты) сопряжена с высоким уровнем риска и может подходить не всем инвесторам. Высокое кредитное плечо может работать как в вашу пользу, так и против вас. Все материалы, видеообзоры, прогнозы и сигналы, представленные на сайте ForexTraining Life, в Telegram-канале @InfoForexTrainingLife и на YouTube-канале @forextraininglife, носят исключительно информационный, аналитический и образовательный характер и не являются индивидуальной инвестиционной рекомендацией.",
      copyright: `© ${new Date().getFullYear()} ForexTraining Life. Все права защищены.`,
    },
    pwaModal: {
      badge: "PWA ПРИЛОЖЕНИЕ",
      title: "Установить ForexTraining Life",
      subtitle: "Быстрый доступ к обзорам рынка и сигналам с главного экрана",
      alreadyInstalled: "Приложение ForexTraining Life уже установлено на вашем устройстве!",
      iosTitle: "Инструкция для iPhone / iPad (Safari):",
      iosStep1Title: "1. Нажмите «Поделиться»",
      iosStep1Desc: "Иконка квадрата со стрелкой вверх в нижней панели браузера Safari.",
      iosStep2Title: "2. Выберите «На экран «Домой»»",
      iosStep2Desc: "Прокрутите меню вниз и нажмите «На экран «Домой»» (Add to Home Screen), затем «Добавить».",
      otherTitle: "Установка на Android / ПК (Chrome, Edge):",
      otherStep1Title: "1. Откройте меню браузера (⋮)",
      otherStep1Desc: "Нажмите на три точки в правом верхнем углу браузера или значок установки в адресной строке.",
      otherStep2Title: "2. Выберите «Установить приложение»",
      otherStep2Desc: "Или «Добавить на главный экран» — иконка FTL Trading появится среди ваших приложений.",
      closeBtn: "Понятно",
    },
  },

  en: {
    intro: {
      brandName: "ForexTraining Life",
      slogan: "Торгуй и зарабатывай вместе с нами",
      skip: "Skip",
      enterSite: "Enter Website",
    },
    nav: {
      subtitle: "Forex & Crypto Academy",
      about: "About",
      education: "Education",
      signals: "Signals & Forecasts",
      marketReview: "Market Review",
      contacts: "Contacts",
      installApp: "Install PWA",
      pwaActive: "PWA Active",
      installMobile: "Install App on Smartphone",
      lightTheme: "Light Theme",
      darkTheme: "Dark Theme",
    },
    hero: {
      badge: "FOREX & CRYPTO TRADING ACADEMY • 17+ YEARS EXPERIENCE",
      animatedTitle: "Welcome to our website ForexTraining Life",
      slogan: "Trade and earn together with us",
      subtitle:
        "Professional trading on Forex and Cryptocurrency markets. A systematic approach to market structure, options levels, and liquidity zones. Conscious trading education without illusions plus daily forecasts and trading signals.",
      primaryCta: "Get Signals in Telegram",
      secondaryCta: "Watch Market Review",
      highlights: [
        { label: "Market Focus", value: "XAU/USD • Forex • Crypto" },
        { label: "Methodology", value: "Options + Technical Structure" },
        { label: "Analytics", value: "Weekly & Daily Breakdowns" },
      ],
      quotesPanel: {
        title: "Market Quotes",
        subtitle: "5 Major Forex Pairs + 5 Top Cryptos",
        liveBadge: "TRADINGVIEW",
        tabAll: "All (10)",
        tabForex: "Forex (5)",
        tabCrypto: "Crypto (5)",
        viewChart: "View Chart",
        footerNote: "Click «View Chart» to open the live interactive chart on TradingView",
      },
    },
    about: {
      badge: "EXPERTISE & PROJECT STORY",
      title: "17 Years in the Markets: Systematic Trading Without Illusions",
      subtitle:
        "From early currency trades to building a proprietary methodology combining liquidity zones, options balances, and strict risk management.",
      methodTag: "PROPRIETARY METHODOLOGY",
      authorName: "Founder of ForexTraining Life",
      authorRole: "Practicing Trader • Forex & Crypto Analyst",
      pillars: [
        {
          title: "Options Analysis + Technical Structure",
          desc: "Identifying liquidity sweeps and institutional bias on Gold XAU/USD, major currencies, and cryptocurrencies.",
        },
        {
          title: "Strict Mathematical Risk Management",
          desc: "Capital preservation, tight stop-losses, and staged take-profit targets with breakeven protection.",
        },
        {
          title: "Transparent Public Analytics",
          desc: "Regular weekly market reviews on YouTube and daily trade scenario updates in Telegram.",
        },
      ],
      storyParagraphs: [
        "Practicing trader with 17+ years of real trading experience across global financial markets (Forex, Gold XAU/USD, WTI Oil, and Cryptocurrencies).",
        "Over the years, evolved from classic technical analysis into a complete proprietary trading system uniting market structure, liquidity pools, options data, and disciplined risk control.",
        "Today, ForexTraining Life is a dedicated YouTube channel with weekly and daily market reviews alongside a Telegram community offering trade ideas, signals, and practical mentorship.",
      ],
      counters: [
        { value: "17+", label: "Years of Live Trading", accent: "gold" as const },
        { value: "Forex & Crypto", label: "Core Markets & XAU/USD", accent: "green" as const },
        { value: "Weekly & Daily", label: "YouTube Market Reviews", accent: "green" as const },
        { value: "24/7", label: "Telegram Community Support", accent: "gold" as const },
      ],
    },
    services: {
      badge: "CORE DIRECTIONS",
      title: "Complete Ecosystem for Traders",
      subtitle:
        "Two flagship pillars: structured trading education and daily practical guidance through market signals.",
      education: {
        tag: "TRADING ACADEMY",
        title: "Systematic Trading Education",
        description:
          "A structured curriculum designed for traders who want to read charts independently, understand smart money flow, and trade with statistical edge.",
        programTitle: "Structured Curriculum:",
        modules: [
          "Market structure analysis and true trend identification",
          "Liquidity pools, options balance zones, and supply/demand",
          "Trading Gold (XAU/USD), Forex majors, and WTI crude oil",
          "Cryptocurrency markets (BTC, ETH, altcoins): spot & futures",
          "Professional risk management and trading psychology",
        ],
        formatTitle: "Training & Practice Format:",
        formats: [
          "Step-by-step video lessons without fluff",
          "Homework reviews on real live market charts",
          "Live Q&A sessions and trade breakdown clinics",
        ],
        ctaLabel: "Ask About Training in Telegram",
      },
      signals: {
        tag: "TELEGRAM COMMUNITY",
        title: "Telegram Channel with Forecasts & Signals",
        description:
          "Daily market analytics, clear trade setups, and exact entry levels with full position management from entry to take-profit.",
        features: [
          "Trade scenarios published ahead of market impulse with chart markups",
          "Clear order parameters: Entry zone, Stop-Loss, and Take-Profit targets",
          "Active trade management: breakeven shifts and partial profit taking",
          "Morning video updates on Gold XAU/USD and major currency pairs",
        ],
        ctaLabel: "Join Telegram @InfoForexTrainingLife",
        sample: {
          channelName: "ForexTraining Life | Signals & Analytics",
          time: "Today, 10:15 UTC+3",
          comment:
            "Liquidity sweep below D1 options balance zone + reaction from H1 order block. Taking 50% profit at TP1 and moving Stop-Loss to breakeven.",
          status: "TP1 HIT (+145 pips) • Position at Breakeven",
        },
      },
    },
    reviews: {
      badge: "YOUTUBE VIDEO HUB • AUTO-SYNC",
      title: "Market Reviews & Analytics on YouTube",
      subtitle:
        "Fresh videos are automatically synced from the official @forextraininglife channel. Click any card to watch directly on YouTube.",
      newBadge: "NEW RELEASE",
      defaultBadge: "MARKET REVIEW",
      viewsSuffix: "views",
      watchOnYoutube: "YouTube",
    },
    footer: {
      desc: "Join our trading community on Telegram, watch fresh weekly market reviews on YouTube, and install the ForexTraining Life PWA app on your phone.",
      telegramTitle: "Telegram Channel",
      youtubeTitle: "YouTube Channel",
      instagramTitle: "Instagram",
      pwaTitle: "ForexTraining Life Mobile PWA App",
      pwaDesc: "Install on your iOS (Safari «Add to Home Screen») or Android home screen in one tap",
      installBtn: "Install App",
      guideBtn: "iOS / Android Guide",
      riskDisclaimer:
        "Risk Warning: Trading financial markets (Forex, CFDs, Gold XAU/USD, and cryptocurrencies) carries a high level of risk and may not be suitable for all investors. High leverage can work both for and against you. All materials, video reviews, forecasts, and signals provided on ForexTraining Life, Telegram @InfoForexTrainingLife, and YouTube @forextraininglife are strictly for educational and analytical purposes and do not constitute financial advice.",
      copyright: `© ${new Date().getFullYear()} ForexTraining Life. All rights reserved.`,
    },
    pwaModal: {
      badge: "PWA APPLICATION",
      title: "Install ForexTraining Life",
      subtitle: "Instant access to market reviews and signals from your home screen",
      alreadyInstalled: "ForexTraining Life app is already installed on your device!",
      iosTitle: "Guide for iPhone / iPad (Safari):",
      iosStep1Title: "1. Tap the «Share» button",
      iosStep1Desc: "The square icon with an upward arrow at the bottom bar of Safari.",
      iosStep2Title: "2. Select «Add to Home Screen»",
      iosStep2Desc: "Scroll down, tap «Add to Home Screen», and then tap «Add».",
      otherTitle: "Install on Android / Desktop (Chrome, Edge):",
      otherStep1Title: "1. Open the browser menu (⋮)",
      otherStep1Desc: "Tap the three dots in the top-right corner or the install icon in the address bar.",
      otherStep2Title: "2. Select «Install App»",
      otherStep2Desc: "Or «Add to Home Screen» — the FTL Trading icon will appear among your apps.",
      closeBtn: "Got it",
    },
  },
} as const;

export function getT(lang: Language) {
  return translations[lang];
}
