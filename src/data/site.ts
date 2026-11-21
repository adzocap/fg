import type { Language } from '@/types';

/**
 * Site-wide settings. Edit the values below; no component changes needed.
 */
export const siteConfig = {
  name: 'VANTA EDITIONS',
  url: 'https://vantaeditions.com',

  /**
   * The language baked into the static HTML. Visitors whose browser is not
   * set to this language still see their own language instantly — the
   * pre-hydration script handles that — so this mostly affects search
   * engines and visitors with JavaScript disabled.
   */
  defaultLanguage: 'tr' as Language,

  /** localStorage key that remembers a visitor's TR/EN choice. */
  languageStorageKey: 'vanta-lang',

  /**
   * WhatsApp number in international format, digits only, no "+" or spaces.
   * Example: 905321234567 for +90 532 123 45 67.
   * While this is not a valid number, every WhatsApp button stays hidden and
   * checkout falls back to email, so visitors never reach a dead link.
   */
  whatsappNumber: '90XXXXXXXXXX',

  instagramHandle: 'vantaeditions',
  email: 'info@vantaeditions.com',

  /**
   * Drop 02 waitlist. Set NEXT_PUBLIC_WAITLIST_ENDPOINT in your hosting
   * dashboard (or .env.local) to a Formspree form URL, a Make/Zapier webhook,
   * or your own function. See README → "Connecting the waitlist".
   */
  waitlistEndpoint: process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT ?? '',
} as const;

export const instagramUrl = `https://www.instagram.com/${siteConfig.instagramHandle}/`;
