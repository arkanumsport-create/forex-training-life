# Шпаргалка по командам, DNS, SSL и безопасности — ForexTraining Life

## 1. Пути и окружение на диске `D:`
- **Директория проекта**: `D:\Projects\forex-training-life`
- **Node.js**: `D:\Programs\nodejs`
- **Кэш npm**: `D:\Programs\nodejs\npm-cache`

## 2. Основные команды разработки
```powershell
cd D:\Projects\forex-training-life
npm run typecheck    # Проверка типов TypeScript (tsc --noEmit)
npm run dev          # Запуск локального сервера (http://localhost:3000)
npm run build        # Продакшен-сборка Next.js
```

## 3. Быстрое редактирование контента (`src/config/siteConfig.ts`)
- **Добавить ссылку на Instagram**: откройте `src/config/siteConfig.ts` и в блоке `socials.instagram.url` замените `"#contacts"` на реальную ссылку.
- **Включить фото автора**: положите фото в `public/author-placeholder.jpg` и поменяйте `features.showAuthorPhoto` на `true`.
- **Включить блок «Тарифы и цены»**: поменяйте `features.showPricing` на `true`.

## 4. Настройка DNS, SSL-сертификатов и защита от спам-ботов
1. **Защита от спам-ботов и сканеров (`src/middleware.ts` + `src/lib/rate-limit.ts` + `public/robots.txt`)**:
   - Автоматическая блокировка (`403 Forbidden`) обращений к `/wp-admin`, `/.env`, `/xmlrpc.php`, `/phpmyadmin` и агрессивных спам-краулеров (`AhrefsBot`, `SemrushBot`, `MJ12bot`, `PetalBot`, `Bytespider`, `sqlmap`, `nikto`, `masscan`).
   - Sliding-Window Rate Limiting для `/api/*` (максимум 30 запросов в минуту с одного IP, при превышении — `429 Too Many Requests`).
2. **SSL/TLS Сертификаты и HTTPS (HSTS)**:
   - В `next.config.ts` и `src/middleware.ts` прописан заголовок `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `X-DNS-Prefetch-Control: on`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`.
   - При деплое на Vercel / Cloudflare SSL-сертификат Let's Encrypt выпускается и продлевается автоматически.
3. **DNS-записи при подключении кастомного домена**:
   - `A` запись (`@`) -> `76.76.21.21` (Vercel)
   - `CNAME` запись (`www`) -> `cname.vercel-dns.com.`
   - `CAA` запись (`@`) -> `0 issue "letsencrypt.org"`
   - Все приватные DNS-токены и ключи хранить только в `docs/private/` (в `.gitignore`).

## 5. Безопасный коммит в GitHub
Перед каждым коммитом обязательно проверять `git status --short`, чтобы `.env*` и `docs/private/` не попали в репозиторий:
```powershell
cd D:\Projects\forex-training-life
git status --short
```
