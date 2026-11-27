import Image from 'next/image'

import { Secao } from '@/common/components/pagina/secao.component'
import type { IClienteModel, IDepoimentoModel } from '@/common/models/perfil.model'

interface IProps {
  titulo: string
  clientes: IClienteModel[]
  depoimentos: IDepoimentoModel[]
}

/** Só aparece quando houver clientes ou depoimentos reais cadastrados em src/content/perfil.json. */
export function SecaoClientes({ titulo, clientes, depoimentos }: Readonly<IProps>) {
  if (clientes.length === 0 && depoimentos.length === 0) return null

  return (
    <Secao id="clientes" titulo={titulo} className="pt-0 md:pt-0">
      {clientes.length > 0 ? (
        <ul className="flex flex-wrap items-center gap-x-12 gap-y-8 text-muted-foreground">
          {clientes.map((cliente) => (
            <li key={cliente.nome}>
              {cliente.logo ? (
                <Image
                  src={cliente.logo.url}
                  alt={cliente.logo.alt}
                  width={140}
                  height={48}
                  className="h-8 w-auto object-contain opacity-70 grayscale"
                />
              ) : (
                <span className="titulo-secao text-lg">{cliente.nome}</span>
              )}
            </li>
          ))}
        </ul>
      ) : null}

      {depoimentos.length > 0 ? (
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {depoimentos.map((depoimento) => (
            <figure
              key={`${depoimento.autor}-${depoimento.texto.slice(0, 24)}`}
              className="border-border border-t pt-6"
            >
              <blockquote className="titulo-secao text-xl text-texto-apoio">
                {depoimento.texto}
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span>{depoimento.autor}</span>
                <span className="mt-1 block text-muted-foreground">
                  {[depoimento.funcao, depoimento.projeto].filter(Boolean).join(', ')}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </Secao>
  )
}
