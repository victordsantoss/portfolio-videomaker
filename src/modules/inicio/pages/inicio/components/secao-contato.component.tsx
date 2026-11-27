import { ArrowUpRightIcon } from 'lucide-react'

import { Ancoras } from '@/common/utils/rotas.util'

export interface ICanalContato {
  rotulo: string
  valor: string
  href: string
  ehExterno: boolean
}

interface IProps {
  titulo: string
  descricao: string
  canais: ICanalContato[]
  textoNovaAba: string
}

/** Fechamento da página: um convite direto e os canais escritos por extenso, fáceis de copiar. */
export function SecaoContato({ titulo, descricao, canais, textoNovaAba }: Readonly<IProps>) {
  return (
    <section
      id={Ancoras.CONTATO}
      aria-labelledby="contato-titulo"
      className="bg-card text-card-foreground"
    >
      <div className="moldura py-28 md:py-40">
        <h2
          id="contato-titulo"
          className="titulo-cinema max-w-5xl text-[clamp(2.5rem,7.2vw,6.75rem)]"
        >
          {titulo}
        </h2>
        <p className="mt-8 text-[1.125rem] text-muted-foreground">{descricao}</p>

        <ul className="mt-16 grid border-border border-t md:mt-24 md:grid-cols-3">
          {canais.map((canal) => (
            <li
              key={canal.rotulo}
              className="border-border border-b md:border-b-0 md:px-8 md:first:pl-0 md:not-last:border-r"
            >
              <a
                href={canal.href}
                {...(canal.ehExterno ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex h-full flex-col gap-3 py-7 md:py-10"
              >
                <span className="flex items-center justify-between text-muted-foreground text-sm">
                  {canal.rotulo}
                  <ArrowUpRightIcon
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-4 transition-transform duration-300 ease-cinema group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
                <span className="titulo-secao break-words text-xl transition-colors group-hover:text-destaque md:text-[1.5rem]">
                  {canal.valor}
                </span>
                {canal.ehExterno ? <span className="sr-only">{textoNovaAba}</span> : null}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
