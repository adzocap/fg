'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { siteConfig } from '@/data/site';
import { translations, type Dictionary } from '@/data/translations';
import { formatPrice } from '@/lib/format';
import { isLanguage } from '@/lib/i18n';
import type { Language, Localized, ProductPrice } from '@/types';

/* ------------------------------------------------------------------ */
/*  Language store                                                      */
/*                                                                      */
/*  A tiny external store read through useSyncExternalStore:            */
/*  - the server and the hydration pass both see `defaultLanguage`,     */
/*    so the markup always matches (no hydration mismatch);             */
/*  - right after hydration React re-reads the real value, which the    */
/*    <head> bootstrap script already wrote to <html data-lang>;        */
/*  - switching updates <html lang>, localStorage and every subscriber  */
/*    instantly, and other open tabs follow via the `storage` event.    */
/* ------------------------------------------------------------------ */

let currentLanguage: Language | null = null;
const listeners = new Set<() => void>();

function readDocumentLanguage(): Language {
  const fromDocument = document.documentElement.getAttribute('data-lang');
  return isLanguage(fromDocument) ? fromDocument : siteConfig.defaultLanguage;
}

function getSnapshot(): Language {
  if (currentLanguage === null) {
    currentLanguage = readDocumentLanguage();
  }
  return currentLanguage;
}

function getServerSnapshot(): Language {
  return siteConfig.defaultLanguage;
}

function applyLanguage(language: Language, persist: boolean): void {
  currentLanguage = language;
  const root = document.documentElement;
  root.setAttribute('data-lang', language);
  root.setAttribute('lang', language);
  if (persist) {
    try {
      window.localStorage.setItem(siteConfig.languageStorageKey, language);
    } catch {
      // Private mode or storage disabled: the switch still works for this visit.
    }
  }
  listeners.forEach((listener) => listener());
}

function handleStorage(event: StorageEvent): void {
  if (event.key === siteConfig.languageStorageKey && isLanguage(event.newValue)) {
    applyLanguage(event.newValue, false);
  }
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  if (listeners.size === 1) {
    window.addEventListener('storage', handleStorage);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener('storage', handleStorage);
    }
  };
}

const noopSubscribe = (): (() => void) => () => undefined;

/* ------------------------------------------------------------------ */
/*  Bilingual rendering                                                 */
/* ------------------------------------------------------------------ */

/**
 * Before hydration, visible copy is rendered in both languages; CSS keyed
 * on <html data-lang> hides the other one (see globals.css). After
 * hydration only the active language is rendered.
 */
function Bilingual({ tr, en }: { tr: string; en: string }) {
  return (
    <>
      <span data-l="tr" lang="tr">
        {tr}
      </span>
      <span data-l="en" lang="en">
        {en}
      </span>
    </>
  );
}

type Selector = (dictionary: Dictionary) => string;

export interface LanguageContextValue {
  language: Language;
  /** false during the static render and the hydration pass. */
  hydrated: boolean;
  setLanguage: (language: Language) => void;
  /** Dictionary of the active language, for logic (not for visible copy). */
  dictionary: Dictionary;
  /** Visible UI copy. Safe before hydration. */
  t: (select: Selector) => ReactNode;
  /** Plain string for attributes (aria-label, placeholder, href). */
  ts: (select: Selector) => string;
  /** Visible product copy. Safe before hydration. */
  l: (value: Localized) => ReactNode;
  /** Plain-string product copy. */
  ls: (value: Localized) => string;
  /** Visible localized price: "2.850 ₺" / "$95". */
  price: (value: ProductPrice) => ReactNode;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const setLanguage = useCallback((next: Language) => {
    applyLanguage(next, true);
  }, []);

  const both = useCallback(
    (tr: string, en: string): ReactNode => {
      if (hydrated) return language === 'tr' ? tr : en;
      if (tr === en) return tr;
      return <Bilingual tr={tr} en={en} />;
    },
    [hydrated, language],
  );

  const value = useMemo<LanguageContextValue>(() => {
    const dictionary = translations[language];
    return {
      language,
      hydrated,
      setLanguage,
      dictionary,
      t: (select) => both(select(translations.tr), select(translations.en)),
      ts: (select) => select(dictionary),
      l: (localized) => both(localized.tr, localized.en),
      ls: (localized) => localized[language],
      price: (amount) => both(formatPrice(amount, 'tr'), formatPrice(amount, 'en')),
    };
  }, [both, hydrated, language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside <LanguageProvider>.');
  }
  return context;
}
