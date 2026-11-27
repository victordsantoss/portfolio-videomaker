import { describe, expect, it } from 'vitest'

import { CategoriaProjetoEnum } from '@/common/enums/projeto.enum'
import type { IProjetoModel } from '@/common/models/projeto.model'

import { gerarMetadadosProjeto } from './projeto-metadados.util'

const PROJETO: IProjetoModel = {
  slug: 'norte',
  titulo: 'North',
  categoria: CategoriaProjetoEnum.AEREO,
  ano: 2024,
  local: 'Patagonia',
  resumo: 'An aerial series.',
  contexto: '',
  objetivo: '',
  papel: '',
  capa: { url: 'https://images.unsplash.com/photo-1', alt: 'Mountain' },
  registros: [],
  creditos: [],
  ehDestaque: true,
}

describe('gerarMetadadosProjeto', () => {
  it('usa título e resumo do projeto no idioma da página', () => {
    const metadados = gerarMetadadosProjeto(PROJETO, 'en')
    expect(metadados.title).toBe('North')
    expect(metadados.description).toBe('An aerial series.')
  })

  it('aponta canonical e hreflang para o detalhe em cada idioma', () => {
    expect(gerarMetadadosProjeto(PROJETO, 'en').alternates).toMatchObject({
      canonical: '/en/projetos/norte',
      languages: { 'pt-BR': '/pt/projetos/norte' },
    })
  })

  it('usa a capa recortada para o Open Graph', () => {
    const { openGraph } = gerarMetadadosProjeto(PROJETO, 'pt')
    expect(openGraph).toMatchObject({ locale: 'pt_BR', alternateLocale: ['en_US'] })
    expect(JSON.stringify(openGraph)).toContain('w=1200&h=630')
  })
})
