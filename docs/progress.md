# Прогресс разработки — ForexTraining Life (`D:\Projects\forex-training-life`)

## Выполнено
- [x] **Этап 1. Подготовка структуры проекта и документации `docs/` на диске `D:`**
  - Папка проекта: `D:\Projects\forex-training-life`.
  - Полное Техническое Задание сохранено в `docs/tz.md`.
  - Настроены `.gitignore` (закрыты `.env*`, сертификаты `*.pem`, `*.key`, `*.crt`, `docs/private/`) и `GEMINI.md`.

- [x] **Этап 2. Получение логотипа с YouTube `@forextraininglife`, генерация иконок PWA и инициализация проекта на диске `D:`**
  - Инициализирован Git-репозиторий (`git init`).
  - Скачан официальный логотип YouTube-канала `@forextraininglife` и сгенерирован комплект PWA-иконок (`192x192`, `512x512`, `apple-touch-icon`, `favicon.png`).
  - Получен `channelId` YouTube-канала (`UCmlM0-hINj2rtKMa0kbzmUg`).
  - Установлены `next`, `react`, `framer-motion`, `lucide-react`, `tailwindcss` на диске `D:`.

- [x] **Этап 3. Создание `src/config/siteConfig.ts`, API автообновления YouTube и PWA-инфраструктуры**
  - Создан единый конфиг `src/config/siteConfig.ts` (Telegram, YouTube, Instagram в контактах, `showAuthorPhoto: false`, `showPricing: false`).
  - Создан API-маршрут `src/app/api/youtube/route.ts` для автоподгрузки 4 свежих видео из RSS YouTube-канала.
  - Созданы `public/manifest.json`, `public/sw.js` и `src/context/PWAInstallContext.tsx`.

- [x] **Этап 4. Разработка вступительной заставки `src/components/IntroPreloader.tsx`**
  - Полноэкранная заставка (`100vw x 100vh`) на темном фоне `#0B0E14` с логотипом YouTube-канала, живым графиком `XAU/USD`, стрелками роста/падения, столкновением Быка и Медведя и кнопкой «Пропустить».

- [x] **Этап 5. Разработка `src/components/Navbar.tsx` и `src/components/HeroAnimated.tsx`**
  - Фиксированная шапка `Navbar.tsx` (логотип, меню, Telegram, YouTube, Instagram, кнопка «Установить приложение»).
  - Первый экран `HeroAnimated.tsx` (периодическая побуквенная анимация заголовка, CTA, аналитический терминал `XAU/USD`, панель котировок `Ticker Tape`).

- [x] **Этап 6. Разработка `src/components/AboutTrader.tsx` и `src/components/ServicesSection.tsx`**
  - Секция «17 лет в рынке» (`AboutTrader.tsx`) со счетчиками (`17+ лет`, `Forex & Crypto`, `Weekly & Daily`, `24/7`) и скрытым слотом фото автора (`showAuthorPhoto: false`).
  - Секция направлений работы (`ServicesSection.tsx`): карточка «Обучение системному трейдингу» + карточка «Telegram-канал с прогнозами и сигналами» с мокапом сделки `XAU/USD` (`Entry`, `Stop-Loss`, `Take-Profit 1/2`).

- [x] **Этап 7. Разработка `src/components/WeeklyReviews.tsx`, `src/components/PricingCards.tsx` и `src/components/Footer.tsx`**
  - Вкладка «Обзор рынка» (`WeeklyReviews.tsx`) внизу страницы: 4 карточки в стиле YouTube с HD-обложками, автоматической синхронизацией новых видео с канала `@forextraininglife` и переходом на YouTube при нажатии.
  - Компонент `PricingCards.tsx` (скрыт флагом `showPricing: false` до решения заказчика).
  - Подвал и контакты `Footer.tsx`: карточки Telegram, YouTube и Instagram, блок установки PWA на iOS/Android и дисклеймер о рисках.

- [x] **Этап 8. Защита от спам-ботов, SSL/DNS заголовки, сборка и публикация в GitHub**
  - Настроены `src/lib/rate-limit.ts`, `src/middleware.ts`, `public/robots.txt` и заголовки безопасности (`Strict-Transport-Security`, `X-DNS-Prefetch-Control`, `X-Frame-Options`, `X-Content-Type-Options`) в `next.config.ts`.
  - Собраны `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`.
