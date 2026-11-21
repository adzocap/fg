'use client';

import { AnimatePresence, m } from 'framer-motion';
import { Check, LoaderCircle } from 'lucide-react';
import { useId, useState, type FormEvent } from 'react';
import { IlluminatedTeaserArt } from '@/components/art/IlluminatedTeaserArt';
import { useLanguage } from '@/context/LanguageContext';
import type { Dictionary } from '@/data/translations';
import { submitWaitlist, validateEmail } from '@/lib/waitlist';
import type { WaitlistStatus } from '@/types';

type ErrorKey = 'empty' | 'invalid' | 'network';

const ERROR_COPY: Readonly<Record<ErrorKey, (d: Dictionary) => string>> = {
  empty: (d) => d.waitlist.errorEmpty,
  invalid: (d) => d.waitlist.errorInvalid,
  network: (d) => d.waitlist.errorNetwork,
};

const EASE = [0.22, 1, 0.36, 1] as const;

/** Section 4 — Drop 02 teaser and early-access sign-up. */
export function DropWaitlist() {
  const { t, ts, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<WaitlistStatus>('idle');
  const [error, setError] = useState<ErrorKey | null>(null);
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const privacyId = `${inputId}-privacy`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;

    const validation = validateEmail(email);
    if (validation !== 'ok') {
      setError(validation);
      return;
    }

    // Bots fill hidden fields; pretend it worked and send nothing.
    if (honeypot) {
      setStatus('success');
      return;
    }

    setError(null);
    setStatus('submitting');
    try {
      await submitWaitlist({ email, language });
      setStatus('success');
    } catch (submissionError) {
      console.error('[waitlist]', submissionError);
      setError('network');
      setStatus('error');
    }
  }

  const submitting = status === 'submitting';

  return (
    <section
      id="drop-02"
      aria-labelledby="drop-02-heading"
      className="relative overflow-hidden border-t border-hairline py-20 md:py-28"
    >
      <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-7">
          <IlluminatedTeaserArt label={ts((d) => d.waitlist.artLabel)} className="h-auto w-full" />
        </div>

        <div className="lg:col-span-5">
          <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-silver">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#ff3b2b] shadow-[0_0_10px_2px_rgba(255,59,43,0.6)]" />
            {t((d) => d.waitlist.status)}
          </p>
          <h2 id="drop-02-heading" className="mt-5 font-display text-6xl leading-none md:text-7xl">
            {t((d) => d.waitlist.heading)}
          </h2>
          <p className="mt-3 font-display text-2xl italic text-white/85">{t((d) => d.waitlist.title)}</p>
          <p className="mt-6 max-w-measure text-[15px] leading-7 text-silver">{t((d) => d.waitlist.body)}</p>

          <div className="mt-10 min-h-[11rem]">
            <AnimatePresence mode="wait" initial={false}>
              {status === 'success' ? (
                <m.div
                  key="success"
                  role="status"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex gap-4 border border-hairline p-6"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-gold text-gold">
                    <Check aria-hidden size={18} strokeWidth={1.25} />
                  </span>
                  <div>
                    <p className="font-display text-2xl">{t((d) => d.waitlist.successTitle)}</p>
                    <p className="mt-2 text-caption text-silver">{t((d) => d.waitlist.successBody)}</p>
                  </div>
                </m.div>
              ) : (
                <m.form
                  key="form"
                  noValidate
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <label htmlFor={inputId} className="label block text-silver">
                    {t((d) => d.waitlist.label)}
                  </label>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                    <input
                      id={inputId}
                      type="email"
                      name="email"
                      inputMode="email"
                      autoComplete="email"
                      autoCapitalize="none"
                      spellCheck={false}
                      maxLength={254}
                      required
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        if (error) setError(null);
                      }}
                      placeholder={ts((d) => d.waitlist.placeholder)}
                      aria-invalid={error === 'empty' || error === 'invalid'}
                      aria-describedby={error ? `${errorId} ${privacyId}` : privacyId}
                      disabled={submitting}
                      className={`h-14 min-w-0 flex-1 border bg-charcoal px-4 text-base text-white transition-colors duration-400 placeholder:text-silver/50 focus:border-white/70 disabled:opacity-60 ${
                        error === 'empty' || error === 'invalid' ? 'border-white/60' : 'border-hairline'
                      }`}
                    />
                    <button type="submit" disabled={submitting} className="btn-solid shrink-0">
                      {submitting ? (
                        <>
                          <LoaderCircle aria-hidden size={16} strokeWidth={1.5} className="animate-spin-slow" />
                          {t((d) => d.waitlist.submitting)}
                        </>
                      ) : (
                        t((d) => d.waitlist.submit)
                      )}
                    </button>
                  </div>

                  {/* Honeypot: invisible to people, tempting to bots. */}
                  <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label>
                      Company
                      <input
                        type="text"
                        name="company"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(event) => setHoneypot(event.target.value)}
                      />
                    </label>
                  </div>

                  <p id={errorId} role="alert" className="mt-3 min-h-5 text-caption text-white">
                    {error ? t(ERROR_COPY[error]) : null}
                  </p>
                  <p id={privacyId} className="mt-1 text-xs leading-5 text-silver">
                    {t((d) => d.waitlist.privacy)}
                  </p>
                </m.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
