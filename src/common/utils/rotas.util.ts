import type { TIdioma } from '../i18n/idioma.constant'

/** Âncoras das seções da página inicial, usadas na navegação e nos ids das seções. */
export const Ancoras = {
  CONTEUDO: 'conteudo-principal',
  TOPO: 'topo',
  TRABALHOS: 'trabalhos',
  SOBRE: 'sobre',
  CONTATO: 'contato',
} as const

export type TAncora = (typeof Ancoras)[keyof typeof Ancoras]

/** Rotas conhecidas do site. Rotas internas de um módulo ficam no domain dele. */
export const Rotas = {
  inicio: (idioma: TIdioma) => `/${idioma}`,
  secao: (idioma: TIdioma, ancora: TAncora) => `/${idioma}#${ancora}`,
}
