"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionary, Locale } from "@/lib/dictionary";

interface LanguageContextType {
  locale: Locale;
  t: typeof dictionary.vi;
  toggleLanguage: (language?: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("app-locale") as Locale;
    if (saved && (saved === "vi" || saved === "en")) {
      setLocale(saved);
    }

    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="min-h-screen bg-black" />;
  }

  const toggleLanguage = (language?: Locale) => {
    const newLocale = language ? language : locale === "vi" ? "en" : "vi";
    setLocale(newLocale);
    localStorage.setItem("app-locale", newLocale);
  };

  return (
    <LanguageContext.Provider
      value={{ locale, t: dictionary[locale], toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
