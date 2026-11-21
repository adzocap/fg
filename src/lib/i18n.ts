import { siteConfig } from '@/data/site';
import type { Language } from '@/types';

export const LANGUAGES: readonly Language[] = ['tr', 'en'];

export function isLanguage(value: unknown): value is Language {
  return value === 'tr' || value === 'en';
}

/**
 * Runs in <head> before the first paint, before React loads.
 *
 * 1. A saved choice in localStorage wins.
 * 2. Otherwise the browser's first language: "tr…" → Turkish, anything else → English.
 *
 * It writes the result to <html lang> and <html data-lang>. CSS uses
 * data-lang to show the right half of the bilingual static HTML, and the
 * LanguageProvider reads it on hydration. Kept in a server-safe module
 * (no "use client") so the root layout can inline it as a string.
 */
export const languageBootstrapScript = `(function(){try{var d=document.documentElement,k=${JSON.stringify(
  siteConfig.languageStorageKey,
)},s=null;try{s=window.localStorage.getItem(k)}catch(e){}var l=(s==='tr'||s==='en')?s:null;if(!l){var n=((navigator.languages&&navigator.languages[0])||navigator.language||'').toLowerCase();l=n.indexOf('tr')===0?'tr':'en'}d.setAttribute('data-lang',l);d.setAttribute('lang',l)}catch(e){}})();`;
