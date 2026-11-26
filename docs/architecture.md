# Архитектура и стек технологий — ForexTraining Life (`D:\Projects\forex-training-life`)

## 1. Стек технологий
- **Фреймворк**: Next.js (App Router, TypeScript), React.
- **Стилизация**: Tailwind CSS (Dark Mode Fintech палитра: `#0B0E14`, `#111622`, `#00E676`, `#FF3D57`, `#F5B041`).
- **Анимации**: Framer Motion (staggered-анимация букв заголовка, переходы секций) + HTML5 Canvas / SVG (анимация свечного графика `XAU/USD`, стрелок тренда и столкновения Быка и Медведя).
- **Иконки**: `lucide-react` + кастомные SVG (Бык, Медведь, Telegram, YouTube).
- **Видео-хаб YouTube**: API роут `/api/youtube` (парсинг официального RSS-фида YouTube-канала `@forextraininglife` с фоллбэком на конфиг в `siteConfig.ts`).
- **PWA**: `public/manifest.json`, `public/sw.js` (кэширование статики и офлайн-оболочка), `PWAInstallContext` (перехват `beforeinstallprompt` для Android/Desktop и модальное окно с инструкцией «На экран Домой» для iOS Safari).

## 2. Структура файлов проекта
```text
D:\Projects\forex-training-life\
├── GEMINI.md                        # Глобальные правила работы (только диск D:, работа через docs/)
├── .gitignore                       # Защита секретов (.env*, docs/private/, ключи)
├── docs/                            # Документация проекта для экономии токенов
│   ├── tz.md                        # Полное техническое задание (7 блоков + Preloader + PWA)
│   ├── architecture.md              # Архитектура, стек и дерево файлов
│   ├── progress.md                  # Чеклист прогресса по этапам ТЗ
│   ├── doc.md                       # Шпаргалка по командам запуска, сборки и деплоя
│   ├── imgs/                        # Исходники логотипа YouTube и графических материалов
│   └── private/                     # Приватные заметки/ключи (в .gitignore!)
├── public/
│   ├── manifest.json                # Манифест PWA (ForexTraining Life / FTL Trading)
│   ├── sw.js                        # Service Worker для кэширования и офлайн-доступа
│   ├── logo.png                     # Официальный логотип с YouTube-канала
│   └── icons/
│       ├── icon-192x192.png         # Иконка PWA 192x192
│       ├── icon-512x512.png         # Иконка PWA 512x512
│       └── apple-touch-icon.png     # Иконка для iOS Safari (180x180)
└── src/
    ├── config/
    │   └── siteConfig.ts            # Единый конфиг: тексты, ссылки, тарифы, видео, showAuthorPhoto: false
    ├── context/
    │   └── PWAInstallContext.tsx    # Логика установки PWA (Android/Desktop prompt + iOS Safari модалка)
    ├── components/
    │   ├── IntroPreloader.tsx       # Полноэкранная заставка: график XAU/USD, стрелки, Бык vs Медведь
    │   ├── Navbar.tsx               # Sticky Header с логотипом, меню, соцсетями и кнопкой PWA
    │   ├── HeroAnimated.tsx         # Первый экран с побуквенной анимацией, CTA и Ticker Tape котировок
    │   ├── AboutTrader.tsx          # Секция «17 лет в рынке», счетчики и скрытый слот фото автора
    │   ├── WeeklyReviews.tsx        # Видео-хаб с YouTube (@forextraininglife): главный плеер + 3 выпуска
    │   ├── ServicesSection.tsx      # Обучение трейдингу + Сигналы Telegram (с мокапом сигнала XAU/USD)
    │   ├── PricingCards.tsx         # 3 тарифные карточки (Free, VIP Сигналы, Обучение + Наставничество)
    │   └── Footer.tsx               # Подвал с логотипом, кнопкой установки PWA и дисклеймером о рисках
    └── app/
        ├── layout.tsx               # Корневой layout с метаданными, шрифтами и регистрацией PWA
        ├── page.tsx                 # Главная страница, объединяющая все блоки
        ├── globals.css              # Глобальные стили и цветовые переменные (#0B0E14, #00E676 и др.)
        └── api/
            └── youtube/route.ts     # Автоматическая подтяжка свежих видео с YouTube-канала
```
