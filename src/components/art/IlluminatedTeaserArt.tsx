'use client';

import { m } from 'framer-motion';
import { useId } from 'react';

/**
 * Drop 02 teaser: a smoked-glass panel with the faint rear silhouette of a
 * sports car and a red COB LED light bar. The bar powers on once, when the
 * panel scrolls into view — the section's only motion.
 */
export function IlluminatedTeaserArt({ label, className }: { label: string; className?: string }) {
  const raw = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const id = (name: string) => `il-${raw}-${name}`;

  return (
    <svg viewBox="0 0 640 400" role="img" aria-label={label} className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id('panel')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#121212" />
          <stop offset="1" stopColor="#070707" />
        </linearGradient>
        <linearGradient id={id('body')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#262626" stopOpacity="0.9" />
          <stop offset="1" stopColor="#262626" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id('glow')} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ff2b1c" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ff2b1c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('bar')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff3b2b" stopOpacity="0" />
          <stop offset="0.08" stopColor="#ff3b2b" />
          <stop offset="0.92" stopColor="#ff3b2b" />
          <stop offset="1" stopColor="#ff3b2b" stopOpacity="0" />
        </linearGradient>
        <filter id={id('blurWide')} x="-20%" y="-300%" width="140%" height="700%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id={id('blurTight')} x="-10%" y="-200%" width="120%" height="500%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
        <linearGradient id={id('glass')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.06" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="640" height="400" fill={`url(#${id('panel')})`} />

      {/* Silhouette: roofline, rear window, haunches */}
      <g fill="none" stroke={`url(#${id('body')})`} strokeWidth="1.5">
        <path d="M128 262 C 168 196, 238 150, 320 146 C 402 150, 472 196, 512 262" />
        <path d="M206 232 C 236 196, 276 178, 320 176 C 364 178, 404 196, 434 232 Z" />
        <path d="M64 330 C 70 296, 104 270, 150 264 L 490 264 C 536 270, 570 296, 576 330" />
        <path d="M150 330 H 490" />
      </g>

      {/* Light bar */}
      <m.g
        initial={{ opacity: 0.06 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <ellipse cx="320" cy="284" rx="290" ry="70" fill={`url(#${id('glow')})`} />
        <rect x="80" y="280" width="480" height="8" fill="#ff2b1c" filter={`url(#${id('blurWide')})`} />
        <rect x="88" y="281.5" width="464" height="5" fill="#ff3b2b" filter={`url(#${id('blurTight')})`} />
        <rect x="96" y="282.5" width="448" height="3" fill={`url(#${id('bar')})`} />
        <rect x="140" y="283.4" width="360" height="1" fill="#ffd2cc" fillOpacity="0.85" />
      </m.g>

      {/* Smoked glass */}
      <rect width="640" height="400" fill={`url(#${id('glass')})`} />
      <rect x="0.5" y="0.5" width="639" height="399" fill="none" stroke="#222" />
    </svg>
  );
}
