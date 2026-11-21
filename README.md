# VANTA EDITIONS — storefront

Single-page, bilingual (TR | EN) gallery storefront for limited-edition 3D shadowbox art.
Next.js 16 (App Router, static export) · TypeScript (strict) · Tailwind CSS 3 · Framer Motion · lucide-react.
The whole site builds to plain files in `out/`, so hosting costs $0/month on Vercel or Cloudflare Pages.

---

## 1. Run it

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → ./out
npm run preview    # serve ./out locally
npm run typecheck
```

### Starting from an empty folder instead

These are the exact commands the project was created with:

```bash
mkdir vanta-editions && cd vanta-editions
npm init -y
npm i next@16.4.6 react@19 react-dom@19 framer-motion lucide-react
npm i -D typescript@5 @types/node @types/react @types/react-dom tailwindcss@3 postcss autoprefixer
```

Then copy in every file from this repository. Tailwind is pinned to v3 so the design tokens can live in `tailwind.config.ts`.

---

## 2. What you edit (no component changes needed)

| What | File |
| --- | --- |
| Stock (`remaining`), prices (₺ and $), Shopier links, photos, specs, product copy | `src/data/products.ts` |
| All interface copy in Turkish and English | `src/data/translations.ts` |
| WhatsApp number, Instagram handle, email, default language | `src/data/site.ts` |
| Waitlist destination | `NEXT_PUBLIC_WAITLIST_ENDPOINT` env variable |

### Before going live, set these placeholders

1. **WhatsApp number**: `src/data/site.ts` → `whatsappNumber`, digits only, e.g. `905321234567`.
   While it's a placeholder, all WhatsApp buttons stay hidden.
2. **Shopier links**: `src/data/products.ts` → `checkout.tr` for each piece.
   While a link still contains `REPLACE_`, the order button goes to WhatsApp instead (or to email if WhatsApp isn't set either), so a buyer never lands on a dead page.
3. **International checkout**: `checkout.en` is `null`, which means English-speaking buyers order through the WhatsApp concierge with a pre-filled message. Paste a second link there if you set up international Shopier.
4. **Waitlist endpoint**: see section 4.

### Stock and selling out

Change `edition.remaining`. The badge (`EDITION 01/05 — 3 REMAINING` / `SERİ 01/05 — SON 3 ADET`) and the edition ledger in the detail sheet update automatically. At `0`, the piece shows as sold out and the order button turns into "Join the Drop 02 waitlist".

### Adding real product photos

1. Export square JPG or WebP images, about 1600 × 1600 px and under 300 KB each.
2. Put them in `public/products/`.
3. List them in the product's `images` array (there's a commented example in `products.ts`).

The first image replaces the drawn placeholder everywhere. With two or more images, the detail sheet shows thumbnails.

### Linking straight to a piece

`https://vantaeditions.com/#piece-money-laundering` and `#piece-in-case-of-emergency` open that piece's detail sheet. Use them in Instagram stories or DMs. The phone's back button closes the sheet instead of leaving the site.

---

## 3. Architecture notes

**Static export.** `next.config.mjs` sets `output: 'export'` and `images.unoptimized: true`. There's no server and nothing to pay for.

**Hydration-safe bilingual system.**
- A tiny inline script in `<head>` (`src/lib/i18n.ts`) runs before first paint. A saved choice in `localStorage` (`vanta-lang`) wins; otherwise a browser language starting with `tr` gives Turkish and anything else gives English. The script writes the result to `<html lang>` and `<html data-lang>`.
- The static HTML carries visible copy in **both** languages (`<span data-l="tr">…<span data-l="en">…`). A CSS rule keyed on `html[data-lang]` shows only the visitor's language from the very first frame, so there's no flash of the wrong language and no hidden page while JavaScript loads.
- `LanguageContext` reads the language through `useSyncExternalStore`. The server render and the hydration pass both use the default language, so markup always matches; right after hydration React switches to the real value and renders one language only.
- Switching TR | EN is instant, updates `<html lang>` (so CSS uppercasing renders Turkish İ correctly), persists to `localStorage`, and syncs other open tabs.
- In components: `t(d => d.section.key)` for visible UI copy, `l(product.field)` for product copy, `price(product.price)` for prices, and `ts` / `ls` for plain strings in attributes. The Turkish dictionary is type-checked against the English one, so a missing key is a build error.

**Performance.**
- The hero entrance uses CSS keyframes, not JavaScript, so the headline (the LCP element) animates from first paint.
- Framer Motion loads through `LazyMotion` + `m` components with the `domAnimation` feature set. It's used for the gallery "lights on" reveal, the sheet and menu transitions, and the waitlist states. Animations touch only `transform` and `opacity`.
- Fonts come from `next/font/google`, self-hosted at build time with fallback metrics to prevent layout shift. The `latin-ext` subset covers Turkish characters.

**Accessibility.** Product sheet and mobile menu: `role="dialog"`, `aria-modal`, Escape and backdrop to close, focus trapped inside and returned to the trigger, page scroll locked (reference-counted). 44 px minimum tap targets, visible gold focus rings, skip link, `prefers-reduced-motion` respected.

**SEO.** Metadata and Open Graph/Twitter cards (`public/og-image.jpg`), canonical URL, `robots.txt`, `sitemap.xml`, favicon and Apple touch icon, and JSON-LD for the organisation and each piece (price, availability).

### Design system

| Token | Value | Use |
| --- | --- | --- |
| `obsidian` | `#0A0A0A` | Page background |
| `charcoal` / `charcoal-raised` | `#141414` / `#161616` | Sheets, inputs |
| `hairline` | `#222222` | All borders and dividers |
| `white` | `#FFFFFF` | Primary type |
| `silver` | `#888888` | Secondary type |
| `gold` | `#C9A84C` | Edition numbers, active nav item, focus ring, success check (nothing else) |

Type: **Bodoni Moda** (a sharp Didone with an optical-size axis) for headlines, titles and prices, paired with **Jost** (an architectural geometric sans) for interface and body copy. To use Cormorant Garamond and Inter instead, change the two imports at the top of `src/app/layout.tsx`.

The design idea is that the lights come on. On load, the gallery light dims up over the hero, and each artwork's spotlight comes up as it scrolls into view. Product information is set like museum wall labels. All other motion is a response to the visitor's own actions.

### Folder structure

```
src/
  app/            layout.tsx, page.tsx, globals.css, not-found.tsx, robots.ts, sitemap.ts, icon.svg, apple-icon.png
  components/     Navbar, Hero, Collection, ProductCard, ProductModal, CraftsmanshipStrip,
                  DropWaitlist, Footer, WhatsAppConcierge, Providers
    art/          ShadowboxArt (Drop 01 placeholders), IlluminatedTeaserArt (Drop 02)
    ui/           ProductVisual, EditionBadge, EditionLedger, LanguageSwitch
  context/        LanguageContext.tsx
  data/           products.ts, translations.ts, site.ts
  hooks/          useBodyScrollLock, useFocusTrap, useActiveSection
  lib/            i18n.ts, format.ts, contact.ts, waitlist.ts
  types/          index.ts
```

---

## 4. Connecting the waitlist

The form sends a JSON `POST` (`email`, `language`, `drop`, `source`, `submittedAt`) to whatever URL you put in `NEXT_PUBLIC_WAITLIST_ENDPOINT`.

- **Formspree (easiest):** create a form, then set the variable to `https://formspree.io/f/<your-id>`.
- **Make / Zapier / n8n webhook:** paste the webhook URL. From there you can add each email to Google Sheets, Mailchimp and so on.
- **Resend:** this needs a secret API key, which must never be in a static site. Put it in a small serverless function (Vercel Function or Cloudflare Worker) and point the variable at that function.

Locally, copy `.env.example` to `.env.local`. On the hosting dashboard, add the variable and redeploy, because it's baked in at build time.
In `npm run dev` without an endpoint, sign-ups are simulated so you can test the form. In a production build without an endpoint, the form shows an error rather than losing emails silently.

---

## 5. Deploy for free

### Vercel
1. Push the project to a GitHub repository.
2. On vercel.com, choose **Add New → Project** and import the repo. The framework is detected as Next.js; keep the defaults.
3. Add `NEXT_PUBLIC_WAITLIST_ENDPOINT` under **Settings → Environment Variables**.
4. Deploy, then add `vantaeditions.com` under **Settings → Domains** and follow the DNS instructions.

### Cloudflare Pages
1. Push to GitHub. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git**.
2. Build command: `npm run build`. Build output directory: `out`.
3. Environment variables: `NODE_VERSION` = `20` (or newer), plus `NEXT_PUBLIC_WAITLIST_ENDPOINT`.
4. Deploy, then add the custom domain under **Custom domains**.

Every edit to `products.ts` (stock, price, links) followed by a push redeploys the site automatically in about a minute.
