'use client';

import { AnimatePresence, m } from 'framer-motion';
import { X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { useLanguage } from '@/context/LanguageContext';
import { instagramUrl, siteConfig } from '@/data/site';
import type { Dictionary } from '@/data/translations';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useFocusTrap } from '@/hooks/useFocusTrap';

interface NavLink {
  id: string;
  select: (d: Dictionary) => string;
}

const LINKS: readonly NavLink[] = [
  { id: 'drop-01', select: (d) => d.nav.drop01 },
  { id: 'craft', select: (d) => d.nav.craft },
  { id: 'drop-02', select: (d) => d.nav.drop02 },
];

const SECTION_IDS = LINKS.map((link) => link.id);
const EASE = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const { t, ts } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <a
        href="#main"
        className="label fixed left-4 top-3 z-overlay -translate-y-24 bg-white px-4 py-3 text-obsidian transition-transform focus:translate-y-0"
      >
        {t((d) => d.meta.skipToContent)}
      </a>

      <header className="fixed inset-x-0 top-0 z-nav">
        <div
          className={`border-b transition-[background-color,border-color,backdrop-filter] duration-600 ease-gallery ${
            scrolled
              ? 'border-hairline bg-obsidian/70 backdrop-blur-xl backdrop-saturate-150'
              : 'border-transparent bg-transparent'
          }`}
        >
          <div className="shell flex h-16 items-center justify-between gap-4">
            <a
              href="#top"
              aria-label={ts((d) => d.nav.home)}
              className="flex h-11 items-center whitespace-nowrap text-[11px] font-normal tracking-wordmark text-white sm:text-xs"
            >
              VANTA EDITIONS
            </a>

            <nav aria-label={ts((d) => d.nav.main)} className="hidden md:block">
              <ul className="flex items-center gap-10">
                {LINKS.map((link) => {
                  const isActive = active === link.id;
                  return (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        aria-current={isActive ? 'location' : undefined}
                        className={`label relative flex h-11 items-center transition-colors duration-400 ease-gallery hover:text-white ${
                          isActive ? 'text-white' : 'text-silver'
                        }`}
                      >
                        {t(link.select)}
                        <span
                          aria-hidden
                          className={`absolute inset-x-0 bottom-2 h-px origin-left bg-gold transition-transform duration-600 ease-gallery ${
                            isActive ? 'scale-x-100' : 'scale-x-0'
                          }`}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-1">
              <LanguageSwitch />
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label={ts((d) => d.nav.openMenu)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[7px] md:hidden"
              >
                <span aria-hidden className="h-px w-6 bg-white" />
                <span aria-hidden className="h-px w-6 bg-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, ts, hydrated } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(open);
  useFocusTrap(panelRef, open, onClose);

  // Portals need document.body, which only exists after hydration.
  if (!hydrated) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <m.div
          key="mobile-menu"
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={ts((d) => d.nav.main)}
          tabIndex={-1}
          className="fixed inset-0 z-overlay flex flex-col bg-obsidian"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="shell flex h-16 items-center justify-between">
            <span className="text-[11px] tracking-wordmark text-white">VANTA EDITIONS</span>
            <div className="flex items-center gap-1">
              <LanguageSwitch />
              <button
                type="button"
                onClick={onClose}
                aria-label={ts((d) => d.nav.closeMenu)}
                className="-mr-2 flex h-11 w-11 items-center justify-center text-white"
              >
                <X aria-hidden size={22} strokeWidth={1.25} />
              </button>
            </div>
          </div>

          <nav aria-label={ts((d) => d.nav.main)} className="shell flex flex-1 flex-col justify-center">
            <ul className="space-y-2">
              {LINKS.map((link, index) => (
                <m.li
                  key={link.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.08 + index * 0.06, ease: EASE }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={onClose}
                    className="block py-2 font-display text-5xl leading-tight text-white"
                  >
                    {t(link.select)}
                  </a>
                </m.li>
              ))}
            </ul>
          </nav>

          <div className="shell flex items-center justify-between border-t border-hairline py-6 pb-safe text-caption text-silver">
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="flex h-11 items-center">
              @{siteConfig.instagramHandle}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex h-11 items-center">
              {siteConfig.email}
            </a>
          </div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
