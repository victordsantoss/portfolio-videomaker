'use client'

import { MoonIcon, SunIcon } from 'lucide-react'

import { aplicarEsquemaCor, obterEsquemaCorAtivo } from '@/infrastructure/tema/esquema-cor'

interface IProps {
  textos: {
    temaClaro: string
    temaEscuro: string
  }
}

/**
 * Alterna entre claro e escuro. O ícone e o rótulo vêm do CSS (classe dark no html),
 * então o botão já nasce certo, sem esperar a hidratação.
 */
export function AlternadorTema({ textos }: Readonly<IProps>) {
  const alternar = () => {
    aplicarEsquemaCor(obterEsquemaCorAtivo() === 'escuro' ? 'claro' : 'escuro')
  }

  return (
    <button
      type="button"
      onClick={alternar}
      className="inline-flex size-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground md:size-9"
    >
      <SunIcon aria-hidden="true" strokeWidth={1.5} className="hidden size-[1.125rem] dark:block" />
      <MoonIcon aria-hidden="true" strokeWidth={1.5} className="size-[1.125rem] dark:hidden" />
      <span className="sr-only dark:hidden">{textos.temaEscuro}</span>
      <span className="sr-only hidden dark:inline">{textos.temaClaro}</span>
    </button>
  )
}
