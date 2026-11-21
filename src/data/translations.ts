import type { Language } from '@/types';

/**
 * Every piece of interface copy, in both languages.
 *
 * The English dictionary defines the shape; the Turkish one must match it
 * exactly (TypeScript will flag a missing or misspelled key).
 * Product copy lives in src/data/products.ts.
 */
const en = {
  meta: {
    skipToContent: 'Skip to content',
  },
  nav: {
    home: 'VANTA EDITIONS, back to top',
    main: 'Main',
    drop01: 'Drop 01',
    craft: 'Craft',
    drop02: 'Drop 02',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
  },
  hero: {
    title: 'Drop 01',
    limit: 'Limited to 5 pieces',
    subtitle:
      'Three-dimensional shadowbox art, assembled by hand in Istanbul. Every piece is numbered, signed and never restocked.',
    cta: 'Explore Drop 01',
    location: 'Istanbul',
  },
  collection: {
    heading: 'Drop 01',
    intro: 'Two works, five pieces of each. When an edition sells out, it stays sold out.',
    viewPiece: 'View piece',
    openDetails: (title: string) => `View details for ${title}`,
  },
  edition: {
    label: 'Edition',
    remaining: (count: number) => `${count} remaining`,
    soldOut: 'sold out',
    catalog: (number: string) => `N° ${number}`,
    ledgerTitle: 'Edition ledger',
    available: 'Available',
    acquired: 'Acquired',
    ledgerSummary: (remaining: number, size: number) =>
      remaining === 0 ? `All ${size} pieces have been acquired.` : `${remaining} of ${size} pieces still available.`,
  },
  product: {
    dialogLabel: (title: string) => `${title}, piece details`,
    close: 'Close',
    concept: 'Concept',
    specifications: 'Specifications',
    price: 'Price',
    acquire: 'Acquire piece',
    inquire: 'Ask on WhatsApp',
    soldOutCta: 'Join the Drop 02 waitlist',
    checkoutShopier: 'Secure payment on Shopier.',
    checkoutConcierge:
      'International orders are arranged personally on WhatsApp, with insured shipping quoted to your address.',
    checkoutEmail: 'Orders are arranged personally by email.',
    shippingTitle: 'Breakage-guaranteed delivery',
    shippingBody:
      'Shipped from Istanbul in custom corner-protected foam packaging. If your piece arrives damaged, we replace it free of charge, immediately.',
    propNote: 'Currency and bullion in every piece are non-functional props.',
    artAlt: (title: string) => `${title}: illustration of the shadowbox`,
    imagePosition: (index: number, total: number) => `Image ${index} of ${total}`,
  },
  craft: {
    heading: 'Craft and guarantees',
    items: [
      {
        title: 'Numbered and certified',
        body: 'Five pieces per design, never reproduced. Each one carries a numbered gold plaque and comes with a signed certificate of authenticity.',
      },
      {
        title: 'Handcrafted in Istanbul',
        body: 'Assembled one at a time by hand in our Istanbul studio, inside a custom 6 cm deep matte black frame.',
      },
      {
        title: 'Breakage-guaranteed delivery',
        body: 'Packed in custom corner-protected foam. If anything arrives damaged, you get a free replacement right away.',
      },
    ],
  },
  waitlist: {
    heading: 'Drop 02',
    title: 'Illuminated 992 Edition',
    status: 'In the studio',
    body: 'A stealth matte black acrylic and glass wall piece, lit from behind by a red COB LED light bar. People on the list can acquire it before the public release.',
    label: 'Email address',
    placeholder: 'name@example.com',
    submit: 'Request early access',
    submitting: 'Requesting access',
    successTitle: 'Early access requested',
    successBody: 'We will email you before Drop 02 opens to the public.',
    privacy: 'Drop announcements only. Unsubscribe anytime.',
    errorEmpty: 'Enter your email address.',
    errorInvalid: 'Enter a full email address, like name@example.com.',
    errorNetwork:
      'Your request did not go through. Check your connection and try again, or message us on WhatsApp.',
    artLabel:
      'Drop 02 preview: the rear silhouette of a sports car behind smoked glass, crossed by a glowing red light bar.',
  },
  footer: {
    tagline: 'Limited-edition shadowbox art and collectible objects, made by hand in Istanbul.',
    contact: 'Contact',
    follow: 'Follow',
    rights: 'All rights reserved.',
  },
  whatsapp: {
    label: 'Message us on WhatsApp',
    short: 'WhatsApp',
    greeting: 'Hello VANTA EDITIONS, I would like to know more about Drop 01.',
    inquiry: (title: string, fraction: string) =>
      `Hello VANTA EDITIONS, I am interested in "${title}" (Edition ${fraction}). Is it still available?`,
    order: (title: string, fraction: string) =>
      `Hello VANTA EDITIONS, I would like to acquire "${title}" (Edition ${fraction}). My shipping country is: `,
    emailSubject: (title: string) => `Order: ${title}`,
  },
  notFound: {
    title: 'This page does not exist.',
    back: 'Back to the gallery',
  },
};

export type Dictionary = typeof en;

const tr: Dictionary = {
  meta: {
    skipToContent: 'İçeriğe geç',
  },
  nav: {
    home: 'VANTA EDITIONS, başa dön',
    main: 'Ana menü',
    drop01: 'Drop 01',
    craft: 'Zanaat',
    drop02: 'Drop 02',
    openMenu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
    language: 'Dil',
  },
  hero: {
    title: 'Drop 01',
    limit: 'Yalnızca 5 adet',
    subtitle:
      'İstanbul’da elle hazırlanan 3D shadowbox tablolar. Her eser numaralı, imzalı ve asla yeniden üretilmez.',
    cta: 'Koleksiyonu keşfet',
    location: 'İstanbul',
  },
  collection: {
    heading: 'Drop 01',
    intro: 'İki eser, her birinden beş adet. Bir seri tükendiğinde bir daha üretilmez.',
    viewPiece: 'Eseri incele',
    openDetails: (title: string) => `${title} detaylarını görüntüle`,
  },
  edition: {
    label: 'Seri',
    remaining: (count: number) => `son ${count} adet`,
    soldOut: 'tükendi',
    catalog: (number: string) => `N° ${number}`,
    ledgerTitle: 'Seri defteri',
    available: 'Mevcut',
    acquired: 'Satıldı',
    ledgerSummary: (remaining: number, size: number) =>
      remaining === 0
        ? `${size} parçanın tamamı satıldı.`
        : `${size} parçadan ${remaining} tanesi hâlâ mevcut.`,
  },
  product: {
    dialogLabel: (title: string) => `${title}, eser detayları`,
    close: 'Kapat',
    concept: 'Konsept',
    specifications: 'Teknik özellikler',
    price: 'Fiyat',
    acquire: 'Sipariş ver',
    inquire: 'WhatsApp’tan sor',
    soldOutCta: 'Drop 02 listesine katıl',
    checkoutShopier: 'Ödeme Shopier güvencesiyle.',
    checkoutConcierge: 'Siparişiniz WhatsApp üzerinden kişisel olarak alınır.',
    checkoutEmail: 'Siparişiniz e-posta üzerinden kişisel olarak alınır.',
    shippingTitle: 'Kırılmaya karşı garantili teslimat',
    shippingBody:
      'İstanbul’dan, köşe korumalı özel köpük ambalajla gönderilir. Eseriniz hasarlı ulaşırsa ücretsiz olarak hemen yenisini gönderiyoruz.',
    propNote: 'Eserlerdeki para ve külçeler işlevsiz dekor replikalarıdır.',
    artAlt: (title: string) => `${title}: shadowbox illüstrasyonu`,
    imagePosition: (index: number, total: number) => `Görsel ${index} / ${total}`,
  },
  craft: {
    heading: 'Zanaat ve güvenceler',
    items: [
      {
        title: 'Numaralı ve sertifikalı',
        body: 'Her tasarımdan yalnızca beş adet üretilir ve asla çoğaltılmaz. Her eser numaralı altın plaka taşır ve imzalı orijinallik sertifikasıyla gelir.',
      },
      {
        title: 'İstanbul’da el yapımı',
        body: 'İstanbul atölyemizde, 6 cm derinliğinde özel mat siyah çerçevenin içinde tek tek elle hazırlanır.',
      },
      {
        title: 'Kırılmaya karşı garantili teslimat',
        body: 'Köşe korumalı özel köpükle paketlenir. Hasarlı ulaşan her eser için ücretsiz ve hızlı değişim.',
      },
    ],
  },
  waitlist: {
    heading: 'Drop 02',
    title: 'Illuminated 992 Edition',
    status: 'Atölyede',
    body: 'Mat siyah akrilik ve camdan, arkasındaki kırmızı COB LED ışık barıyla aydınlanan gizemli bir duvar eseri. Listedekiler eseri herkesten önce satın alabilir.',
    label: 'E-posta adresi',
    placeholder: 'isim@ornek.com',
    submit: 'Erken erişim iste',
    submitting: 'Talep gönderiliyor',
    successTitle: 'Erken erişim talebiniz alındı',
    successBody: 'Drop 02 herkese açılmadan önce size e-posta göndereceğiz.',
    privacy: 'Yalnızca drop duyuruları. Dilediğiniz an listeden çıkabilirsiniz.',
    errorEmpty: 'E-posta adresinizi girin.',
    errorInvalid: 'Tam bir e-posta adresi girin, örneğin isim@ornek.com.',
    errorNetwork:
      'Talebiniz iletilemedi. Bağlantınızı kontrol edip tekrar deneyin ya da bize WhatsApp’tan yazın.',
    artLabel:
      'Drop 02 ön izlemesi: füme camın ardında bir spor otomobilin arka silüeti ve onu boydan boya kesen kırmızı ışık barı.',
  },
  footer: {
    tagline: 'İstanbul’da elle hazırlanan sınırlı sayıda shadowbox tablolar ve koleksiyon objeleri.',
    contact: 'İletişim',
    follow: 'Takip edin',
    rights: 'Tüm hakları saklıdır.',
  },
  whatsapp: {
    label: 'WhatsApp’tan bize yazın',
    short: 'WhatsApp',
    greeting: 'Merhaba VANTA EDITIONS, Drop 01 hakkında bilgi almak istiyorum.',
    inquiry: (title: string, fraction: string) =>
      `Merhaba VANTA EDITIONS, "${title}" (Seri ${fraction}) ile ilgileniyorum. Hâlâ mevcut mu?`,
    order: (title: string, fraction: string) =>
      `Merhaba VANTA EDITIONS, "${title}" (Seri ${fraction}) eserini sipariş etmek istiyorum.`,
    emailSubject: (title: string) => `Sipariş: ${title}`,
  },
  notFound: {
    title: 'Bu sayfa mevcut değil.',
    back: 'Galeriye dön',
  },
};

export const translations: Readonly<Record<Language, Dictionary>> = { en, tr };
