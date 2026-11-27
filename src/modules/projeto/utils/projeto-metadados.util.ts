import type { Metadata } from 'next'

import type { TIdioma } from '@/common/i18n/idioma.constant'
import { IdiomaMapper } from '@/common/mappers/idioma.mapper'
import type { IProjetoModel } from '@/common/models/projeto.model'
import { criarAlternativasIdioma, listarLocalesAlternativos } from '@/common/utils/metadados.util'

import { caminhoProjetoSemIdioma } from '../domain/navegacao.constant'

/** Metadados da página de um projeto: título, resumo, hreflang e capa no Open Graph. */
export function gerarMetadadosProjeto(projeto: IProjetoModel, idioma: TIdioma): Metadata {
  const alternativas = criarAlternativasIdioma(caminhoProjetoSemIdioma(projeto.slug), idioma)

  return {
    title: projeto.titulo,
    description: projeto.resumo,
    alternates: alternativas,
    openGraph: {
      type: 'article',
      title: projeto.titulo,
      description: projeto.resumo,
      url: alternativas.canonical,
      locale: IdiomaMapper[idioma].openGraph,
      alternateLocale: listarLocalesAlternativos(idioma),
      images: [
        {
          url: `${projeto.capa.url}?w=1200&h=630&fit=crop&q=80`,
          width: 1200,
          height: 630,
          alt: projeto.capa.alt,
        },
      ],
    },
    twitter: { card: 'summary_large_image' },
  }
}
