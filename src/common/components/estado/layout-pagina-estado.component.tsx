import type { ReactNode } from 'react'

interface IProps {
  titulo: string
  descricao: string
  acoes: ReactNode
}

/** Casca compartilhada das telas de erro e de página não encontrada. */
export function LayoutPaginaEstado({ titulo, descricao, acoes }: Readonly<IProps>) {
  return (
    <div className="moldura flex min-h-[70dvh] flex-col justify-center py-24">
      <div className="max-w-3xl">
        <h1 className="titulo-cinema text-[clamp(2.5rem,7vw,5.5rem)]">{titulo}</h1>
        <p className="mt-8 max-w-lg text-muted-foreground">{descricao}</p>
        <div className="mt-12 flex flex-wrap items-center gap-6">{acoes}</div>
      </div>
    </div>
  )
}
