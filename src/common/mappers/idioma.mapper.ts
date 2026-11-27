import type { TIdioma } from '../i18n/idioma.constant'

interface IDadosIdioma {
  /** Valor do atributo lang e do hreflang. */
  tag: string
  /** Formato aceito pelo Open Graph. */
  openGraph: string
  /** Rótulo curto exibido no seletor. */
  rotulo: string
  /** Nome do idioma escrito nele mesmo, lido por leitores de tela. */
  nome: string
}

export const IdiomaMapper: Record<TIdioma, IDadosIdioma> = {
  pt: { tag: 'pt-BR', openGraph: 'pt_BR', rotulo: 'PT', nome: 'Português' },
  en: { tag: 'en', openGraph: 'en_US', rotulo: 'EN', nome: 'English' },
}
