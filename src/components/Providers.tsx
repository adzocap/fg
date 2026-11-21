'use client';

import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';

/**
 * Client-side providers.
 * LazyMotion + `m` components keep Framer Motion's initial bundle small;
 * MotionConfig honours the visitor's reduced-motion setting everywhere.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </LanguageProvider>
  );
}
