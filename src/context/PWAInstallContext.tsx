"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Download, Share, PlusSquare, X, Smartphone, CheckCircle2 } from "lucide-react";
import { assetPath } from "@/config/siteConfig";
import { useAppSettings } from "@/context/AppSettingsContext";
import { getT } from "@/config/translations";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAInstallContextValue {
  canInstallNative: boolean;
  isStandalone: boolean;
  triggerInstall: () => Promise<void>;
  openHelpModal: () => void;
}

const PWAInstallContext = createContext<PWAInstallContextValue>({
  canInstallNative: false,
  isStandalone: false,
  triggerInstall: async () => {},
  openHelpModal: () => {},
});

export const usePWAInstall = () => useContext(PWAInstallContext);

export function PWAInstallProvider({ children }: { children: React.ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const { lang } = useAppSettings();
  const t = getT(lang);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register(assetPath("/sw.js")).catch(() => {});
    }

    const standaloneMatch =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(standaloneMatch);

    const ua = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(ua));

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
      setShowModal(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const triggerInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setDeferredPrompt(null);
      }
      return;
    }
    setShowModal(true);
  };

  return (
    <PWAInstallContext.Provider
      value={{
        canInstallNative: !!deferredPrompt,
        isStandalone,
        triggerInstall,
        openHelpModal: () => setShowModal(true),
      }}
    >
      {children}

      {showModal && (
        <div
          className="fixed inset-0 z-[160] flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#111622] p-6 text-slate-900 dark:text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-5">
              <img
                src={assetPath("/logo.png")}
                alt="ForexTraining Life"
                className="h-14 w-14 rounded-xl border border-[#F5B041]/50 object-cover shadow-lg"
              />
              <div>
                <span className="inline-block rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-emerald-700 dark:text-[#00E676]">
                  {t.pwaModal.badge}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  {t.pwaModal.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t.pwaModal.subtitle}
                </p>
              </div>
            </div>

            {isStandalone ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-[#00E676] flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>{t.pwaModal.alreadyInstalled}</span>
              </div>
            ) : isIOS ? (
              <div className="space-y-3 text-sm">
                <p className="text-xs uppercase tracking-wider text-amber-600 dark:text-[#F5B041] font-semibold">
                  {t.pwaModal.iosTitle}
                </p>
                <div className="flex items-start gap-3 rounded-xl bg-slate-50 dark:bg-[#0B0E14] p-3.5 border border-slate-200 dark:border-white/5">
                  <Share className="h-5 w-5 text-amber-600 dark:text-[#F5B041] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {t.pwaModal.iosStep1Title}
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {t.pwaModal.iosStep1Desc}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-slate-50 dark:bg-[#0B0E14] p-3.5 border border-slate-200 dark:border-white/5">
                  <PlusSquare className="h-5 w-5 text-emerald-600 dark:text-[#00E676] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {t.pwaModal.iosStep2Title}
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {t.pwaModal.iosStep2Desc}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                <p className="text-xs uppercase tracking-wider text-emerald-700 dark:text-[#00E676] font-semibold">
                  {t.pwaModal.otherTitle}
                </p>
                <div className="flex items-start gap-3 rounded-xl bg-slate-50 dark:bg-[#0B0E14] p-3.5 border border-slate-200 dark:border-white/5">
                  <Smartphone className="h-5 w-5 text-emerald-600 dark:text-[#00E676] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {t.pwaModal.otherStep1Title}
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {t.pwaModal.otherStep1Desc}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-slate-50 dark:bg-[#0B0E14] p-3.5 border border-slate-200 dark:border-white/5">
                  <Download className="h-5 w-5 text-amber-600 dark:text-[#F5B041] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {t.pwaModal.otherStep2Title}
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {t.pwaModal.otherStep2Desc}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="mt-5 w-full rounded-xl bg-gradient-to-r from-[#F5B041] to-[#00E676] py-3 text-center text-sm font-bold text-[#0B0E14] shadow-lg hover:opacity-95 transition cursor-pointer"
            >
              {t.pwaModal.closeBtn}
            </button>
          </div>
        </div>
      )}
    </PWAInstallContext.Provider>
  );
}
