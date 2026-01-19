import { useLanguage } from "@/context/LanguageContext";

export default function Title() {
  const { t } = useLanguage();
  return (
    <div className="mb-12 md:mt-[24px] md:mt-[18px] md:px-8 sm:px-4">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-2 leading-tight">
        {t.hero.title}
        <span className="block sm:inline text-neutral-500">
          {t.hero.subtitle}
        </span>
      </h1>
      <p className="text-base md:text-xl max-w-full md:max-w-2xl leading-relaxed text-neutral-300">
        {t.hero.desc}
      </p>
    </div>
  );
}
