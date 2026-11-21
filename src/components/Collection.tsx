'use client';

import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { useLanguage } from '@/context/LanguageContext';
import { findProduct, products } from '@/data/products';

const HASH_PREFIX = '#piece-';

interface ModalHistoryState {
  vantaPiece: string;
}

function isModalState(value: unknown): value is ModalHistoryState {
  return typeof value === 'object' && value !== null && typeof (value as ModalHistoryState).vantaPiece === 'string';
}

/**
 * Section 2 — Drop 01.
 *
 * Opening a piece pushes a history entry (#piece-<id>), so the phone's back
 * button closes the sheet instead of leaving the site, and a piece can be
 * linked to directly from Instagram: vantaeditions.com/#piece-money-laundering
 */
export function Collection() {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);

  // Deep link on first load, and back/forward navigation.
  useEffect(() => {
    const fromHash = window.location.hash.startsWith(HASH_PREFIX)
      ? window.location.hash.slice(HASH_PREFIX.length)
      : null;
    if (fromHash && findProduct(fromHash)) {
      // Rebuild history as [page] → [page + piece] so "back" lands on the page.
      const base = `${window.location.pathname}${window.location.search}`;
      window.history.replaceState(null, '', base);
      window.history.pushState({ vantaPiece: fromHash } satisfies ModalHistoryState, '', `${HASH_PREFIX}${fromHash}`);
      setActiveId(fromHash);
    }

    const onPopState = (event: PopStateEvent) => {
      setActiveId(isModalState(event.state) && findProduct(event.state.vantaPiece) ? event.state.vantaPiece : null);
    };

    // A #piece-… link followed while already on the page (e.g. from a story link).
    const onHashChange = () => {
      const hash = window.location.hash;
      if (!hash.startsWith(HASH_PREFIX) || isModalState(window.history.state)) return;
      const id = hash.slice(HASH_PREFIX.length);
      if (!findProduct(id)) return;
      window.history.replaceState({ vantaPiece: id } satisfies ModalHistoryState, '', hash);
      setActiveId(id);
    };

    window.addEventListener('popstate', onPopState);
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  const openProduct = useCallback((id: string) => {
    window.history.pushState({ vantaPiece: id } satisfies ModalHistoryState, '', `${HASH_PREFIX}${id}`);
    setActiveId(id);
  }, []);

  const closeProduct = useCallback(() => {
    if (isModalState(window.history.state)) {
      window.history.back(); // popstate clears activeId
    } else {
      setActiveId(null);
    }
  }, []);

  const joinWaitlist = useCallback(() => {
    closeProduct();
    window.setTimeout(() => {
      document.getElementById('drop-02')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 450);
  }, [closeProduct]);

  const activeProduct = activeId ? findProduct(activeId) : undefined;

  return (
    <section id="drop-01" aria-labelledby="drop-01-heading" className="border-t border-hairline py-20 md:py-28">
      <div className="shell">
        <header className="mb-12 grid gap-5 md:mb-16 md:grid-cols-12 md:items-end">
          <h2 id="drop-01-heading" className="font-display text-6xl leading-none md:col-span-6 md:text-7xl">
            {t((d) => d.collection.heading)}
          </h2>
          <p className="max-w-measure text-[15px] leading-7 text-silver md:col-span-5 md:col-start-8 md:justify-self-end">
            {t((d) => d.collection.intro)}
          </p>
        </header>

        <ul className="grid gap-20 md:grid-cols-2 md:gap-10 lg:gap-16">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} onOpen={openProduct} />
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {activeProduct && (
          <ProductModal
            key={activeProduct.id}
            product={activeProduct}
            onClose={closeProduct}
            onJoinWaitlist={joinWaitlist}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
