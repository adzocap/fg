'use client';

import { useLanguage } from '@/context/LanguageContext';
import { editionFraction } from '@/lib/format';
import type { EditionInfo } from '@/types';

/** "EDITION 01/05 — 3 REMAINING" / "SERİ 01/05 — SON 3 ADET" */
export function EditionBadge({ edition, className = '' }: { edition: EditionInfo; className?: string }) {
  const { t } = useLanguage();
  const soldOut = edition.remaining <= 0;

  return (
    <p className={`label flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}>
      <span className="text-silver">{t((d) => d.edition.label)}</span>
      <span className="text-gold">{editionFraction(edition.series, edition.size)}</span>
      <span aria-hidden className="text-silver">
        —
      </span>
      <span className={soldOut ? 'text-silver line-through decoration-silver/60' : 'text-white'}>
        {soldOut ? t((d) => d.edition.soldOut) : t((d) => d.edition.remaining(edition.remaining))}
      </span>
    </p>
  );
}
