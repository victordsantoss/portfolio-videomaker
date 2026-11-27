import { describe, expect, it } from 'vitest'

import { criarAlternativasIdioma, listarLocalesAlternativos } from './metadados.util'

describe('criarAlternativasIdioma', () => {
  it('monta canonical e hreflang de uma página interna', () => {
    expect(criarAlternativasIdioma('/projetos/norte', 'en')).toEqual({
      canonical: '/en/projetos/norte',
      languages: {
        'pt-BR': '/pt/projetos/norte',
        en: '/en/projetos/norte',
        'x-default': '/pt/projetos/norte',
      },
    })
  })

  it('trata a página inicial sem barra sobrando', () => {
    expect(criarAlternativasIdioma('/', 'pt').canonical).toBe('/pt')
  })
})

describe('listarLocalesAlternativos', () => {
  it('lista os outros idiomas no formato do Open Graph', () => {
    expect(listarLocalesAlternativos('pt')).toEqual(['en_US'])
  })
})
