import { siteConfig } from '@/data/site';
import type { Language } from '@/types';

/** Deliberately strict: something@domain.tld, no spaces, max 254 chars. */
const EMAIL_PATTERN = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;

export type EmailValidation = 'ok' | 'empty' | 'invalid';

export function validateEmail(raw: string): EmailValidation {
  const value = raw.trim();
  if (value.length === 0) return 'empty';
  if (value.length > 254 || !EMAIL_PATTERN.test(value)) return 'invalid';
  return 'ok';
}

export interface WaitlistPayload {
  email: string;
  language: Language;
}

const REQUEST_TIMEOUT_MS = 12_000;

/**
 * Sends a waitlist sign-up as JSON to NEXT_PUBLIC_WAITLIST_ENDPOINT.
 *
 * Works as-is with Formspree (https://formspree.io/f/xxxx), Getform,
 * Make/Zapier webhooks, or any endpoint that accepts a JSON POST.
 * Resend needs a secret key, so put it behind a small serverless function
 * and point the variable at that function instead.
 *
 * Without an endpoint, development builds simulate success so you can test
 * the UI; production builds report an error so sign-ups are never lost silently.
 */
export async function submitWaitlist(payload: WaitlistPayload): Promise<void> {
  const endpoint = siteConfig.waitlistEndpoint;

  if (!endpoint) {
    if (process.env.NODE_ENV !== 'production') {
      await new Promise((resolve) => setTimeout(resolve, 900));
      console.info('[waitlist] NEXT_PUBLIC_WAITLIST_ENDPOINT is not set — simulated success.', payload);
      return;
    }
    throw new Error('NEXT_PUBLIC_WAITLIST_ENDPOINT is not configured.');
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        email: payload.email.trim(),
        language: payload.language,
        drop: 'drop-02-illuminated-992',
        source: siteConfig.url,
        submittedAt: new Date().toISOString(),
        _subject: 'Drop 02 waitlist sign-up',
      }),
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`Waitlist request failed with status ${response.status}.`);
    }
  } finally {
    window.clearTimeout(timeout);
  }
}
