import { IDIOMA_PADRAO, IDIOMAS, type TIdioma } from '../i18n/idioma.constant'
import { IdiomaMapper } from '../mappers/idioma.mapper'

interface IAlternativasIdioma {
  canonical: string
  languages: Record<string, string>
}

/**
 * Monta o canonical e os links hreflang de uma página publicada em todos os idiomas.
 * @example criarAlternativasIdioma('/projetos/norte', 'en').canonical // '/en/projetos/norte'
 */
export function criarAlternativasIdioma(
  caminhoSemIdioma: string,
  idioma: TIdioma,
): IAlternativasIdioma {
  const caminho = (alvo: TIdioma) => `/${alvo}${caminhoSemIdioma === '/' ? '' : caminhoSemIdioma}`
  const languages = Object.fromEntries(
    IDIOMAS.map((alvo) => [IdiomaMapper[alvo].tag, caminho(alvo)]),
  )

  return {
    canonical: caminho(idioma),
    languages: { ...languages, 'x-default': caminho(IDIOMA_PADRAO) },
  }
}

/** Locales alternativos do Open Graph, sem o idioma atual. */
export function listarLocalesAlternativos(idioma: TIdioma): string[] {
  return IDIOMAS.filter((alvo) => alvo !== idioma).map((alvo) => IdiomaMapper[alvo].openGraph)
}
