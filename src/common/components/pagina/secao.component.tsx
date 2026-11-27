import type { ReactNode } from 'react'

import { cn } from '../../utils/classes.util'

interface IProps {
  id: string
  titulo: string
  children: ReactNode
  /** Conteúdo ao lado do título em telas largas (ex.: uma descrição curta). */
  complemento?: ReactNode
  className?: string
}

/** Bloco de seção com título h2, espaçamento vertical e largura padrão do site. */
export function Secao({ id, titulo, children, complemento, className }: Readonly<IProps>) {
  const idTitulo = `${id}-titulo`

  return (
    <section id={id} aria-labelledby={idTitulo} className={cn('moldura py-24 md:py-36', className)}>
      <div className="mb-12 grid gap-4 md:mb-20 md:grid-cols-12 md:items-end">
        <h2 id={idTitulo} className="titulo-secao text-[1.75rem] md:col-span-6 md:text-[2.25rem]">
          {titulo}
        </h2>
        {complemento ? (
          <div className="max-w-md text-muted-foreground md:col-span-5 md:col-start-8">
            {complemento}
          </div>
        ) : null}
      </div>
      {children}
    </section>
  )
}
