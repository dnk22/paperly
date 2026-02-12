"use client";

import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import AppLogo from "../AppLogo";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 bg-background pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <AppLogo size={24} />
              <span className="text-lg font-bold tracking-tight text-white">
                Paper<span className="text-neutral-500">ly</span>
              </span>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
              {t.footer.title}
              <br />
              Instant access. Work with Shortcuts.
            </p>
          </div>

          {/* Cột 2: Product */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-white text-sm">
              {t.footer.product.title}
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-neutral-500">
              <li>
                <Link
                  href="/editor/month"
                  className="hover:text-white transition-colors"
                >
                  Lịch Tháng
                </Link>
              </li>
              <li>
                <Link
                  href="/editor/year"
                  className="hover:text-white transition-colors"
                >
                  Year Progress
                </Link>
              </li>
              <li>
                <Link
                  href="/editor/life"
                  className="hover:text-white transition-colors"
                >
                  Life Grid
                </Link>
              </li>
              <li>
                <Link
                  href="/editor/text"
                  className="hover:text-white transition-colors"
                >
                  Mantra Focus
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Resources */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-white text-sm">
              {t.footer.instruction.title}
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-neutral-500">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t.footer.instruction.shortcutsInstall}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t.footer.instruction.question}
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 4: Connect */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-white text-sm">{t.footer.connect}</h4>
            <ul className="flex flex-col gap-2 text-sm text-neutral-500">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Github size={16} /> GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Twitter size={16} /> Twitter (X)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* --- BOTTOM SECTION: Copyright & Status --- */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-600">{t.footer.copyright}</p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              {t.footer.active}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
