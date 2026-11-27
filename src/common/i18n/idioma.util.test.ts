import { describe, expect, it } from 'vitest'

import { ehIdiomaValido, trocarIdiomaDoCaminho } from './idioma.util'

describe('ehIdiomaValido', () => {
  it('aceita os idiomas publicados', () => {
    expect(ehIdiomaValido('pt')).toBe(true)
    expect(ehIdiomaValido('en')).toBe(true)
  })

  it('recusa valores fora da lista', () => {
    expect(ehIdiomaValido('es')).toBe(false)
    expect(ehIdiomaValido(undefined)).toBe(false)
    expect(ehIdiomaValido('PT')).toBe(false)
  })
})

describe('trocarIdiomaDoCaminho', () => {
  it('troca o idioma preservando a página atual', () => {
    expect(trocarIdiomaDoCaminho('/pt/projetos/norte', 'en')).toBe('/en/projetos/norte')
  })

  it('trata a página inicial', () => {
    expect(trocarIdiomaDoCaminho('/pt', 'en')).toBe('/en')
    expect(trocarIdiomaDoCaminho('/', 'pt')).toBe('/pt')
  })

  it('adiciona o idioma quando o caminho não tem prefixo', () => {
    expect(trocarIdiomaDoCaminho('/projetos/norte', 'en')).toBe('/en/projetos/norte')
  })

  it('ignora barra final', () => {
    expect(trocarIdiomaDoCaminho('/en/', 'pt')).toBe('/pt')
  })
})
