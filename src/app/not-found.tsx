'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main className="shell flex min-h-[100svh] flex-col items-center justify-center text-center">
      <p className="text-xs tracking-wordmark text-white">VANTA EDITIONS</p>
      <h1 className="mt-10 font-display text-4xl md:text-5xl">{t((d) => d.notFound.title)}</h1>
      <a href="/" className="btn-outline mt-10">
        {t((d) => d.notFound.back)}
      </a>
    </main>
  );
}
