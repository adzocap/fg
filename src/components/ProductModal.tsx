'use client';

import { m } from 'framer-motion';
import { MessageCircle, ShieldCheck, X } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { EditionBadge } from '@/components/ui/EditionBadge';
import { EditionLedger } from '@/components/ui/EditionLedger';
import { ProductVisual } from '@/components/ui/ProductVisual';
import { useLanguage } from '@/context/LanguageContext';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { isWhatsappConfigured, resolveCheckout, whatsappUrl } from '@/lib/contact';
import { editionFraction } from '@/lib/format';
import type { Product } from '@/types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onJoinWaitlist: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

function prefersDesktopLayout(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;
}

/**
 * Product detail: a bottom sheet on phones, a split viewing room on larger
 * screens. Escape, backdrop click and the close button all dismiss it;
 * page scroll is locked and keyboard focus stays inside while open.
 */
export function ProductModal({ product, onClose, onJoinWaitlist }: ProductModalProps) {
  const { t, l, ls, ts, language, dictionary, price } = useLanguage();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [desktop] = useState(prefersDesktopLayout);
  const [imageIndex, setImageIndex] = useState(0);

  useBodyScrollLock(true);
  useFocusTrap(dialogRef, true, onClose);

  const title = ls(product.title);
  const fraction = editionFraction(product.edition.series, product.edition.size);
  const soldOut = product.edition.remaining <= 0;
  const titleId = `dialog-${product.id}-title`;

  const checkout = resolveCheckout(product, language, {
    order: dictionary.whatsapp.order(title, fraction),
    emailSubject: dictionary.whatsapp.emailSubject(title),
  });
  const checkoutNote =
    checkout.kind === 'shopier'
      ? t((d) => d.product.checkoutShopier)
      : checkout.kind === 'whatsapp'
        ? t((d) => d.product.checkoutConcierge)
        : t((d) => d.product.checkoutEmail);
  const opensNewTab = checkout.kind !== 'email';

  const sheetMotion = desktop
    ? {
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.985 },
      }
    : {
        initial: { y: '100%' },
        animate: { y: 0 },
        exit: { y: '100%' },
      };

  const gallery =
    product.images.length > 1 ? (
      <div className="flex gap-2 px-6 pb-2 pt-4 md:absolute md:inset-x-0 md:bottom-0 md:px-8 md:pb-8">
        {product.images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setImageIndex(index)}
            aria-label={ts((d) => d.product.imagePosition(index + 1, product.images.length))}
            aria-pressed={index === imageIndex}
            className={`relative h-14 w-14 overflow-hidden border transition-colors duration-400 ${
              index === imageIndex ? 'border-gold' : 'border-hairline hover:border-silver'
            }`}
          >
            <Image src={image.src} alt="" fill sizes="56px" className="object-cover" />
          </button>
        ))}
      </div>
    ) : null;

  return createPortal(
    <div className="fixed inset-0 z-overlay">
      <m.div
        aria-hidden
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      />

      <div className="pointer-events-none absolute inset-0 flex items-end md:items-center md:justify-center md:p-6 lg:p-10">
        <m.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="pointer-events-auto relative flex h-[94svh] w-full flex-col overflow-hidden border-t border-hairline bg-charcoal md:h-[min(88vh,54rem)] md:max-w-6xl md:flex-row md:border"
          {...sheetMotion}
          transition={{ duration: desktop ? 0.55 : 0.7, ease: EASE }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={ts((d) => d.product.close)}
            data-autofocus
            className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center bg-obsidian/60 text-white backdrop-blur-md transition-colors duration-400 hover:bg-obsidian"
          >
            <X aria-hidden size={20} strokeWidth={1.25} />
          </button>

          {/* Desktop: fixed viewing wall on the left */}
          <div className="relative hidden border-r border-hairline bg-[#0c0c0c] md:flex md:w-1/2 md:shrink-0 md:items-center">
            <ProductVisual product={product} imageIndex={imageIndex} priority sizes="50vw" className="w-full" />
            {gallery}
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* Phone: the piece scrolls with the details */}
              <div className="md:hidden">
                <ProductVisual product={product} imageIndex={imageIndex} priority sizes="100vw" />
                {gallery}
              </div>

              <div className="px-6 pb-10 pt-8 md:px-10 md:pt-12">
                <p className="label text-gold">{t((d) => d.edition.catalog(product.catalogNumber))}</p>
                <h2 id={titleId} className="mt-3 font-display text-4xl leading-[1.05] md:text-5xl">
                  {l(product.title)}
                </h2>
                <p className="mt-3 font-display text-lg italic text-silver">{l(product.tagline)}</p>

                <div className="mt-6 space-y-1 text-caption text-silver">
                  <p>{l(product.medium)}</p>
                  <p>{product.dimensions}</p>
                </div>

                <EditionBadge edition={product.edition} className="mt-6" />

                <div className="mt-8">
                  <EditionLedger edition={product.edition} />
                </div>

                <section className="mt-10">
                  <h3 className="label text-silver">{t((d) => d.product.concept)}</h3>
                  <div className="mt-4 space-y-4 text-[15px] leading-7 text-white/80">
                    {product.story.map((paragraph, index) => (
                      <p key={index}>{l(paragraph)}</p>
                    ))}
                  </div>
                </section>

                <section className="mt-10">
                  <h3 className="label text-silver">{t((d) => d.product.specifications)}</h3>
                  <dl className="mt-4 border-t border-hairline">
                    {product.specs.map((spec, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-[minmax(7rem,38%)_1fr] gap-4 border-b border-hairline py-3 text-caption"
                      >
                        <dt className="text-silver">{l(spec.label)}</dt>
                        <dd className="text-white">{l(spec.value)}</dd>
                      </div>
                    ))}
                  </dl>
                </section>

                <section className="mt-10 flex gap-4 border border-hairline p-5">
                  <ShieldCheck aria-hidden size={20} strokeWidth={1.25} className="mt-0.5 shrink-0 text-white" />
                  <div>
                    <h3 className="text-[15px] text-white">{t((d) => d.product.shippingTitle)}</h3>
                    <p className="mt-2 text-caption text-silver">{t((d) => d.product.shippingBody)}</p>
                  </div>
                </section>

                <p className="mt-6 text-xs leading-5 text-silver/80">{t((d) => d.product.propNote)}</p>

                {isWhatsappConfigured && (
                  <a
                    href={whatsappUrl(dictionary.whatsapp.inquiry(title, fraction))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-quiet mt-6 inline-flex min-h-11 items-center gap-2 text-caption"
                  >
                    <MessageCircle aria-hidden size={16} strokeWidth={1.25} />
                    {t((d) => d.product.inquire)}
                  </a>
                )}
              </div>
            </div>

            {/* Purchase bar */}
            <div className="border-t border-hairline bg-charcoal/95 px-6 pb-safe pt-4 backdrop-blur-md md:px-10 md:pt-5">
              <div className="flex items-center gap-4 pb-4 md:pb-5">
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-silver">{t((d) => d.product.price)}</p>
                  <p className="font-display text-2xl leading-tight text-white">{price(product.price)}</p>
                </div>
                {soldOut ? (
                  <button type="button" onClick={onJoinWaitlist} className="btn-solid min-w-[11rem] flex-1 md:flex-none">
                    {t((d) => d.product.soldOutCta)}
                  </button>
                ) : (
                  <a
                    href={checkout.href}
                    {...(opensNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="btn-solid min-w-[11rem] flex-1 md:flex-none md:px-12"
                  >
                    {t((d) => d.product.acquire)}
                  </a>
                )}
              </div>
              {!soldOut && <p className="-mt-2 pb-4 text-[11px] leading-4 text-silver md:pb-5">{checkoutNote}</p>}
            </div>
          </div>
        </m.div>
      </div>
    </div>,
    document.body,
  );
}
