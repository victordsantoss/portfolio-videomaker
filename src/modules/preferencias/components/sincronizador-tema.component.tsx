'use client'

import { useLayoutEffect } from 'react'

import { sincronizarEsquemaCor } from '@/infrastructure/tema/esquema-cor'

/**
 * O script do <head> só roda no carregamento completo. Ao trocar de idioma, o React recria o layout
 * raiz e devolve ao <html> os atributos do servidor; este efeito reaplica o tema antes da pintura.
 */
export function SincronizadorTema() {
  useLayoutEffect(() => {
    sincronizarEsquemaCor()
  }, [])

  return null
}
