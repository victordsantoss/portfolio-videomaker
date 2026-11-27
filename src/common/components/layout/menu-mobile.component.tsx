'use client'

import { useState } from 'react'
import { MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'

import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'
import type { IItemNavegacao } from './navegacao.type'

interface IProps {
  itens: IItemNavegacao[]
  textos: {
    rotuloNavegacao: string
    abrirMenu: string
    fecharMenu: string
    menu: string
  }
}

/** Navegação em tela cheia para telas pequenas. Fecha ao escolher um destino. */
export function MenuMobile({ itens, textos }: Readonly<IProps>) {
  const [estaAberto, setEstaAberto] = useState(false)

  return (
    <Sheet open={estaAberto} onOpenChange={setEstaAberto}>
      <SheetTrigger
        aria-label={textos.abrirMenu}
        className="-mr-2 inline-flex size-11 items-center justify-center text-foreground md:hidden"
      >
        <MenuIcon className="size-5" strokeWidth={1.5} aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full gap-0 border-l-0 bg-background p-0 shadow-none data-[side=right]:w-full data-[side=right]:sm:max-w-md"
      >
        <div className="moldura flex h-16 items-center justify-between">
          <SheetTitle className="text-muted-foreground text-sm font-normal">
            {textos.menu}
          </SheetTitle>
          <SheetClose
            aria-label={textos.fecharMenu}
            className="-mr-2 inline-flex size-11 items-center justify-center"
          >
            <XIcon className="size-5" strokeWidth={1.5} aria-hidden="true" />
          </SheetClose>
        </div>
        <nav
          aria-label={textos.rotuloNavegacao}
          className="moldura flex flex-1 flex-col justify-center pb-24"
        >
          <ul className="flex flex-col gap-2">
            {itens.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setEstaAberto(false)}
                  className="titulo-cinema block py-2 text-[clamp(2.5rem,11vw,3.75rem)] transition-colors hover:text-destaque"
                >
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
