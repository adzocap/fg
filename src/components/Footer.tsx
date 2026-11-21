'use client';

import { useLanguage } from '@/context/LanguageContext';
import { instagramUrl, siteConfig } from '@/data/site';

/** Section 5 — footer. `year` is passed from the server so it is fixed at build time. */
export function Footer({ year }: { year: number }) {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-hairline">
      <div className="shell grid gap-10 py-14 md:grid-cols-12 md:py-20">
        <div className="md:col-span-6">
          <p className="text-xs tracking-wordmark text-white">VANTA EDITIONS</p>
          <p className="mt-5 max-w-sm text-[15px] leading-7 text-silver">{t((d) => d.footer.tagline)}</p>
        </div>

        <div className="md:col-span-3">
          <h2 className="label text-silver">{t((d) => d.footer.contact)}</h2>
          <a href={`mailto:${siteConfig.email}`} className="link-quiet mt-3 inline-flex min-h-11 items-center text-[15px] text-white">
            {siteConfig.email}
          </a>
        </div>

        <div className="md:col-span-3">
          <h2 className="label text-silver">{t((d) => d.footer.follow)}</h2>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-quiet mt-3 inline-flex min-h-11 items-center text-[15px] text-white"
          >
            Instagram @{siteConfig.instagramHandle}
          </a>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="shell flex flex-col gap-2 py-6 pb-24 text-xs text-silver sm:flex-row sm:items-center sm:justify-between md:pb-6">
          <p>
            © {year} {siteConfig.name}. {t((d) => d.footer.rights)}
          </p>
          <p>{t((d) => d.hero.location)}</p>
        </div>
      </div>
    </footer>
  );
}
