import { Secao } from '@/common/components/pagina/secao.component'
import type { IItemTextoModel } from '@/common/models/perfil.model'

interface IProps {
  servicos: IItemTextoModel[]
  titulo: string
}

/** Serviços como lista editorial: nome e uma linha de descrição, sem cartões nem ícones. */
export function SecaoServicos({ servicos, titulo }: Readonly<IProps>) {
  if (servicos.length === 0) return null

  return (
    <Secao id="servicos" titulo={titulo}>
      <ul className="border-border border-b">
        {servicos.map((servico) => (
          <li
            key={servico.titulo}
            className="group grid gap-2 border-border border-t py-6 md:grid-cols-12 md:items-baseline md:gap-6 md:py-7"
          >
            <h3 className="titulo-secao text-xl transition-colors group-hover:text-destaque md:col-span-5 md:text-[1.625rem]">
              {servico.titulo}
            </h3>
            <p className="text-muted-foreground md:col-span-6 md:col-start-7">
              {servico.descricao}
            </p>
          </li>
        ))}
      </ul>
    </Secao>
  )
}
