import type { NextRequest } from "next/server";

interface RateBucket {
  timestamps: number[];
}

const memoryBuckets = new Map<string, RateBucket>();

// Сигнатуры агрессивных спам-ботов, скрейперов и сканеров уязвимостей
const SPAM_BOT_PATTERNS: RegExp[] = [
  /ahrefsbot/i,
  /semrushbot/i,
  /mj12bot/i,
  /dotbot/i,
  /petalbot/i,
  /bytespider/i,
  /BLEXBot/i,
  /DataForSeoBot/i,
  /sqlmap/i,
  /nikto/i,
  /masscan/i,
  /zgrab/i,
  /nmap/i,
  /acunetix/i,
  /nessus/i,
  /dirbuster/i,
  /gobuster/i,
];

export function isSpamBotUserAgent(userAgent: string | null): boolean {
  if (!userAgent || userAgent.trim().length < 4) return true;
  return SPAM_BOT_PATTERNS.some((pattern) => pattern.test(userAgent));
}

export function getClientIpKey(request: NextRequest): string {
  const cfIp = request.headers.get("cf-connecting-ip");
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const rawIp = (
    cfIp ||
    (forwarded ? forwarded.split(",")[0] : "") ||
    realIp ||
    "local"
  ).trim();
  return `ip:${rawIp}`;
}

export function checkSlidingRateLimit(params: {
  key: string;
  maxRequests: number;
  windowMs: number;
}): { allowed: boolean; remaining: number; retryAfterSec: number } {
  const { key, maxRequests, windowMs } = params;
  const now = Date.now();
  const cutoff = now - windowMs;

  const bucket = memoryBuckets.get(key) || { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((t) => t > cutoff);

  if (bucket.timestamps.length >= maxRequests) {
    const oldest = bucket.timestamps[0] || now;
    return {
      allowed: false,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
    };
  }

  bucket.timestamps.push(now);
  memoryBuckets.set(key, bucket);

  // Очистка старых записей при разрастании карты
  if (memoryBuckets.size > 2000) {
    for (const [k, v] of memoryBuckets.entries()) {
      if (v.timestamps.every((t) => t <= cutoff)) {
        memoryBuckets.delete(k);
      }
    }
  }

  return {
    allowed: true,
    remaining: Math.max(0, maxRequests - bucket.timestamps.length),
    retryAfterSec: 0,
  };
}
