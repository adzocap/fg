'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import { ShadowboxArt } from '@/components/art/ShadowboxArt';
import { useLanguage } from '@/context/LanguageContext';
import type { Product } from '@/types';

interface ProductVisualProps {
  product: Product;
  /** Which photo to show when real photography exists. */
  imageIndex?: number;
  /** Load the photo eagerly (use for above-the-fold or modal views). */
  priority?: boolean;
  sizes?: string;
  className?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A piece hanging on a dark gallery wall. The wall starts dimmed; when it
 * scrolls into view the spotlight comes up and the piece is revealed.
 * With real photography in products.ts, the photo is shown instead.
 */
export function ProductVisual({
  product,
  imageIndex = 0,
  priority = false,
  sizes = '(min-width: 768px) 50vw, 100vw',
  className = '',
}: ProductVisualProps) {
  const { ls, ts } = useLanguage();
  const title = ls(product.title);
  const photo = product.images[imageIndex] ?? product.images[0];

  if (photo) {
    return (
      <div className={`relative aspect-square overflow-hidden bg-charcoal ${className}`}>
        <Image
          src={photo.src}
          alt={ls(photo.alt)}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`relative aspect-square overflow-hidden bg-[#0c0c0c] ${className}`}>
      {/* Spotlight on the wall */}
      <m.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 58% 62% at 50% -4%, rgba(255,255,255,0.15), rgba(255,255,255,0.045) 52%, rgba(255,255,255,0) 78%)',
        }}
        initial={{ opacity: 0.2 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 1.6, ease: EASE }}
      />
      {/* The piece, with its cast shadow on the wall */}
      <div className="absolute inset-[14%] shadow-[0_34px_60px_-16px_rgba(0,0,0,0.95),0_8px_18px_-6px_rgba(0,0,0,0.8)]">
        <ShadowboxArt variant={product.artwork} label={ts((d) => d.product.artAlt(title))} className="h-full w-full" />
        <m.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-black"
          initial={{ opacity: 0.55 }}
          whileInView={{ opacity: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 1.6, ease: EASE }}
        />
      </div>
    </div>
  );
}
