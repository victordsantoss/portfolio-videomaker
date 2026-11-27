import Link from 'next/link'

import { Quadro } from '@/common/components/quadro/quadro.component'
import type { IProjetoModel } from '@/common/models/projeto.model'
import { cn } from '@/common/utils/classes.util'

type TTamanhoCartao = 'destaque' | 'padrao' | 'compacto'

interface IProps {
  projeto: IProjetoModel
  href: string
  rotuloCategoria: string
  /** Proporção e largura do quadro, definidas pela composição de quem usa. */
  classeQuadro: string
  sizes: string
  tamanho?: TTamanhoCartao
  mostrarResumo?: boolean
  ehPrioritario?: boolean
  className?: string
}

const CLASSE_TITULO: Record<TTamanhoCartao, string> = {
  destaque: 'text-2xl md:text-[2.25rem]',
  padrao: 'text-xl md:text-[1.75rem]',
  compacto: 'text-lg md:text-xl',
}

/** Projeto como peça editorial: a mídia em primeiro plano e a ficha sempre visível, sem depender de hover. */
export function CartaoProjeto({
  projeto,
  href,
  rotuloCategoria,
  classeQuadro,
  sizes,
  tamanho = 'padrao',
  mostrarResumo = true,
  ehPrioritario = false,
  className,
}: Readonly<IProps>) {
  return (
    <article className={cn('group', className)}>
      <Link href={href} className="block outline-offset-8">
        <Quadro
          imagem={projeto.capa}
          sizes={sizes}
          className={classeQuadro}
          ehPrioritario={ehPrioritario}
          temZoomNoGrupo
        />
        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3 className={cn('titulo-secao', CLASSE_TITULO[tamanho])}>
            <span className="bg-[length:0%_1px] bg-linear-to-r bg-left-bottom bg-no-repeat from-current to-current pb-0.5 transition-[background-size] duration-500 ease-cinema group-hover:bg-[length:100%_1px] group-focus-visible:bg-[length:100%_1px]">
              {projeto.titulo}
            </span>
          </h3>
          <p className="numeros-tabulares flex gap-4 text-muted-foreground text-sm">
            <span>{rotuloCategoria}</span>
            <span>{projeto.ano}</span>
          </p>
        </div>
        {mostrarResumo ? (
          <p className="mt-2 line-clamp-2 max-w-md text-[0.95rem] text-muted-foreground">
            {projeto.resumo}
          </p>
        ) : null}
      </Link>
    </article>
  )
}
