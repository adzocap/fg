'use client';

import { AnimatePresence, m } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { isWhatsappConfigured, whatsappUrl } from '@/lib/contact';

/**
 * Quiet floating concierge, bottom-right. It stays out of the way of the
 * hero and appears once the visitor starts browsing the pieces. Hidden
 * automatically while a sheet or menu is open (see globals.css).
 */
export function WhatsAppConcierge() {
  const { t, ts, dictionary } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isWhatsappConfigured) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * 0.6);
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

  if (!isWhatsappConfigured) return null;

  return (
    <AnimatePresence>
      {visible && (
        <m.a
          key="concierge"
          data-floating-concierge
          href={whatsappUrl(dictionary.whatsapp.greeting)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ts((d) => d.whatsapp.label)}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-float flex h-14 items-center gap-3 border border-hairline bg-charcoal/90 px-4 text-white backdrop-blur-md transition-[border-color,opacity] duration-400 hover:border-white/40 sm:right-6 md:bottom-6"
        >
          <MessageCircle aria-hidden size={22} strokeWidth={1.25} />
          <span className="hidden text-[11px] uppercase tracking-[0.24em] md:inline">{t((d) => d.whatsapp.short)}</span>
        </m.a>
      )}
    </AnimatePresence>
  );
}
