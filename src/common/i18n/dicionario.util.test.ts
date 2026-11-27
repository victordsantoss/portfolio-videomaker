import { describe, expect, it } from 'vitest'

import { CategoriaProjetoEnum } from '../enums/projeto.enum'
import { obterDicionario } from './dicionario.util'
import { IDIOMAS } from './idioma.constant'

/** Lista os caminhos de todas as folhas de um objeto, para comparar a estrutura dos idiomas. */
function listarChaves(objeto: object, prefixo = ''): string[] {
  return Object.entries(objeto).flatMap(([chave, valor]) =>
    typeof valor === 'object' && valor !== null
      ? listarChaves(valor, `${prefixo}${chave}.`)
      : [`${prefixo}${chave}`],
  )
}

describe('obterDicionario', () => {
  it('devolve o dicionário do idioma pedido', () => {
    expect(obterDicionario('pt').navegacao.trabalhos).toBe('Trabalhos')
    expect(obterDicionario('en').navegacao.trabalhos).toBe('Work')
  })

  it('mantém as mesmas chaves em todos os idiomas', () => {
    const [referencia, ...outros] = IDIOMAS.map((idioma) => listarChaves(obterDicionario(idioma)))
    for (const chaves of outros) expect(chaves).toEqual(referencia)
  })

  it('não deixa textos vazios', () => {
    for (const idioma of IDIOMAS) {
      const textos = Object.values(obterDicionario(idioma).categorias)
      expect(textos).toHaveLength(Object.keys(CategoriaProjetoEnum).length)
      expect(textos.every((texto) => texto.trim().length > 0)).toBe(true)
    }
  })
})
