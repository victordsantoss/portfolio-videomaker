import type { ReactNode } from 'react'

import { Ancoras } from '../../utils/rotas.util'

interface IProps {
  cabecalho: ReactNode
  rodape: ReactNode
  textoPularConteudo: string
  children: ReactNode
}

/** Casca do site: atalho para o conteúdo, cabeçalho, conteúdo principal e rodapé. */
export function SiteLayout({ cabecalho, rodape, textoPularConteudo, children }: Readonly<IProps>) {
  return (
    <div id={Ancoras.TOPO} className="flex min-h-dvh flex-col">
      <a
        href={`#${Ancoras.CONTEUDO}`}
        className="fixed top-3 left-3 z-[60] -translate-y-24 bg-primary px-4 py-2.5 text-primary-foreground text-sm focus:translate-y-0"
      >
        {textoPularConteudo}
      </a>
      {cabecalho}
      <main id={Ancoras.CONTEUDO} tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      {rodape}
    </div>
  )
}
