import type { Language, ProductPrice } from '@/types';

/**
 * Deterministic thousands grouping. Intentionally avoids Intl so the static
 * HTML and the browser always produce byte-identical strings.
 */
function groupThousands(value: number, separator: string): string {
  const rounded = Math.round(value);
  const digits = Math.abs(rounded).toString();
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return rounded < 0 ? `-${grouped}` : grouped;
}

/** "2.850 ₺" in Turkish, "$95" in English. */
export function formatPrice(price: ProductPrice, language: Language): string {
  if (language === 'tr') {
    return `${groupThousands(price.TRY, '.')} ₺`;
  }
  return `$${groupThousands(price.USD, ',')}`;
}

/** 1 → "01" */
export function pad2(value: number): string {
  return value.toString().padStart(2, '0');
}

/** "01/05" */
export function editionFraction(series: number, size: number): string {
  return `${pad2(series)}/${pad2(size)}`;
}
