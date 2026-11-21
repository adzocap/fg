import { Collection } from '@/components/Collection';
import { CraftsmanshipStrip } from '@/components/CraftsmanshipStrip';
import { DropWaitlist } from '@/components/DropWaitlist';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import { WhatsAppConcierge } from '@/components/WhatsAppConcierge';
import { products } from '@/data/products';
import { instagramUrl, siteConfig } from '@/data/site';

/** Structured data so search engines understand the brand and its pieces. */
function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        sameAs: [instagramUrl],
        address: { '@type': 'PostalAddress', addressLocality: 'Istanbul', addressCountry: 'TR' },
      },
      ...products.map((product) => ({
        '@type': 'Product',
        '@id': `${siteConfig.url}/#piece-${product.id}`,
        name: product.title.en,
        description: product.story[0]?.en ?? product.tagline.en,
        brand: { '@id': `${siteConfig.url}/#organization` },
        ...(product.images[0] ? { image: `${siteConfig.url}${product.images[0].src}` } : {}),
        offers: {
          '@type': 'Offer',
          price: product.price.TRY,
          priceCurrency: 'TRY',
          availability:
            product.edition.remaining > 0 ? 'https://schema.org/LimitedAvailability' : 'https://schema.org/SoldOut',
          url: `${siteConfig.url}/#piece-${product.id}`,
        },
      })),
    ],
  };
}

export default function HomePage() {
  // Evaluated once at build time, so the static HTML and the client agree.
  const year = new Date().getFullYear();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()).replace(/</g, '\\u003c') }}
      />
      <Navbar />
      <main id="main">
        <Hero />
        <Collection />
        <CraftsmanshipStrip />
        <DropWaitlist />
      </main>
      <Footer year={year} />
      <WhatsAppConcierge />
    </>
  );
}
