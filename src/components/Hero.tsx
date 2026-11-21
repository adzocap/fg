'use client';

import { useLanguage } from '@/context/LanguageContext';

/**
 * Full-viewport opening. The page's single orchestrated moment: the gallery
 * light dims up, then the wall text settles into it.
 *
 * The entrance uses CSS keyframes rather than Framer Motion so it starts at
 * first paint, before JavaScript loads — the headline is the LCP element.
 */
export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Gallery light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 animate-light-on">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 42% 78% at 50% -8%, rgba(255,255,255,0.13), rgba(255,255,255,0.045) 46%, rgba(255,255,255,0) 72%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 16% 46% at 50% -6%, rgba(255,255,255,0.10), rgba(255,255,255,0) 70%)',
          }}
        />
        {/* Light fixture */}
        <div className="absolute left-1/2 top-0 h-px w-24 -translate-x-1/2 bg-white/70 shadow-[0_0_24px_4px_rgba(255,255,255,0.25)]" />
        {/* Pool of light on the floor */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              'radial-gradient(ellipse 34% 60% at 50% 100%, rgba(255,255,255,0.045), rgba(255,255,255,0) 70%)',
          }}
        />
      </div>

      <div className="shell relative flex flex-col items-center pb-28 pt-28 text-center">
        <h1 className="flex flex-col items-center">
          <span
            className="block animate-rise font-display text-[clamp(5rem,24vw,12rem)] font-normal leading-[0.86] tracking-display [animation-delay:350ms]"
          >
            {t((d) => d.hero.title)}
          </span>
          <span className="sr-only"> — </span>
          <span className="label mt-[clamp(2.25rem,7vw,3.75rem)] flex animate-rise items-center gap-4 text-white/90 [animation-delay:550ms]">
            <span aria-hidden className="h-px w-8 bg-white/35" />
            {t((d) => d.hero.limit)}
            <span aria-hidden className="h-px w-8 bg-white/35" />
          </span>
        </h1>

        <p className="mt-8 max-w-[29rem] animate-rise text-[15px] leading-7 text-silver [animation-delay:750ms] sm:text-base sm:leading-8">
          {t((d) => d.hero.subtitle)}
        </p>

        <a href="#drop-01" className="btn-outline mt-11 animate-rise [animation-delay:950ms]">
          {t((d) => d.hero.cta)}
        </a>
      </div>

      {/* Wall label */}
      <div className="shell pointer-events-none absolute inset-x-0 bottom-0 flex animate-fade-in items-end justify-between pb-7 text-[11px] tracking-[0.2em] text-silver [animation-delay:1.3s]">
        <span>{t((d) => d.hero.location)}</span>
        <span aria-hidden className="h-10 w-px bg-gradient-to-b from-transparent to-white/30" />
        <span>41.01° N, 28.97° E</span>
      </div>
    </section>
  );
}
