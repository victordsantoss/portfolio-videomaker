import type { MetadataRoute } from 'next'

import { envServidor } from '@/infrastructure/env/server.env'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: new URL('/sitemap.xml', envServidor.URL_SITE).toString(),
  }
}
