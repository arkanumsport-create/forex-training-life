import { NextResponse } from "next/server";
import { siteConfig, YouTubeVideoItem } from "@/config/siteConfig";

export const revalidate = 600; // Кэширование на 10 минут + автообновление при новых видео

function decodeXmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function formatVideoTitle(rawTitle: string): { title: string; badge: string } {
  const clean = decodeXmlEntities(rawTitle).trim();
  const lower = clean.toLowerCase();

  if (lower.includes("обзор рынка")) {
    return { title: clean, badge: "ЕЖЕНЕДЕЛЬНЫЙ ОБЗОР" };
  }
  if (lower.includes("xauusd") || lower.includes("золото") || lower.includes("gold")) {
    const enhanced =
      clean.length <= 15
        ? `Золото XAU/USD (${clean}) — Техническая картина и торговый план`
        : clean;
    return { title: enhanced, badge: "XAU/USD GOLD" };
  }
  if (lower.includes("wti") || lower.includes("oil") || lower.includes("нефть")) {
    const enhanced =
      clean.length <= 15
        ? `Нефть WTI (${clean}) — Разбор уровней и сценарий движения`
        : clean;
    return { title: enhanced, badge: "WTI OIL" };
  }
  if (clean.length <= 18) {
    return {
      title: `Разбор рынка и торговых инструментов (${clean}) — ForexTraining Life`,
      badge: "ОБЗОР РЫНКА",
    };
  }
  return { title: clean, badge: "АНАЛИТИКА РЫНКА" };
}

export async function GET() {
  const channelId = siteConfig.socials.youtube.channelId;
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

  try {
    const response = await fetch(rssUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      throw new Error(`YouTube RSS responded with ${response.status}`);
    }

    const xml = await response.text();
    const entries = xml.split("<entry>").slice(1);

    const videos: YouTubeVideoItem[] = [];

    for (const entry of entries) {
      const videoIdMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
      const titleMatch = entry.match(/<title>([^<]+)<\/title>/);
      const publishedMatch = entry.match(/<published>([^<]+)<\/published>/);
      const viewsMatch = entry.match(/views="(\d+)"/);

      if (videoIdMatch && titleMatch) {
        const id = videoIdMatch[1].trim();
        const { title, badge } = formatVideoTitle(titleMatch[1]);
        const publishedAt = publishedMatch ? publishedMatch[1].trim() : new Date().toISOString();
        const views = viewsMatch ? viewsMatch[1] : undefined;

        videos.push({
          id,
          title,
          publishedAt,
          thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          url: `https://www.youtube.com/watch?v=${id}`,
          views,
          badge,
        });
      }

      if (videos.length >= 4) break;
    }

    if (videos.length === 0) {
      return NextResponse.json({
        videos: siteConfig.marketReviews.initialVideos.slice(0, 4),
        source: "fallback",
      });
    }

    return NextResponse.json({
      videos,
      source: "youtube-rss",
      updatedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({
      videos: siteConfig.marketReviews.initialVideos.slice(0, 4),
      source: "fallback",
    });
  }
}
