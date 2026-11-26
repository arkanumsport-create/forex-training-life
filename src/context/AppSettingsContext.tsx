"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "ru" | "en";
export type ThemeMode = "dark" | "light";

interface AppSettingsContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const AppSettingsContext = createContext<AppSettingsContextValue>({
  lang: "ru",
  setLang: () => {},
  toggleLang: () => {},
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

export const useAppSettings = () => useContext(AppSettingsContext);

export function AppSettingsProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("ru");
  const [theme, setThemeState] = useState<ThemeMode>("dark");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("ftl_lang");
      if (savedLang === "ru" || savedLang === "en") {
        setLangState(savedLang);
      }
      const savedTheme = localStorage.getItem("ftl_theme");
      if (savedTheme === "dark" || savedTheme === "light") {
        setThemeState(savedTheme);
        applyThemeClass(savedTheme);
      } else {
        applyThemeClass("dark");
      }
    } catch {
      applyThemeClass("dark");
    }
  }, []);

  const applyThemeClass = (mode: ThemeMode) => {
    const html = document.documentElement;
    if (mode === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
      html.setAttribute("data-theme", "dark");
    } else {
      html.classList.remove("dark");
      html.classList.add("light");
      html.setAttribute("data-theme", "light");
    }
  };

  const setLang = (next: Language) => {
    setLangState(next);
    document.documentElement.lang = next;
    try {
      localStorage.setItem("ftl_lang", next);
    } catch {}
  };

  const toggleLang = () => {
    setLang(lang === "ru" ? "en" : "ru");
  };

  const setTheme = (next: ThemeMode) => {
    setThemeState(next);
    applyThemeClass(next);
    try {
      localStorage.setItem("ftl_theme", next);
    } catch {}
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <AppSettingsContext.Provider
      value={{ lang, setLang, toggleLang, theme, setTheme, toggleTheme }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
}
