import type { ReactNode } from 'react'
import Link from 'next/link'

import { MenuMobile } from './menu-mobile.component'
import type { IItemNavegacao } from './navegacao.type'

interface IProps {
  nome: string
  hrefInicio: string
  textos: {
    rotuloNavegacao: string
    rotuloInicio: string
    abrirMenu: string
    fecharMenu: string
    menu: string
  }
  itens: IItemNavegacao[]
  /** Controles de preferência (idioma e tema), montados por quem usa o cabeçalho. */
  acoes: ReactNode
}

export function CabecalhoSite({ nome, hrefInicio, textos, itens, acoes }: Readonly<IProps>) {
  return (
    <header className="sticky top-0 z-40 border-border/70 border-b bg-background">
      <div className="moldura flex h-16 items-center justify-between gap-6">
        <Link
          href={hrefInicio}
          aria-label={`${nome}, ${textos.rotuloInicio}`}
          className="titulo-secao text-[0.95rem] tracking-tight transition-opacity hover:opacity-70"
        >
          {nome}
        </Link>

        <div className="flex items-center gap-1 md:gap-8">
          <nav aria-label={textos.rotuloNavegacao} className="hidden md:block">
            <ul className="flex items-center gap-7">
              {itens.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group relative py-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
                  >
                    {item.rotulo}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-1 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-cinema group-hover:scale-x-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 md:border-border md:border-l md:pl-5">
            {acoes}
          </div>

          <MenuMobile
            itens={itens}
            textos={{
              rotuloNavegacao: textos.rotuloNavegacao,
              abrirMenu: textos.abrirMenu,
              fecharMenu: textos.fecharMenu,
              menu: textos.menu,
            }}
          />
        </div>
      </div>
    </header>
  )
}
