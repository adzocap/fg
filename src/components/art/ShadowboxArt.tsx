import { useId } from 'react';
import type { ArtworkVariant } from '@/types';

/**
 * Hand-drawn SVG stand-ins for the two Drop 01 pieces, shown until real
 * photography is listed in src/data/products.ts.
 *
 * Drawn face-on: a 40 × 40 cm matte black frame, 6 cm side walls in slight
 * perspective, a back panel lit from above, the objects floating in front
 * of it with their shadows, and lettering on the front glass.
 */

interface ShadowboxArtProps {
  variant: ArtworkVariant;
  label: string;
  className?: string;
}

function useSvgIds(prefix: string) {
  // React ids contain characters that break url(#…) references.
  const raw = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return (name: string) => `${prefix}-${raw}-${name}`;
}

export function ShadowboxArt({ variant, label, className }: ShadowboxArtProps) {
  const id = useSvgIds('sb');

  return (
    <svg viewBox="0 0 400 400" role="img" aria-label={label} className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id('frame')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1a1a" />
          <stop offset="1" stopColor="#0c0c0c" />
        </linearGradient>
        <radialGradient id={id('back')} cx="0.5" cy="0.08" r="0.95">
          <stop offset="0" stopColor="#202020" />
          <stop offset="0.55" stopColor="#111111" />
          <stop offset="1" stopColor="#090909" />
        </radialGradient>
        <linearGradient id={id('topShade')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.75" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id('glass')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.09" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.015" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id('note')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b3b79f" />
          <stop offset="1" stopColor="#7c8270" />
        </linearGradient>
        <linearGradient id={id('gold')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f1dc93" />
          <stop offset="0.45" stopColor="#c9a84c" />
          <stop offset="1" stopColor="#8a6a22" />
        </linearGradient>
        <linearGradient id={id('goldFront')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a8852f" />
          <stop offset="1" stopColor="#5f4714" />
        </linearGradient>
        <linearGradient id={id('cigar')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6b4630" />
          <stop offset="0.5" stopColor="#3f2717" />
          <stop offset="1" stopColor="#1f130b" />
        </linearGradient>
        <filter id={id('shadow')} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* Frame face */}
      <rect x="0" y="0" width="400" height="400" fill={`url(#${id('frame')})`} />
      <rect x="0.5" y="0.5" width="399" height="399" fill="none" stroke="#262626" strokeWidth="1" />

      {/* Back panel and the 6 cm walls */}
      <rect x="40" y="40" width="320" height="320" fill={`url(#${id('back')})`} />
      <polygon points="22,22 378,22 360,40 40,40" fill="#040404" />
      <polygon points="22,22 40,40 40,360 22,378" fill="#090909" />
      <polygon points="378,22 378,378 360,360 360,40" fill="#0c0c0c" />
      <polygon points="22,378 40,360 360,360 378,378" fill="#1b1b1b" />
      <rect x="40" y="40" width="320" height="46" fill={`url(#${id('topShade')})`} />

      {variant === 'money-laundering' ? <MoneyLaundering id={id} /> : <Emergency id={id} />}

      {/* Gold plaque */}
      <g transform="translate(316 346)">
        <rect x="-20" y="-5" width="40" height="10" fill={`url(#${id('gold')})`} />
        <text
          x="0"
          y="2.4"
          textAnchor="middle"
          fontSize="6"
          letterSpacing="1"
          fill="#3d2f0f"
          style={{ fontFamily: 'var(--font-jost), sans-serif' }}
        >
          01/05
        </text>
      </g>

      {/* Front glass */}
      <polygon points="22,22 210,22 22,230" fill={`url(#${id('glass')})`} />
      <line x1="30" y1="150" x2="150" y2="30" stroke="#fff" strokeOpacity="0.05" strokeWidth="1" />
      <rect x="22" y="22" width="356" height="356" fill="none" stroke="#2c2c2c" strokeWidth="0.75" />
    </svg>
  );
}

type IdFn = (name: string) => string;

const NOTE_POSITIONS: ReadonlyArray<{ x: number; y: number; r: number }> = [
  { x: 82, y: 132, r: -3 },
  { x: 141, y: 136, r: 2 },
  { x: 200, y: 137, r: -1 },
  { x: 259, y: 136, r: 3 },
  { x: 318, y: 132, r: -2 },
];

function Banknote({ id }: { id: IdFn }) {
  return (
    <>
      <rect x="-15" y="12" width="42" height="92" fill="#000" opacity="0.7" filter={`url(#${id('shadow')})`} />
      <rect x="-21" y="2" width="42" height="92" fill={`url(#${id('note')})`} />
      <rect x="-17" y="6" width="34" height="84" fill="none" stroke="#5b6152" strokeWidth="0.6" />
      <ellipse cx="0" cy="52" rx="9" ry="12" fill="#8f9482" stroke="#5b6152" strokeWidth="0.6" />
      <path d="M-13 74 H13 M-13 78 H13 M-13 82 H9" stroke="#6a705f" strokeWidth="0.5" />
      <text
        x="0"
        y="24"
        textAnchor="middle"
        fontSize="8"
        fill="#4c5245"
        style={{ fontFamily: 'var(--font-bodoni), serif' }}
      >
        100
      </text>
      <rect x="-4" y="-5" width="8" height="13" fill="#151515" stroke="#3b3b3b" strokeWidth="0.5" />
      <line x1="-4" y1="1" x2="4" y2="1" stroke="#3b3b3b" strokeWidth="0.5" />
    </>
  );
}

function MoneyLaundering({ id }: { id: IdFn }) {
  return (
    <g>
      {/* Cord */}
      <path d="M40 128 Q200 146 360 128" fill="none" stroke="#000" strokeWidth="1.8" />
      <path d="M40 127.2 Q200 145.2 360 127.2" fill="none" stroke="#3a3a3a" strokeWidth="0.5" />
      {NOTE_POSITIONS.map((note) => (
        <g key={note.x} transform={`translate(${note.x} ${note.y}) rotate(${note.r})`}>
          <Banknote id={id} />
        </g>
      ))}
      <text
        x="200"
        y="304"
        textAnchor="middle"
        fontSize="12.5"
        letterSpacing="5"
        fill="#ffffff"
        fillOpacity="0.92"
        style={{ fontFamily: 'var(--font-jost), sans-serif' }}
      >
        MONEY LAUNDERING
      </text>
    </g>
  );
}

function Emergency({ id }: { id: IdFn }) {
  return (
    <g>
      {/* Banded stack of prop currency */}
      <rect x="222" y="190" width="112" height="72" fill="#000" opacity="0.65" filter={`url(#${id('shadow')})`} />
      <rect x="212" y="178" width="110" height="50" fill={`url(#${id('note')})`} />
      <rect x="216" y="182" width="102" height="42" fill="none" stroke="#5b6152" strokeWidth="0.6" />
      {Array.from({ length: 8 }, (_, index) => (
        <rect
          key={index}
          x="212"
          y={228 + index * 3}
          width="110"
          height="3"
          fill={index % 2 === 0 ? '#8c917e' : '#6b7161'}
        />
      ))}
      <rect x="252" y="178" width="26" height="74" fill="#d9d3c0" />
      <text
        x="265"
        y="217"
        textAnchor="middle"
        fontSize="6"
        fill="#5d5747"
        style={{ fontFamily: 'var(--font-jost), sans-serif' }}
      >
        10 000
      </text>

      {/* Gold bullion */}
      <ellipse cx="150" cy="276" rx="72" ry="7" fill="#000" opacity="0.8" filter={`url(#${id('shadow')})`} />
      <polygon points="104,212 196,212 212,240 88,240" fill={`url(#${id('gold')})`} />
      <polygon points="88,240 212,240 206,272 94,272" fill={`url(#${id('goldFront')})`} />
      <line x1="88" y1="240" x2="212" y2="240" stroke="#f6e6ad" strokeOpacity="0.6" strokeWidth="0.75" />
      <g style={{ fontFamily: 'var(--font-jost), sans-serif' }} fill="#7a5d1b" textAnchor="middle">
        <text x="150" y="223" fontSize="5.5" letterSpacing="1.5">
          FINE GOLD
        </text>
        <text x="150" y="232" fontSize="7.5" letterSpacing="1">
          999.9
        </text>
      </g>

      {/* Cigar */}
      <g transform="translate(258 282) rotate(-12)">
        <rect x="-64" y="2" width="132" height="13" rx="6.5" fill="#000" opacity="0.7" filter={`url(#${id('shadow')})`} />
        <rect x="-70" y="-7" width="140" height="14" rx="7" fill={`url(#${id('cigar')})`} />
        <rect x="34" y="-7" width="14" height="14" fill={`url(#${id('gold')})`} />
        <rect x="-70" y="-7" width="7" height="14" rx="3" fill="#4a4a4a" />
      </g>

      {/* Lettering on the glass */}
      <g style={{ fontFamily: 'var(--font-jost), sans-serif' }} fill="#ffffff" textAnchor="middle">
        <text x="200" y="96" fontSize="12" letterSpacing="4.5" fillOpacity="0.92">
          IN CASE OF EMERGENCY
        </text>
        <text x="200" y="326" fontSize="15" letterSpacing="8" fillOpacity="0.95">
          BREAK GLASS
        </text>
      </g>
    </g>
  );
}
