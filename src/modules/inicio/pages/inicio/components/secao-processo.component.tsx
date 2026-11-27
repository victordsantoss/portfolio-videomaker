import { Secao } from '@/common/components/pagina/secao.component'
import type { IItemTextoModel } from '@/common/models/perfil.model'

interface IProps {
  etapas: IItemTextoModel[]
  titulo: string
  descricao: string
}

/** Etapas do trabalho em sequência. A numeração existe porque a ordem importa. */
export function SecaoProcesso({ etapas, titulo, descricao }: Readonly<IProps>) {
  if (etapas.length === 0) return null

  return (
    <Secao id="processo" titulo={titulo} complemento={<p>{descricao}</p>} className="pt-0 md:pt-0">
      <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
        {etapas.map((etapa, indice) => (
          <li key={etapa.titulo} className="border-border border-t pt-5">
            <span className="numeros-tabulares text-destaque text-sm">
              {String(indice + 1).padStart(2, '0')}
            </span>
            <h3 className="titulo-secao mt-6 text-lg">{etapa.titulo}</h3>
            <p className="mt-2 text-muted-foreground text-[0.95rem]">{etapa.descricao}</p>
          </li>
        ))}
      </ol>
    </Secao>
  )
}
