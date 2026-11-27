import type { IDicionario } from './dicionario.type'
import { DICIONARIO_EN } from './dicionarios/en.dicionario'
import { DICIONARIO_PT } from './dicionarios/pt.dicionario'
import type { TIdioma } from './idioma.constant'

const DICIONARIOS: Record<TIdioma, IDicionario> = {
  pt: DICIONARIO_PT,
  en: DICIONARIO_EN,
}

/** Devolve os textos de interface do idioma. Os dicionários são estáticos e entram no build. */
export function obterDicionario(idioma: TIdioma): IDicionario {
  return DICIONARIOS[idioma]
}
