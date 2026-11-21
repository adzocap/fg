'use client';

import { EditionBadge } from '@/components/ui/EditionBadge';
import { ProductVisual } from '@/components/ui/ProductVisual';
import { useLanguage } from '@/context/LanguageContext';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onOpen: (id: string) => void;
}

/**
 * A piece on the wall with its museum-style wall label beneath.
 * The whole card is one tap target (the "View piece" button stretches over it).
 */
export function ProductCard({ product, onOpen }: ProductCardProps) {
  const { t, l, ts, ls, price } = useLanguage();
  const titleId = `product-${product.id}-title`;

  return (
    <article aria-labelledby={titleId} className="group relative">
      <ProductVisual product={product} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 aspect-square border border-white/0 transition-colors duration-600 ease-gallery group-hover:border-white/15"
      />

      <div className="mt-6 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="label text-gold">{t((d) => d.edition.catalog(product.catalogNumber))}</p>
          <h3 id={titleId} className="mt-3 font-display text-[2rem] leading-[1.05] sm:text-4xl">
            {l(product.title)}
          </h3>
          <p className="mt-3 max-w-sm text-caption text-silver">{l(product.medium)}</p>
          <p className="mt-1 text-caption text-silver">{product.dimensions}</p>
        </div>
        <p className="shrink-0 pt-7 font-display text-2xl text-white">{price(product.price)}</p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-hairline pt-4">
        <EditionBadge edition={product.edition} />
        <button
          type="button"
          onClick={() => onOpen(product.id)}
          aria-haspopup="dialog"
          aria-label={ts((d) => d.collection.openDetails(ls(product.title)))}
          className="label flex h-11 shrink-0 items-center text-white/80 transition-colors duration-400 after:absolute after:inset-0 after:content-[''] group-hover:text-white"
        >
          <span className="border-b border-transparent pb-1 transition-colors duration-400 group-hover:border-white/60">
            {t((d) => d.collection.viewPiece)}
          </span>
        </button>
      </div>
    </article>
  );
}
