/**
 * Shared types for the VANTA EDITIONS storefront.
 */

export type Language = 'tr' | 'en';

/** A value that exists once per language. */
export type Localized<T = string> = Readonly<Record<Language, T>>;

/** Which placeholder artwork to draw until real photography is added. */
export type ArtworkVariant = 'money-laundering' | 'emergency';

export interface ProductImage {
  /** Path inside /public, e.g. "/products/money-laundering-01.jpg". */
  src: string;
  alt: Localized;
  width: number;
  height: number;
}

export interface ProductSpec {
  label: Localized;
  value: Localized;
}

export interface EditionInfo {
  /** The run this piece belongs to — rendered as "01" in "EDITION 01/05". */
  series: number;
  /** Total pieces in the edition — rendered as "05". */
  size: number;
  /** Pieces still available. 0 = sold out (button disables automatically). */
  remaining: number;
}

export interface ProductPrice {
  /** Turkish lira, shown when the site is in Turkish. */
  TRY: number;
  /** US dollars, shown when the site is in English. */
  USD: number;
}

export interface ProductCheckout {
  /** Shopier product link used for Turkish visitors. */
  tr: string;
  /**
   * Link used for English-speaking visitors. Set to `null` to send
   * international buyers to the WhatsApp concierge instead.
   */
  en: string | null;
}

export interface Product {
  /** URL-safe id. Also used for deep links: vantaeditions.com/#piece-<id> */
  id: string;
  /** Catalogue number shown on the wall label, e.g. "01". */
  catalogNumber: string;
  title: Localized;
  tagline: Localized;
  /** Materials line on the wall label. */
  medium: Localized;
  /** Concept copy, one entry per paragraph. */
  story: readonly Localized[];
  /** Identical in both languages, e.g. "40 × 40 × 6 cm". */
  dimensions: string;
  edition: EditionInfo;
  price: ProductPrice;
  checkout: ProductCheckout;
  /** Real photography. Leave empty to show the built-in placeholder artwork. */
  images: readonly ProductImage[];
  artwork: ArtworkVariant;
  specs: readonly ProductSpec[];
}

export type WaitlistStatus = 'idle' | 'submitting' | 'success' | 'error';
