'use client';

import { useLanguage } from '@/context/LanguageContext';
import { pad2 } from '@/lib/format';
import type { EditionInfo } from '@/types';

/**
 * The five numbered pieces of an edition, as a collector would see them in
 * the studio's ledger: acquired numbers dimmed, available ones in gold.
 */
export function EditionLedger({ edition }: { edition: EditionInfo }) {
  const { t } = useLanguage();
  const acquired = Math.max(0, edition.size - edition.remaining);

  return (
    <div>
      <p className="label text-silver">{t((d) => d.edition.ledgerTitle)}</p>
      <ol className="mt-4 grid grid-cols-5 border-l border-t border-hairline">
        {Array.from({ length: edition.size }, (_, index) => {
          const isAcquired = index < acquired;
          return (
            <li
              key={index}
              className="flex flex-col items-center gap-1 border-b border-r border-hairline py-3"
            >
              <span
                className={`font-display text-xl ${isAcquired ? 'text-silver/50 line-through decoration-1' : 'text-gold'}`}
              >
                {pad2(index + 1)}
              </span>
              <span className={`text-[10px] uppercase tracking-[0.2em] ${isAcquired ? 'text-silver/60' : 'text-white/80'}`}>
                {isAcquired ? t((d) => d.edition.acquired) : t((d) => d.edition.available)}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-caption text-silver">
        {t((d) => d.edition.ledgerSummary(edition.remaining, edition.size))}
      </p>
    </div>
  );
}
