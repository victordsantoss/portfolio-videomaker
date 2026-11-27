import type { Metadata } from 'next'

import type { TIdioma } from '@/common/i18n/idioma.constant'
import { IdiomaMapper } from '@/common/mappers/idioma.mapper'
import type { IImagemModel } from '@/common/models/midia.model'
import { criarAlternativasIdioma, listarLocalesAlternativos } from '@/common/utils/metadados.util'

interface IDadosMetadadosInicio {
  idioma: TIdioma
  nome: string
  especialidade: string
  descricao: string
  imagem: IImagemModel
}

/** Metadados da página inicial: o título é o nome e a especialidade, sem o template do site. */
export function gerarMetadadosInicio(dados: IDadosMetadadosInicio): Metadata {
  const titulo = `${dados.nome}, ${dados.especialidade.toLocaleLowerCase(IdiomaMapper[dados.idioma].tag)}`
  const alternativas = criarAlternativasIdioma('/', dados.idioma)

  return {
    title: { absolute: titulo },
    description: dados.descricao,
    alternates: alternativas,
    openGraph: {
      type: 'website',
      title: titulo,
      description: dados.descricao,
      url: alternativas.canonical,
      siteName: dados.nome,
      locale: IdiomaMapper[dados.idioma].openGraph,
      alternateLocale: listarLocalesAlternativos(dados.idioma),
      images: [
        {
          url: `${dados.imagem.url}?w=1200&h=630&fit=crop&q=80`,
          width: 1200,
          height: 630,
          alt: dados.imagem.alt,
        },
      ],
    },
    twitter: { card: 'summary_large_image' },
  }
}
