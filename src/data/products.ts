import type { Product, ProductSpec } from '@/types';

/**
 * ─────────────────────────────────────────────────────────────────────
 *  PRODUCT CATALOGUE — the only file you need to edit to run a drop.
 * ─────────────────────────────────────────────────────────────────────
 *
 *  • Stock:   change `edition.remaining`. 0 marks the piece sold out and
 *             disables its order button automatically.
 *  • Prices:  `price.TRY` (Turkish visitors) and `price.USD` (everyone else).
 *  • Checkout: paste your Shopier product link into `checkout.tr`.
 *             `checkout.en` can be a second link, or `null` to send
 *             international buyers to the WhatsApp concierge.
 *             Links still containing "REPLACE_" are ignored and the button
 *             falls back to WhatsApp (or email), so nobody hits a dead page.
 *  • Photos:  drop files into /public/products and list them in `images`.
 *             While `images` is empty, the built-in illustration is shown.
 */

/** Rows that are identical for every piece in Drop 01. */
const frameSpecs = {
  dimensions: {
    label: { en: 'Dimensions', tr: 'Ölçüler' },
    value: { en: '40 × 40 × 6 cm', tr: '40 × 40 × 6 cm' },
  },
  frame: {
    label: { en: 'Frame', tr: 'Çerçeve' },
    value: { en: 'Matte black deep shadowbox', tr: 'Mat siyah derin shadowbox çerçeve' },
  },
  front: {
    label: { en: 'Front', tr: 'Ön yüz' },
    value: { en: 'Real glass, anti-glare', tr: 'Gerçek cam, yansıma önleyici' },
  },
  authentication: {
    label: { en: 'Authentication', tr: 'Orijinallik' },
    value: {
      en: 'Signed and numbered gold plaque, certificate included',
      tr: 'İmzalı ve numaralı altın plaka, sertifikalı',
    },
  },
  edition: {
    label: { en: 'Edition', tr: 'Seri' },
    value: { en: '5 pieces, never restocked', tr: '5 adet, asla yeniden üretilmez' },
  },
  origin: {
    label: { en: 'Made in', tr: 'Üretim' },
    value: { en: 'Handcrafted in Istanbul', tr: 'İstanbul’da el yapımı' },
  },
} as const satisfies Record<string, ProductSpec>;

function contents(en: string, tr: string): ProductSpec {
  return { label: { en: 'Contents', tr: 'İçerik' }, value: { en, tr } };
}

export const products: readonly Product[] = [
  {
    id: 'money-laundering',
    catalogNumber: '01',
    title: { en: 'Money Laundering', tr: 'Money Laundering' },
    tagline: { en: 'Capital, hung out to dry.', tr: 'Sermaye, kurumaya asıldı.' },
    medium: {
      en: 'Prop banknotes, matte black cord, precision mini clips, white lettering on real glass',
      tr: 'Dekor banknotlar, mat siyah ip, hassas mini mandallar, gerçek cam üzerine beyaz yazı',
    },
    story: [
      {
        en: 'A literal reading of a phrase nobody says out loud. High-detail prop banknotes hang from a taut matte black cord on precision mini clips, washed and pegged out to dry behind real glass.',
        tr: 'Kimsenin yüksek sesle söylemediği bir deyimin kelimesi kelimesine yorumu. Yüksek detaylı dekor banknotlar, gergin mat siyah bir ipe hassas mini mandallarla tutturulmuş; yıkanmış ve gerçek camın ardında kurumaya bırakılmış.',
      },
      {
        en: 'The frame is 6 cm deep, so every note casts its own shadow on the back panel and the piece changes with the light in the room. The title sits on the glass in clean white letters.',
        tr: 'Çerçeve 6 cm derinliğinde; her banknot arka panele kendi gölgesini düşürür ve eser odanın ışığıyla birlikte değişir. Eserin adı, camın üzerinde sade beyaz harflerle yer alır.',
      },
    ],
    dimensions: '40 × 40 × 6 cm',
    edition: { series: 1, size: 5, remaining: 3 },
    price: { TRY: 2850, USD: 95 },
    checkout: {
      tr: 'https://www.shopier.com/REPLACE_WITH_MONEY_LAUNDERING_LINK',
      en: null,
    },
    images: [
      // Example once photos exist:
      // {
      //   src: '/products/money-laundering-01.jpg',
      //   alt: { en: 'Money Laundering shadowbox, front view', tr: 'Money Laundering shadowbox, önden görünüm' },
      //   width: 1600,
      //   height: 1600,
      // },
    ],
    artwork: 'money-laundering',
    specs: [
      frameSpecs.dimensions,
      frameSpecs.frame,
      frameSpecs.front,
      contents(
        'High-detail prop notes, matte black cord, precision mini clips',
        'Yüksek detaylı dekor banknotlar, mat siyah ip, hassas mini mandallar',
      ),
      frameSpecs.authentication,
      frameSpecs.edition,
      frameSpecs.origin,
    ],
  },
  {
    id: 'in-case-of-emergency',
    catalogNumber: '02',
    title: { en: 'In Case of Emergency', tr: 'In Case of Emergency' },
    tagline: { en: 'Break glass only when it matters.', tr: 'Camı yalnızca gerçekten gerektiğinde kırın.' },
    medium: {
      en: 'Metallic gold bullion prop, prop currency stack, cigar, lettering on real glass',
      tr: 'Metalik altın külçe dekoru, dekor para destesi, puro, gerçek cam üzerine yazı',
    },
    story: [
      {
        en: 'An emergency kit for someone who has already made it. A metallic gold bullion prop, a banded stack of prop currency and a single cigar, arranged with gallery precision inside a 6 cm deep matte black frame.',
        tr: 'Çoktan başarmış biri için bir acil durum kiti. Metalik altın külçe dekoru, bantlı bir dekor para destesi ve tek bir puro; 6 cm derinliğindeki mat siyah çerçevenin içinde galeri titizliğiyle yerleştirilmiş.',
      },
      {
        en: 'The instruction is printed crisply on the front glass: in case of emergency, break glass. Whether you ever do is your business.',
        tr: 'Talimat ön camda net harflerle yazılı: In case of emergency, break glass. Camı kırıp kırmamak size kalmış.',
      },
    ],
    dimensions: '40 × 40 × 6 cm',
    edition: { series: 1, size: 5, remaining: 4 },
    price: { TRY: 3250, USD: 110 },
    checkout: {
      tr: 'https://www.shopier.com/REPLACE_WITH_IN_CASE_OF_EMERGENCY_LINK',
      en: null,
    },
    images: [],
    artwork: 'emergency',
    specs: [
      frameSpecs.dimensions,
      frameSpecs.frame,
      frameSpecs.front,
      contents(
        'Metallic gold bullion prop, prop currency stack, cigar accent',
        'Metalik altın külçe dekoru, dekor para destesi, puro aksesuarı',
      ),
      frameSpecs.authentication,
      frameSpecs.edition,
      frameSpecs.origin,
    ],
  },
];

export function findProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
