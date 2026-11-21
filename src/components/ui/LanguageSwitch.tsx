'use client';

import { useLanguage } from '@/context/LanguageContext';
import { LANGUAGES } from '@/lib/i18n';
import type { Language } from '@/types';

const NAMES: Readonly<Record<Language, string>> = { tr: 'Türkçe', en: 'English' };

/** Minimal "TR | EN" toggle. 44px tap targets, gold hairline on the active one. */
export function LanguageSwitch({ className = '' }: { className?: string }) {
  const { language, hydrated, setLanguage, ts } = useLanguage();

  return (
    <div role="group" aria-label={ts((d) => d.nav.language)} className={`flex items-center ${className}`}>
      {LANGUAGES.map((code, index) => {
        // The look of the active option comes from CSS keyed on html[data-lang]
        // (globals.css), so it is right before hydration too.
        const active = hydrated && language === code;
        return (
          <span key={code} className="flex items-center">
            {index > 0 && (
              <span aria-hidden className="h-3 w-px bg-hairline" />
            )}
            <button
              type="button"
              lang={code}
              aria-label={NAMES[code]}
              aria-pressed={active}
              data-lang-option={code}
              onClick={() => setLanguage(code)}
              className="relative flex h-11 min-w-11 items-center justify-center px-2 text-[11px] tracking-[0.24em] text-silver transition-colors duration-400 ease-gallery hover:text-white"
            >
              {code.toUpperCase()}
              <span
                aria-hidden
                data-lang-line
                className="absolute bottom-2 left-1/2 h-px w-4 -translate-x-1/2 bg-gold opacity-0 transition-opacity duration-400"
              />
            </button>
          </span>
        );
      })}
    </div>
  );
}
