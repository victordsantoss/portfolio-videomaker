import { describe, expect, it } from 'vitest'

import { formatarLinhaLog } from './logger.util'

describe('formatarLinhaLog', () => {
  const data = new Date('2026-01-01T00:00:00.000Z')

  it('gera uma linha JSON com data, nível e mensagem', () => {
    expect(JSON.parse(formatarLinhaLog('info', 'subiu', { porta: 3000 }, data))).toEqual({
      data: '2026-01-01T00:00:00.000Z',
      nivel: 'info',
      mensagem: 'subiu',
      porta: 3000,
    })
  })

  it('serializa erros com nome e mensagem', () => {
    const linha = JSON.parse(formatarLinhaLog('erro', 'falhou', { erro: new TypeError('x') }, data))
    expect(linha.erro).toEqual({ nome: 'TypeError', mensagem: 'x' })
  })
})
