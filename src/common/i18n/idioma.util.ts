import { IDIOMAS, type TIdioma } from './idioma.constant'

/** Confere se um valor vindo da URL é um idioma publicado. */
export function ehIdiomaValido(valor: unknown): valor is TIdioma {
  return typeof valor === 'string' && (IDIOMAS as readonly string[]).includes(valor)
}

/**
 * Troca o idioma no início de um caminho, preservando o resto da página.
 * @example trocarIdiomaDoCaminho('/pt/projetos/norte', 'en') // '/en/projetos/norte'
 */
export function trocarIdiomaDoCaminho(caminho: string, idioma: TIdioma): string {
  const [, primeiroSegmento = '', ...resto] = caminho.split('/')
  const segmentos = ehIdiomaValido(primeiroSegmento) ? resto : [primeiroSegmento, ...resto]
  const complemento = segmentos.filter(Boolean).join('/')
  return complemento ? `/${idioma}/${complemento}` : `/${idioma}`
}
