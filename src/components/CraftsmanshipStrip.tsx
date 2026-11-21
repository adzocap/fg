'use client';

import { useLanguage } from '@/context/LanguageContext';

/**
 * Section 3 — the three answers a first-time buyer needs before paying:
 * is it really limited, who makes it, what if it breaks on the way.
 */
export function CraftsmanshipStrip() {
  const { t, dictionary } = useLanguage();

  return (
    <section id="craft" aria-labelledby="craft-heading" className="border-t border-hairline py-20 md:py-28">
      <div className="shell">
        <h2 id="craft-heading" className="max-w-xl font-display text-4xl leading-tight md:text-5xl">
          {t((d) => d.craft.heading)}
        </h2>

        <ul className="mt-12 grid divide-y divide-hairline border-y border-hairline md:mt-16 md:grid-cols-3 md:divide-x md:divide-y-0">
          {dictionary.craft.items.map((_, index) => (
            <li key={index} className="py-9 md:px-8 md:py-12 md:first:pl-0 md:last:pr-0 lg:px-10">
              <h3 className="font-display text-2xl leading-snug">
                {t((d) => d.craft.items[index]?.title ?? '')}
              </h3>
              <p className="mt-4 max-w-sm text-[15px] leading-7 text-silver">
                {t((d) => d.craft.items[index]?.body ?? '')}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
