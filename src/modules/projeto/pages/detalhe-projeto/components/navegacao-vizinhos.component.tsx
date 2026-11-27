import Link from 'next/link'

interface IVizinho {
  href: string
  titulo: string
}

interface IProps {
  anterior: IVizinho
  proximo: IVizinho
  textos: {
    anterior: string
    proximo: string
    rotulo: string
  }
}

/** Anterior e próximo como títulos grandes, para seguir assistindo sem voltar à lista. */
export function NavegacaoVizinhos({ anterior, proximo, textos }: Readonly<IProps>) {
  return (
    <nav aria-label={textos.rotulo} className="border-border border-y">
      <div className="moldura grid md:grid-cols-2">
        <Link
          href={anterior.href}
          rel="prev"
          className="group flex flex-col gap-3 border-border border-b py-10 md:border-r md:border-b-0 md:py-14 md:pr-10"
        >
          <span className="text-muted-foreground text-sm">{textos.anterior}</span>
          <span className="titulo-cinema text-[clamp(1.75rem,4vw,3rem)] transition-colors group-hover:text-destaque">
            {anterior.titulo}
          </span>
        </Link>
        <Link
          href={proximo.href}
          rel="next"
          className="group flex flex-col gap-3 py-10 md:items-end md:py-14 md:pl-10 md:text-right"
        >
          <span className="text-muted-foreground text-sm">{textos.proximo}</span>
          <span className="titulo-cinema text-[clamp(1.75rem,4vw,3rem)] transition-colors group-hover:text-destaque">
            {proximo.titulo}
          </span>
        </Link>
      </div>
    </nav>
  )
}
