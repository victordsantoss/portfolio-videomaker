/** Idiomas publicados. O primeiro segmento da URL é sempre um destes valores. */
export const IDIOMAS = ['pt', 'en'] as const

export type TIdioma = (typeof IDIOMAS)[number]

export const IDIOMA_PADRAO: TIdioma = 'pt'
