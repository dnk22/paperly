"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionary, Locale } from "@/lib/dictionary";

interface LanguageContextType {
  locale: Locale;
  t: typeof dictionary.vi; // Tự động gợi ý code theo cấu trúc tiếng Việt
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("vi");

  // Load ngôn ngữ đã lưu trong LocalStorage khi vào web
  useEffect(() => {
    const saved = localStorage.getItem("app-locale") as Locale;
    if (saved) setLocale(saved);
  }, []);

  const toggleLanguage = () => {
    const newLocale = locale === "vi" ? "en" : "vi";
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

// Hook để dùng ở mọi nơi
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
