"use client";

import React, { useEffect, useState } from "react";
import { Youtube, Play, ExternalLink, RefreshCw, Calendar, Eye } from "lucide-react";
import { siteConfig, YouTubeVideoItem } from "@/config/siteConfig";

function formatPublishDate(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "Свежий выпуск";
  }
}

export default function WeeklyReviews() {
  const [videos, setVideos] = useState<YouTubeVideoItem[]>(
    siteConfig.marketReviews.initialVideos.slice(0, 4)
  );
  const [isSyncing, setIsSyncing] = useState(false);

  // Автоматическая подтяжка 4 самых свежих видео с YouTube-канала @forextraininglife
  useEffect(() => {
    let active = true;
    const fetchLatestVideos = async () => {
      setIsSyncing(true);
      try {
        const res = await fetch("/api/youtube");
        if (!res.ok) return;
        const data = await res.json();
        if (active && Array.isArray(data.videos) && data.videos.length > 0) {
          setVideos(data.videos.slice(0, 4));
        }
      } catch {
        // Оставляем initialVideos из siteConfig
      } finally {
        if (active) setIsSyncing(false);
      }
    };

    fetchLatestVideos();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="market-review"
      className="relative overflow-hidden bg-[#0B0E14] py-16 sm:py-24 border-b border-white/5"
    >
      {/* Фоновое свечение */}
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-[#FF3D57]/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Шапка блока Обзор рынка */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FF3D57]/30 bg-[#111622] px-3.5 py-1 text-xs font-bold tracking-wider text-[#FF3D57]">
              <Youtube className="h-4 w-4" />
              <span>{siteConfig.marketReviews.badge}</span>
              {isSyncing && <RefreshCw className="h-3 w-3 animate-spin text-[#F5B041]" />}
            </div>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
              {siteConfig.marketReviews.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-400">
              {siteConfig.marketReviews.subtitle}
            </p>
          </div>

          <a
            href={siteConfig.socials.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[#FF3D57]/40 bg-[#FF3D57]/15 px-5 py-3 text-xs sm:text-sm font-extrabold text-white hover:bg-[#FF3D57] transition shrink-0"
          >
            <Youtube className="h-4 w-4" />
            <span>YouTube {siteConfig.socials.youtube.handle}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Сетка из 4 свежих видеокарточек в макете YouTube (с обложкой и переходом на YouTube при нажатии) */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((video, index) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111622] shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F5B041]/50 hover:shadow-[0_12px_35px_rgba(0,0,0,0.75)]"
            >
              {/* Обложка видео в формате YouTube 16:9 */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#0B0E14]">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Градиент поверх обложки */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14]/90 via-black/20 to-transparent" />

                {/* Верхний бейдж */}
                <div className="absolute left-3 top-3 flex items-center gap-1.5">
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-extrabold tracking-wider shadow ${
                      index === 0
                        ? "bg-[#00E676] text-[#0B0E14]"
                        : "bg-[#0B0E14]/85 text-[#F5B041] border border-[#F5B041]/40"
                    }`}
                  >
                    {index === 0 ? "НОВЫЙ ВЫПУСК" : video.badge || "ОБЗОР РЫНКА"}
                  </span>
                </div>

                {/* Центральная кнопка YouTube Play */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-16 items-center justify-center rounded-xl bg-[#FF0000]/90 text-white shadow-[0_0_25px_rgba(255,0,0,0.5)] transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-6 w-6 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Подпись «Смотреть на YouTube» внизу обложки */}
                <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded bg-black/80 px-2 py-0.5 text-[10px] font-semibold text-white">
                  <span>YouTube</span>
                  <ExternalLink className="h-2.5 w-2.5 text-[#F5B041]" />
                </div>
              </div>

              {/* Описание карточки в стиле YouTube: аватар канала + заголовок + метаданные */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div className="flex items-start gap-3">
                  <img
                    src="/logo.png"
                    alt={siteConfig.name}
                    className="h-9 w-9 shrink-0 rounded-full border border-[#F5B041]/40 object-cover mt-0.5"
                  />
                  <div>
                    <h3 className="line-clamp-2 text-sm font-bold leading-snug text-white group-hover:text-[#F5B041] transition-colors">
                      {video.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-slate-400">
                      {siteConfig.name}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-[#F5B041]" />
                    {formatPublishDate(video.publishedAt)}
                  </span>
                  {video.views && (
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5 text-[#00E676]" />
                      {video.views} просм.
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
