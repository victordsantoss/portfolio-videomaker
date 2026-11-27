import type { MetadataRoute } from 'next'

import { projetoService } from '@/api/resources/projeto/server/projeto.service'
import { IDIOMAS } from '@/common/i18n/idioma.constant'
import { criarAlternativasIdioma } from '@/common/utils/metadados.util'
import { envServidor } from '@/infrastructure/env/server.env'
import { caminhoProjetoSemIdioma } from '@/modules/projeto'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await projetoService.listarSlugs()
  const caminhos = ['/', ...slugs.map(caminhoProjetoSemIdioma)]

  return caminhos.flatMap((caminho) =>
    IDIOMAS.map((idioma) => {
      const { canonical, languages } = criarAlternativasIdioma(caminho, idioma)
      return {
        url: new URL(canonical, envServidor.URL_SITE).toString(),
        changeFrequency: 'monthly' as const,
        priority: caminho === '/' ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            Object.entries(languages).map(([tag, url]) => [
              tag,
              new URL(url, envServidor.URL_SITE).toString(),
            ]),
          ),
        },
      }
    }),
  )
}
