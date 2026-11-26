import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig, assetPath } from "@/config/siteConfig";
import { PWAInstallProvider } from "@/context/PWAInstallContext";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  manifest: assetPath("/manifest.json"),
  icons: {
    icon: assetPath("/favicon.png"),
    apple: assetPath("/icons/apple-touch-icon.png"),
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.shortName,
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    type: "website",
    images: [assetPath("/logo.png")],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0E14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <body className="min-h-screen bg-[#0B0E14] text-white antialiased selection:bg-[#F5B041] selection:text-[#0B0E14]">
        <PWAInstallProvider>{children}</PWAInstallProvider>
      </body>
    </html>
  );
}
