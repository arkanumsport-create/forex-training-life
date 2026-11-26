"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Youtube, Play, ExternalLink, RefreshCw, Calendar, Eye } from "lucide-react";
import { siteConfig, YouTubeVideoItem, assetPath } from "@/config/siteConfig";
import { useAppSettings } from "@/context/AppSettingsContext";
import { getT } from "@/config/translations";

function formatPublishDate(isoDate: string, lang: "ru" | "en"): string {
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString(lang === "ru" ? "ru-RU" : "en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return lang === "ru" ? "Свежий выпуск" : "New release";
  }
}

function enhanceVideoTitle(
  rawTitle: string,
  lang: "ru" | "en"
): { title: string; badge: string } {
  const clean = rawTitle.trim();
  const lower = clean.toLowerCase();

  if (lower.includes("обзор рынка")) {
    return {
      title: clean,
      badge: lang === "ru" ? "ЕЖЕНЕДЕЛЬНЫЙ ОБЗОР" : "WEEKLY REVIEW",
    };
  }
  if (lower.includes("xauusd") || lower.includes("золото") || lower.includes("gold")) {
    const enhanced =
      clean.length <= 15
        ? lang === "ru"
          ? `Золото XAU/USD (${clean}) — Техническая картина и торговый план`
          : `XAU/USD Gold (${clean}) — Technical Picture & Trading Plan`
        : clean;
    return { title: enhanced, badge: "XAU/USD GOLD" };
  }
  if (lower.includes("wti") || lower.includes("oil") || lower.includes("нефть")) {
    const enhanced =
      clean.length <= 15
        ? lang === "ru"
          ? `Нефть WTI (${clean}) — Разбор уровней и сценарий движения`
          : `WTI Oil (${clean}) — Key Levels & Scenario`
        : clean;
    return { title: enhanced, badge: "WTI OIL" };
  }
  if (clean.length <= 18) {
    return {
      title:
        lang === "ru"
          ? `Разбор рынка и торговых инструментов (${clean}) — ForexTraining Life`
          : `Market Analysis & Setups (${clean}) — ForexTraining Life`,
      badge: lang === "ru" ? "ОБЗОР РЫНКА" : "MARKET REVIEW",
    };
  }
  return {
    title: clean,
    badge: lang === "ru" ? "АНАЛИТИКА РЫНКА" : "MARKET ANALYTICS",
  };
}

function parseYouTubeXml(xmlText: string, lang: "ru" | "en"): YouTubeVideoItem[] {
  const entries = xmlText.split("<entry>").slice(1);
  const parsed: YouTubeVideoItem[] = [];

  for (const entry of entries) {
    const idMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const titleMatch = entry.match(/<title>([^<]+)<\/title>/);
    const pubMatch = entry.match(/<published>([^<]+)<\/published>/);
    const viewsMatch = entry.match(/views="(\d+)"/);

    if (idMatch && titleMatch) {
      const id = idMatch[1].trim();
      const rawTitle = titleMatch[1]
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      const { title, badge } = enhanceVideoTitle(rawTitle, lang);
      parsed.push({
        id,
        title,
        publishedAt: pubMatch ? pubMatch[1].trim() : new Date().toISOString(),
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${id}`,
        views: viewsMatch ? viewsMatch[1] : undefined,
        badge,
      });
    }
    if (parsed.length >= 4) break;
  }

  return parsed;
}

export default function WeeklyReviews() {
  const { lang } = useAppSettings();
  const t = getT(lang);

  const [videos, setVideos] = useState<YouTubeVideoItem[]>(
    siteConfig.marketReviews.initialVideos.slice(0, 4)
  );
  const [isSyncing, setIsSyncing] = useState(false);

  // Тройная надежная автосинхронизация свежих видео с YouTube-канала @forextraininglife
  const fetchLatestVideos = useCallback(async () => {
    const channelId = siteConfig.socials.youtube.channelId;
    const rawRssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    setIsSyncing(true);

    try {
      // 1. Локальный API роут (для Vercel / Node-сервера)
      if (!siteConfig.basePath) {
        try {
          const res = await fetch("/api/youtube", { cache: "no-store" });
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data.videos) && data.videos.length > 0) {
              setVideos(data.videos.slice(0, 4));
              return;
            }
          }
        } catch {}
      }

      // 2. Прямой XML YouTube RSS через CORS-прокси allorigins (дает точные просмотры + мгновенно свежие видео)
      try {
        const xmlRes = await fetch(
          `https://api.allorigins.win/raw?url=${encodeURIComponent(rawRssUrl)}`,
          { cache: "no-store" }
        );
        if (xmlRes.ok) {
          const xmlText = await xmlRes.text();
          const parsed = parseYouTubeXml(xmlText, lang);
          if (parsed.length > 0) {
            setVideos(parsed);
            return;
          }
        }
      } catch {}

      // 3. Резервный канал через rss2json
      try {
        const rssRes = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rawRssUrl)}`,
          { cache: "no-store" }
        );
        if (rssRes.ok) {
          const data = await rssRes.json();
          if (Array.isArray(data.items) && data.items.length > 0) {
            const mapped: YouTubeVideoItem[] = data.items.slice(0, 4).map(
              (item: {
                guid?: string;
                link?: string;
                title?: string;
                pubDate?: string;
              }) => {
                const vidFromGuid = item.guid ? item.guid.split(":").pop() : "";
                const vidFromLink = item.link ? item.link.split("v=").pop() : "";
                const id = (vidFromGuid || vidFromLink || "8GDkHcS_3cw").trim();
                const { title, badge } = enhanceVideoTitle(
                  item.title || "Market Review",
                  lang
                );
                return {
                  id,
                  title,
                  publishedAt: item.pubDate || new Date().toISOString(),
                  thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
                  url: `https://www.youtube.com/watch?v=${id}`,
                  badge,
                };
              }
            );
            if (mapped.length > 0) {
              setVideos(mapped);
            }
          }
        }
      } catch {}
    } finally {
      setIsSyncing(false);
    }
  }, [lang]);

  useEffect(() => {
    fetchLatestVideos();
    // Автоматически перепроверяем появление новых роликов на YouTube каждые 5 минут
    const interval = setInterval(fetchLatestVideos, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchLatestVideos]);

  return (
    <section
      id="market-review"
      className="relative overflow-hidden bg-slate-50 dark:bg-[#0B0E14] py-16 sm:py-24 border-b border-slate-200 dark:border-white/5 transition-colors"
    >
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-rose-500/10 dark:bg-[#FF3D57]/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/40 dark:border-[#FF3D57]/30 bg-white dark:bg-[#111622] px-3.5 py-1 text-xs font-bold tracking-wider text-rose-600 dark:text-[#FF3D57] shadow-sm">
              <Youtube className="h-4 w-4" />
              <span>{t.reviews.badge}</span>
              <button
                onClick={fetchLatestVideos}
                title={lang === "ru" ? "Обновить список видео" : "Refresh videos"}
                className="ml-1 rounded-full p-0.5 hover:bg-rose-500/10 cursor-pointer"
              >
                <RefreshCw
                  className={`h-3 w-3 text-amber-500 ${isSyncing ? "animate-spin" : ""}`}
                />
              </button>
            </div>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {t.reviews.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {t.reviews.subtitle}
            </p>
          </div>

          <a
            href={siteConfig.socials.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-600 dark:bg-[#FF3D57]/20 px-5 py-3 text-xs sm:text-sm font-extrabold text-white hover:bg-rose-700 dark:hover:bg-[#FF3D57] transition shrink-0 shadow-md"
          >
            <Youtube className="h-4 w-4" />
            <span>YouTube {siteConfig.socials.youtube.handle}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* 4 свежих видеокарточки в стиле YouTube с обложкой и переходом на YouTube */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((video, index) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111622] shadow-md dark:shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-500/60 dark:hover:border-[#F5B041]/50 hover:shadow-xl"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                <div className="absolute left-3 top-3 flex items-center gap-1.5">
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-extrabold tracking-wider shadow ${
                      index === 0
                        ? "bg-[#00E676] text-[#0B0E14]"
                        : "bg-black/80 text-[#F5B041] border border-[#F5B041]/40"
                    }`}
                  >
                    {index === 0 ? t.reviews.newBadge : video.badge || t.reviews.defaultBadge}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-16 items-center justify-center rounded-xl bg-[#FF0000]/90 text-white shadow-[0_0_25px_rgba(255,0,0,0.5)] transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-6 w-6 fill-white ml-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded bg-black/85 px-2 py-0.5 text-[10px] font-semibold text-white">
                  <span>{t.reviews.watchOnYoutube}</span>
                  <ExternalLink className="h-2.5 w-2.5 text-[#F5B041]" />
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-4">
                <div className="flex items-start gap-3">
                  <img
                    src={assetPath("/logo.png")}
                    alt={siteConfig.name}
                    className="h-9 w-9 shrink-0 rounded-full border border-[#F5B041]/50 object-cover mt-0.5"
                  />
                  <div>
                    <h3 className="line-clamp-2 text-sm font-bold leading-snug text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-[#F5B041] transition-colors">
                      {video.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                      {siteConfig.name}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-200 dark:border-white/5 pt-3 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-amber-600 dark:text-[#F5B041]" />
                    {formatPublishDate(video.publishedAt, lang)}
                  </span>
                  {video.views && (
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5 text-emerald-600 dark:text-[#00E676]" />
                      {video.views} {t.reviews.viewsSuffix}
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
