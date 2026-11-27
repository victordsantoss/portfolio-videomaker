import { describe, expect, it } from 'vitest'

import {
  criarLinkEmail,
  criarLinkInstagram,
  criarLinkWhatsapp,
  formatarTelefone,
} from './contato.util'

describe('criarLinkEmail', () => {
  it('monta o mailto com assunto codificado', () => {
    expect(criarLinkEmail('a@b.com', 'Novo projeto')).toBe('mailto:a@b.com?subject=Novo%20projeto')
  })

  it('omite o assunto quando não informado', () => {
    expect(criarLinkEmail('a@b.com')).toBe('mailto:a@b.com')
  })
})

describe('criarLinkWhatsapp', () => {
  it('mantém só os dígitos do número', () => {
    expect(criarLinkWhatsapp('+55 (61) 91234-5678')).toBe('https://wa.me/5561912345678')
  })

  it('inclui a mensagem inicial codificada', () => {
    expect(criarLinkWhatsapp('5561912345678', 'Olá!')).toBe(
      'https://wa.me/5561912345678?text=Ol%C3%A1!',
    )
  })
})

describe('criarLinkInstagram', () => {
  it('remove o @ do usuário', () => {
    expect(criarLinkInstagram('@perfil')).toBe('https://www.instagram.com/perfil/')
  })
})

describe('formatarTelefone', () => {
  it('formata celular brasileiro com DDI', () => {
    expect(formatarTelefone('5561912345678')).toBe('+55 61 91234-5678')
  })

  it('devolve o valor original quando não reconhece o formato', () => {
    expect(formatarTelefone('123')).toBe('123')
  })
})
