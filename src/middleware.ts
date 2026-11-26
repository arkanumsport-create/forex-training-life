import { NextRequest, NextResponse } from "next/server";
import {
  checkSlidingRateLimit,
  getClientIpKey,
  isSpamBotUserAgent,
} from "@/lib/rate-limit";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent");

  // 1. Блокировка известных спам-ботов и сканеров уязвимостей (.env, wp-admin, phpMyAdmin и т.д.)
  if (
    pathname.includes("wp-admin") ||
    pathname.includes("wp-login") ||
    pathname.includes("xmlrpc.php") ||
    pathname.includes(".env") ||
    pathname.includes("phpmyadmin")
  ) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  if (isSpamBotUserAgent(ua)) {
    return new NextResponse("Access Denied: Automated Spam Bot Blocked", {
      status: 403,
    });
  }

  // 2. Rate-Limit защита для API маршрутов (от флуда и спам-запросов)
  if (pathname.startsWith("/api/")) {
    const ipKey = getClientIpKey(request);
    const limit = checkSlidingRateLimit({
      key: `api:${ipKey}`,
      maxRequests: 30,
      windowMs: 60_000, // максимум 30 запросов в минуту к API с одного IP
    });

    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": String(limit.retryAfterSec),
          },
        }
      );
    }
  }

  const response = NextResponse.next();

  // 3. Дополнительные заголовки защиты SSL / DNS / Anti-Clickjacking
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.png|logo.png|icons/|manifest.json|sw.js).*)",
  ],
};
