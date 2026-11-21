import { siteConfig } from '@/data/site';
import type { Language, Product } from '@/types';

/** True once a real WhatsApp number is set in src/data/site.ts. */
export const isWhatsappConfigured = /^\d{8,15}$/.test(siteConfig.whatsappNumber);

export function whatsappUrl(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailtoUrl(subject: string, body: string): string {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** A link counts as configured when it is http(s) and no longer a placeholder. */
export function isConfiguredUrl(url: string | null): url is string {
  return url !== null && /^https?:\/\//i.test(url) && !url.includes('REPLACE_');
}

export type CheckoutKind = 'shopier' | 'whatsapp' | 'email';

export interface CheckoutTarget {
  href: string;
  kind: CheckoutKind;
}

interface CheckoutMessages {
  order: string;
  emailSubject: string;
}

/**
 * Where the "Acquire piece" button goes, in order of preference:
 * the configured checkout link → WhatsApp concierge → email.
 */
export function resolveCheckout(product: Product, language: Language, messages: CheckoutMessages): CheckoutTarget {
  const link = product.checkout[language];
  if (isConfiguredUrl(link)) {
    return { href: link, kind: 'shopier' };
  }
  if (isWhatsappConfigured) {
    return { href: whatsappUrl(messages.order), kind: 'whatsapp' };
  }
  return { href: mailtoUrl(messages.emailSubject, messages.order), kind: 'email' };
}
