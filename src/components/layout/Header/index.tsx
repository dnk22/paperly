"use client";
import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import AppLogo from "../AppLogo";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const router = useRouter();
  const { locale, toggleLanguage } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-8">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <AppLogo />
          <span className="text-lg font-bold tracking-tight text-white">
            Paper<span className="text-neutral-500">ly</span>
          </span>
        </div>

        {/* Language Switcher */}
        <nav className="flex items-center gap-4">
          <button
            onClick={() => toggleLanguage()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 transition-all group"
          >
            <Globe
              size={14}
              className="text-neutral-400 group-hover:text-white transition-colors"
            />

            <div className="flex items-center text-xs font-bold tracking-wider cursor-pointer">
              <span
                className={`transition-colors ${
                  locale === "en" ? "text-brand" : "text-neutral-600"
                }`}
              >
                EN
              </span>
              <span className="mx-2 text-neutral-700">/</span>
              <span
                className={`transition-colors ${
                  locale === "vi" ? "text-brand" : "text-neutral-600"
                }`}
              >
                VI
              </span>
            </div>
          </button>
        </nav>
      </div>
    </header>
  );
}
