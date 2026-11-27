import { describe, expect, it } from 'vitest'

import { encontrarVizinhos, selecionarOutrosProjetos } from './vizinhos-projeto.util'

const PROJETOS = [
  { slug: 'a', categoria: 'CURTA' },
  { slug: 'b', categoria: 'EVENTO' },
  { slug: 'c', categoria: 'CURTA' },
  { slug: 'd', categoria: 'AEREO' },
]

describe('encontrarVizinhos', () => {
  it('devolve anterior e próximo', () => {
    expect(encontrarVizinhos(PROJETOS, 'b')).toEqual({
      anterior: PROJETOS[0],
      proximo: PROJETOS[2],
    })
  })

  it('volta ao início nas pontas da lista', () => {
    expect(encontrarVizinhos(PROJETOS, 'a')?.anterior.slug).toBe('d')
    expect(encontrarVizinhos(PROJETOS, 'd')?.proximo.slug).toBe('a')
  })

  it('devolve undefined para slug desconhecido ou lista com um item', () => {
    expect(encontrarVizinhos(PROJETOS, 'x')).toBeUndefined()
    expect(encontrarVizinhos([PROJETOS[0] as (typeof PROJETOS)[0]], 'a')).toBeUndefined()
  })
})

describe('selecionarOutrosProjetos', () => {
  it('prioriza a mesma categoria e nunca inclui o atual', () => {
    const atual = PROJETOS[0] as (typeof PROJETOS)[0]
    expect(selecionarOutrosProjetos(PROJETOS, atual, 3).map((p) => p.slug)).toEqual(['c', 'b', 'd'])
  })

  it('respeita a quantidade pedida', () => {
    const atual = PROJETOS[3] as (typeof PROJETOS)[0]
    expect(selecionarOutrosProjetos(PROJETOS, atual, 2)).toHaveLength(2)
  })
})
