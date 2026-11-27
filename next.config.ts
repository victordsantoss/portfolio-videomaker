import type { NextConfig } from 'next'

import { IDIOMA_PADRAO, IDIOMAS } from './src/common/i18n/idioma.constant'

const EH_DESENVOLVIMENTO = process.env.NODE_ENV === 'development'
const EH_PREVIEW_VERCEL = process.env.VERCEL_ENV === 'preview'

/** Domínios externos liberados. Novos domínios de mídia entram aqui e em images.remotePatterns. */
const ORIGENS_IMAGEM = ['https://images.unsplash.com']
const ORIGENS_VIDEO = ['https://www.youtube-nocookie.com', 'https://player.vimeo.com']
const ORIGENS_FERRAMENTA_PREVIEW = EH_PREVIEW_VERCEL ? ['https://vercel.live'] : []

const POLITICA_CONTEUDO = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${EH_DESENVOLVIMENTO ? " 'unsafe-eval'" : ''} ${ORIGENS_FERRAMENTA_PREVIEW.join(' ')}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${ORIGENS_IMAGEM.join(' ')}`,
  "font-src 'self'",
  `frame-src ${[...ORIGENS_VIDEO, ...ORIGENS_FERRAMENTA_PREVIEW].join(' ')}`,
  `connect-src 'self' ${ORIGENS_FERRAMENTA_PREVIEW.join(' ')}`,
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(process.env.VERCEL ? ['upgrade-insecure-requests'] : []),
].join('; ')

/** Caminhos que não levam prefixo de idioma: idiomas, assets do Next e arquivos de SEO. */
const CAMINHOS_SEM_IDIOMA = [
  ...IDIOMAS.map((idioma) => `${idioma}(?:/|$)`),
  '_next',
  'api',
  'icon',
  'apple-icon',
  'favicon\\.ico',
  'robots\\.txt',
  'sitemap\\.xml',
  'manifest\\.webmanifest',
  '\\.well-known',
].join('|')

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: ORIGENS_IMAGEM.map((origem) => new URL(`${origem}/**`)),
  },
  async redirects() {
    return [
      { source: '/', destination: `/${IDIOMA_PADRAO}`, permanent: false },
      {
        source: `/:caminho((?!${CAMINHOS_SEM_IDIOMA}).+)`,
        destination: `/${IDIOMA_PADRAO}/:caminho`,
        permanent: false,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:caminho*',
        headers: [
          { key: 'Content-Security-Policy', value: POLITICA_CONTEUDO },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
