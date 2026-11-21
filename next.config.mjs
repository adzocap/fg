/**
 * VANTA EDITIONS — Next.js configuration
 *
 * `output: 'export'` turns the whole site into plain static files in `/out`,
 * so it can be hosted for $0/month on Vercel or Cloudflare Pages.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // The Next.js image optimizer needs a server. Static export serves the
    // files in /public as they are, so export product photos at the right size
    // (see README → "Adding real product photos").
    unoptimized: true,
  },
};

export default nextConfig;
