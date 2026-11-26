export interface YouTubeVideoItem {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
  views?: string;
  badge?: string;
}

export const siteConfig = {
  name: "ForexTraining Life",
  shortName: "FTL Trading",
  tagline: "Forex & Crypto Trading Academy & Signals",
  description:
    "Профессиональный трейдинг на рынках Forex и Криптовалют. Системный анализ рынка, работа с золотом XAU/USD, обучение осознанной торговле и ежедневные торговые сигналы.",
  url: "https://forextraininglife.com",

  // Флаги управления блоками (легкое включение/отключение без правки кода)
  features: {
    showAuthorPhoto: false, // Слот для фото автора в блоке «17 лет в рынке» (пока скрыт)
    showPricing: false,     // Вкладка и блок «Тарифы и цены» (пока отключены по ТЗ)
    enableIntroPreloader: true,
  },

  // Ссылки на соцсети и контакты
  socials: {
    telegram: {
      label: "Telegram",
      handle: "@InfoForexTrainingLife",
      url: "https://t.me/InfoForexTrainingLife",
    },
    youtube: {
      label: "YouTube",
      handle: "@forextraininglife",
      url: "https://www.youtube.com/@forextraininglife",
      channelId: "UCmlM0-hINj2rtKMa0kbzmUg",
    },
    instagram: {
      label: "Instagram",
      handle: "@forextraininglife",
      // Ссылка на Instagram будет добавлена позже — пока ведет на секцию контактов / заглушку
      url: "#contacts",
      placeholderNote: "Ссылка на Instagram будет обновлена",
    },
  },

  // Навигация в шапке (Sticky Header)
  navItems: [
    { label: "О проекте", href: "#about" },
    { label: "Обучение", href: "#education" },
    { label: "Сигналы и Прогнозы", href: "#signals" },
    { label: "Обзор рынка", href: "#market-review" },
    { label: "Контакты", href: "#contacts" },
  ],

  // Блок 2: Первый экран (Hero Section)
  hero: {
    badge: "FOREX & CRYPTO TRADING ACADEMY • 17+ ЛЕТ ОПЫТА",
    animatedTitle: "Добро пожаловать на наш сайт ForexTraining Life",
    subtitle:
      "Профессиональный трейдинг на рынках Forex и Криптовалют. Системный подход к анализу рыночной структуры, опционов и уровней ликвидности. Обучение осознанной торговле без иллюзий и доступ к ежедневным прогнозам и торговым сигналам.",
    primaryCta: {
      label: "Получать сигналы в Telegram",
      href: "https://t.me/InfoForexTrainingLife",
    },
    secondaryCta: {
      label: "Смотреть обзор рынка",
      href: "#market-review",
    },
    highlights: [
      { label: "Фокус рынка", value: "XAU/USD • Forex • Crypto" },
      { label: "Методология", value: "Опционы + Техническая картина" },
      { label: "Аналитика", value: "Еженедельные и дневные разборы" },
    ],
  },

  // Бегущая строка котировок (Ticker Tape)
  tickers: [
    {
      symbol: "XAU/USD",
      name: "Золото / Доллар США",
      price: "2,718.45",
      change: "+1.42%",
      isPositive: true,
      isGold: true,
    },
    {
      symbol: "EUR/USD",
      name: "Евро / Доллар США",
      price: "1.0548",
      change: "+0.28%",
      isPositive: true,
      isGold: false,
    },
    {
      symbol: "GBP/USD",
      name: "Фунт / Доллар США",
      price: "1.2694",
      change: "-0.19%",
      isPositive: false,
      isGold: false,
    },
    {
      symbol: "BTC/USDT",
      name: "Bitcoin / Tether",
      price: "96,420.00",
      change: "+3.85%",
      isPositive: true,
      isGold: false,
    },
    {
      symbol: "ETH/USDT",
      name: "Ethereum / Tether",
      price: "3,485.60",
      change: "+2.14%",
      isPositive: true,
      isGold: false,
    },
    {
      symbol: "WTI OIL",
      name: "Нефть WTI",
      price: "69.85",
      change: "-0.64%",
      isPositive: false,
      isGold: false,
    },
  ],

  // Блок 3: Об авторе и истории проекта («17 лет в рынке»)
  about: {
    badge: "ЭКСПЕРТИЗА И ИСТОРИЯ ПРОЕКТА",
    title: "17 лет в рынке: системный трейдинг без иллюзий",
    subtitle:
      "От первых сделок на классическом валютном рынке до создания авторской методологии анализа ликвидности, опционных уровней и риск-менеджмента.",
    authorPhotoPath: "/author-placeholder.jpg",
    authorName: "Основатель ForexTraining Life",
    authorRole: "Трейдер-практик • Аналитик Forex & Crypto",
    storyParagraphs: [
      "Трейдер-практик с 17-летним опытом реальной торговли на финансовых рынках (Forex, металлы XAU/USD, нефть WTI и Криптовалюты).",
      "За годы работы пройден полный путь от классического технического анализа до создания собственной торговой системы, объединяющей рыночную структуру, зоны ликвидности, опционный анализ и строгий математический контроль рисков.",
      "Сегодня проект ForexTraining Life — это авторский YouTube-канал с регулярными еженедельными и ежедневными обзорами рынка, а также Telegram-сообщество трейдеров с торговыми идеями, сигналами и практическим обучением.",
    ],
    counters: [
      { value: "17+", label: "Лет практики в рынке", accent: "gold" },
      { value: "Forex & Crypto", label: "Ключевые рынки и XAU/USD", accent: "green" },
      { value: "Weekly & Daily", label: "Еженедельные видеоразборы", accent: "green" },
      { value: "24/7", label: "Поддержка Telegram-комьюнити", accent: "gold" },
    ],
  },

  // Блок 4: Направления работы (Обучение + Сигналы и Прогнозы)
  services: {
    badge: "НАПРАВЛЕНИЯ РАБОТЫ",
    title: "Комплексная экосистема для трейдера",
    subtitle:
      "Два ключевых направления по модели закрытого клуба: фундаментальное обучение пониманию рынка и ежедневная практическая работа по сигналам.",
    education: {
      tag: "АКАДЕМИЯ ТРЕЙДИНГА",
      title: "Обучение системному трейдингу",
      description:
        "Структурированная программа подготовки для тех, кто хочет самостоятельно читать график, понимать логику крупного игрока и торговать с математическим перевесом.",
      modules: [
        "Анализ рыночной структуры и определение истинного тренда",
        "Уровни ликвидности, опционные зоны и баланс спроса/предложения",
        "Специфика работы с золотом (XAU/USD), мажорами Forex и нефтью WTI",
        "Криптовалютный рынок (BTC, ETH, альткоины): спот и фьючерсы",
        "Профессиональный риск-менеджмент и психология дисциплины",
      ],
      formats: [
        "Пошаговые видеоуроки без воды",
        "Проверка и разбор домашних заданий на реальных графиках",
        "Живые сессии вопросов-ответов и разбор ошибок",
      ],
      ctaLabel: "Узнать об обучении в Telegram",
      ctaHref: "https://t.me/InfoForexTrainingLife",
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
      ctaHref: "https://t.me/InfoForexTrainingLife",
      // Визуальный мокап поста с сигналом из Telegram
      sampleSignal: {
        channelName: "ForexTraining Life | Сигналы & Аналитика",
        handle: "@InfoForexTrainingLife",
        time: "Сегодня, 10:15 МСК",
        pair: "XAU/USD (GOLD)",
        direction: "BUY LIMIT / LONG",
        entry: "2,708.50 – 2,711.00",
        stopLoss: "2,698.00",
        takeProfit1: "2,724.00",
        takeProfit2: "2,738.50",
        riskReward: "1 : 3.2",
        comment:
          "Захват ликвидности под зоной опционного баланса D1 + реакция на блок заказов H1. При достижении TP1 фиксируем 50% объема и переводим сделку в БУ.",
        status: "TP1 ДОСТИГНУТ (+145 пунктов) • Сделка в безубытке",
      },
    },
  },

  // Блок 5: Обзор рынка (Видео-хаб с YouTube) — 4 свежих видео по умолчанию + автообновление по RSS
  marketReviews: {
    badge: "YOUTUBE ВИДЕО-ХАБ • АВТООБНОВЛЕНИЕ",
    title: "Обзор рынка и аналитика на YouTube",
    subtitle:
      "Свежие видеоролики подтягиваются автоматически с официального канала @forextraininglife. Нажмите на любой выпуск, чтобы открыть разбор на YouTube.",
    channelUrl: "https://www.youtube.com/@forextraininglife",
    // Реальные свежие видео с канала @forextraininglife (используются как мгновенный SSR/фоллбэк до ответа RSS)
    initialVideos: [
      {
        id: "8GDkHcS_3cw",
        title:
          "Обзор рынка с 23.11.2026-29.11.2026. Обзор основных инструментов рынка. Опционы + техническая картина!",
        publishedAt: "2026-11-23T20:26:19+00:00",
        thumbnail: "https://i.ytimg.com/vi/8GDkHcS_3cw/hqdefault.jpg",
        url: "https://www.youtube.com/watch?v=8GDkHcS_3cw",
        views: "261",
        badge: "ЕЖЕНЕДЕЛЬНЫЙ ОБЗОР",
      },
      {
        id: "yuew83ykmHo",
        title: "Золото #XAUUSD — Разбор текущей ситуации, уровни ликвидности и сценарий движения",
        publishedAt: "2026-11-25T12:51:29+00:00",
        thumbnail: "https://i.ytimg.com/vi/yuew83ykmHo/hqdefault.jpg",
        url: "https://www.youtube.com/watch?v=yuew83ykmHo",
        views: "71",
        badge: "XAU/USD GOLD",
      },
      {
        id: "nt6QhNepGEU",
        title: "Актуальный разбор рынка и точек входа #трейдинг — ForexTraining Life",
        publishedAt: "2026-11-24T09:53:11+00:00",
        thumbnail: "https://i.ytimg.com/vi/nt6QhNepGEU/hqdefault.jpg",
        url: "https://www.youtube.com/watch?v=nt6QhNepGEU",
        views: "61",
        badge: "ТОРГОВЫЙ ПЛАН",
      },
      {
        id: "kILSqACsuvg",
        title:
          "Обзор рынка с 16.11.2026-22.11.2026. Обзор основных инструментов рынка. Опционы + техническая картина!",
        publishedAt: "2026-11-16T22:24:42+00:00",
        thumbnail: "https://i.ytimg.com/vi/kILSqACsuvg/hqdefault.jpg",
        url: "https://www.youtube.com/watch?v=kILSqACsuvg",
        views: "288",
        badge: "ЕЖЕНЕДЕЛЬНЫЙ ОБЗОР",
      },
    ] as YouTubeVideoItem[],
  },

  // Блок 6: Форматы участия (скрыт при features.showPricing = false, готов к включению в любой момент)
  pricing: {
    badge: "ФОРМАТЫ УЧАСТИЯ",
    title: "Выберите свой формат работы",
    subtitle: "От бесплатной открытой аналитики до полного индивидуального наставничества.",
    plans: [
      {
        name: "Бесплатный старт (Free)",
        tag: "ОТКРЫТЫЙ ДОСТУП",
        description: "Для знакомства с методологией, стилем анализа и еженедельными обзорами рынка.",
        features: [
          "Доступ к открытому Telegram-каналу @InfoForexTrainingLife",
          "Базовые торговые прогнозы и рыночные заметки",
          "Еженедельные видеообзоры на YouTube-канале",
        ],
        ctaLabel: "Подписаться бесплатно",
        ctaHref: "https://t.me/InfoForexTrainingLife",
        highlighted: false,
      },
      {
        name: "Клуб Сигналов и Аналитики",
        tag: "VIP TELEGRAM",
        description: "Закрытый канал с ежедневными точками входа по Forex, XAU/USD и Криптовалютам.",
        features: [
          "Ежедневные торговые сигналы (Entry, Stop-Loss, Take-Profit)",
          "Подробные разборы сделок и опционных уровней",
          "Оперативные корректировки и сопровождение в реальном времени",
        ],
        ctaLabel: "Вступить в VIP-клуб",
        ctaHref: "https://t.me/InfoForexTrainingLife",
        highlighted: true,
      },
      {
        name: "Полное Обучение + Наставничество",
        tag: "PRO ACADEMY",
        description: "Полная передача торговой системы с личной проверкой домашних заданий.",
        features: [
          "Полный доступ ко всем видеоурокам и методическим материалам",
          "Закрытый чат учеников и живые Q&A сессии с разбором графиков",
          "Доступ к VIP-каналу с сигналами на время обучения",
        ],
        ctaLabel: "Записаться на обучение",
        ctaHref: "https://t.me/InfoForexTrainingLife",
        highlighted: false,
      },
    ],
  },

  // Блок 7: Дисклеймер и подвал
  footer: {
    copyright: `© ${new Date().getFullYear()} ForexTraining Life. Все права защищены.`,
    riskDisclaimer:
      "Предупреждение о рисках: Торговля на финансовых рынках (Forex, контракты на разницу цен CFD, металлы XAU/USD и криптовалюты) сопряжена с высоким уровнем риска и может подходить не всем инвесторам. Высокое кредитное плечо может работать как в вашу пользу, так и против вас. Все материалы, видеообзоры, прогнозы и сигналы, представленные на сайте ForexTraining Life, в Telegram-канале @InfoForexTrainingLife и на YouTube-канале @forextraininglife, носят исключительно информационный, аналитический и образовательный характер и не являются индивидуальной инвестиционной рекомендацией.",
  },
};
