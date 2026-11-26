"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Download, Share, PlusSquare, X, Smartphone, CheckCircle2 } from "lucide-react";

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

  useEffect(() => {
    // Регистрация Service Worker для PWA
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    // Проверка запущено ли уже как установленное PWA
    const standaloneMatch =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(standaloneMatch);

    // Определение iOS устройства
    const ua = window.navigator.userAgent.toLowerCase();
    const iosDevice = /iphone|ipad|ipod/.test(ua);
    setIsIOS(iosDevice);

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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[#111622] p-6 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition"
              aria-label="Закрыть"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-5">
              <img
                src="/logo.png"
                alt="ForexTraining Life"
                className="h-14 w-14 rounded-xl border border-[#F5B041]/40 object-cover shadow-lg"
              />
              <div>
                <span className="inline-block rounded-full bg-[#00E676]/15 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-[#00E676]">
                  PWA ПРИЛОЖЕНИЕ
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Установить ForexTraining Life
                </h3>
                <p className="text-xs text-slate-400">
                  Быстрый доступ к обзорам рынка и сигналам с главного экрана
                </p>
              </div>
            </div>

            {isStandalone ? (
              <div className="rounded-xl border border-[#00E676]/30 bg-[#00E676]/10 p-4 text-sm text-[#00E676] flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>Приложение ForexTraining Life уже установлено на вашем устройстве!</span>
              </div>
            ) : isIOS ? (
              <div className="space-y-3 text-sm text-slate-200">
                <p className="text-xs uppercase tracking-wider text-[#F5B041] font-semibold">
                  Инструкция для iPhone / iPad (Safari):
                </p>
                <div className="flex items-start gap-3 rounded-xl bg-[#0B0E14] p-3.5 border border-white/5">
                  <Share className="h-5 w-5 text-[#F5B041] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">1. Нажмите «Поделиться»</span>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Иконка квадрата со стрелкой вверх в нижней панели браузера Safari.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-[#0B0E14] p-3.5 border border-white/5">
                  <PlusSquare className="h-5 w-5 text-[#00E676] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">2. Выберите «На экран «Домой»»</span>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Прокрутите меню вниз и нажмите «На экран «Домой» (Add to Home Screen), затем «Добавить».
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-sm text-slate-200">
                <p className="text-xs uppercase tracking-wider text-[#00E676] font-semibold">
                  Установка на Android / ПК (Chrome, Edge, Браузер):
                </p>
                <div className="flex items-start gap-3 rounded-xl bg-[#0B0E14] p-3.5 border border-white/5">
                  <Smartphone className="h-5 w-5 text-[#00E676] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">1. Откройте меню браузера (⋮)</span>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Нажмите на три точки в правом верхнем углу браузера или значок установки в адресной строке.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-[#0B0E14] p-3.5 border border-white/5">
                  <Download className="h-5 w-5 text-[#F5B041] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">
                      2. Выберите «Установить приложение»
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Или «Добавить на главный экран» — иконка FTL Trading появится среди ваших приложений.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="mt-5 w-full rounded-xl bg-gradient-to-r from-[#F5B041] to-[#00E676] py-3 text-center text-sm font-bold text-[#0B0E14] shadow-lg hover:opacity-95 transition"
            >
              Понятно
            </button>
          </div>
        </div>
      )}
    </PWAInstallContext.Provider>
  );
}
