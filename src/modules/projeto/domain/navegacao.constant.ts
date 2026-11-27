import type { TIdioma } from '@/common/i18n/idioma.constant'

/** Caminho do detalhe de um projeto, sem o prefixo de idioma (usado em hreflang). */
export function caminhoProjetoSemIdioma(slug: string): string {
  return `/projetos/${slug}`
}

export const ProjetoPaginas = {
  detalhe: (idioma: TIdioma, slug: string) => `/${idioma}${caminhoProjetoSemIdioma(slug)}`,
}
