'use client';

import { useEffect } from 'react';

let lockCount = 0;
let savedHtmlOverflow = '';
let savedBodyOverflow = '';
let savedBodyPaddingRight = '';

/**
 * Locks page scrolling while an overlay is open. Reference-counted so the
 * menu and the product sheet can never unlock each other, and it pads the
 * body by the scrollbar width so desktop layouts do not jump.
 */
export function useBodyScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;

    const html = document.documentElement;
    const body = document.body;

    if (lockCount === 0) {
      const scrollbarWidth = window.innerWidth - html.clientWidth;
      savedHtmlOverflow = html.style.overflow;
      savedBodyOverflow = body.style.overflow;
      savedBodyPaddingRight = body.style.paddingRight;
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
      html.setAttribute('data-overlay', 'open');
    }
    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        html.style.overflow = savedHtmlOverflow;
        body.style.overflow = savedBodyOverflow;
        body.style.paddingRight = savedBodyPaddingRight;
        html.removeAttribute('data-overlay');
      }
    };
  }, [active]);
}
