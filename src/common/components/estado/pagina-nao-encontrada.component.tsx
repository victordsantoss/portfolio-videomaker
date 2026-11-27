import { LayoutPaginaEstado } from './layout-pagina-estado.component'
import { LinkEstado } from './link-estado.component'

interface IProps {
  titulo: string
  descricao: string
  textoVoltar: string
  hrefVoltar: string
}

export function PaginaNaoEncontrada({
  titulo,
  descricao,
  textoVoltar,
  hrefVoltar,
}: Readonly<IProps>) {
  return (
    <LayoutPaginaEstado
      titulo={titulo}
      descricao={descricao}
      acoes={<LinkEstado href={hrefVoltar}>{textoVoltar}</LinkEstado>}
    />
  )
}
