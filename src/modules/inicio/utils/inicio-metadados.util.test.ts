import { describe, expect, it } from 'vitest'

import { gerarMetadadosInicio } from './inicio-metadados.util'

const DADOS = {
  idioma: 'pt' as const,
  nome: 'Theo Arantes',
  especialidade: 'Filmmaker e diretor de fotografia',
  descricao: 'Portfólio.',
  imagem: { url: 'https://images.unsplash.com/photo-1', alt: 'Montanha' },
}

describe('gerarMetadadosInicio', () => {
  it('usa nome e especialidade como título absoluto', () => {
    expect(gerarMetadadosInicio(DADOS).title).toEqual({
      absolute: 'Theo Arantes, filmmaker e diretor de fotografia',
    })
  })

  it('aponta canonical e hreflang para a página inicial de cada idioma', () => {
    expect(gerarMetadadosInicio(DADOS).alternates).toEqual({
      canonical: '/pt',
      languages: { 'pt-BR': '/pt', en: '/en', 'x-default': '/pt' },
    })
  })

  it('declara o locale do Open Graph', () => {
    expect(gerarMetadadosInicio({ ...DADOS, idioma: 'en' }).openGraph).toMatchObject({
      locale: 'en_US',
      alternateLocale: ['pt_BR'],
    })
  })
})
