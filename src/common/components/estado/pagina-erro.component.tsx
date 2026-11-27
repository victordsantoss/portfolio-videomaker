'use client'

import { LayoutPaginaEstado } from './layout-pagina-estado.component'
import { LinkEstado } from './link-estado.component'

interface IProps {
  titulo: string
  descricao: string
  textoTentarNovamente: string
  textoVoltar: string
  hrefVoltar: string
  aoTentarNovamente: () => void
}

export function PaginaErro({
  titulo,
  descricao,
  textoTentarNovamente,
  textoVoltar,
  hrefVoltar,
  aoTentarNovamente,
}: Readonly<IProps>) {
  return (
    <LayoutPaginaEstado
      titulo={titulo}
      descricao={descricao}
      acoes={
        <>
          <button
            type="button"
            onClick={aoTentarNovamente}
            className="border-foreground border-b pb-1 text-sm transition-colors hover:border-destaque hover:text-destaque"
          >
            {textoTentarNovamente}
          </button>
          <LinkEstado href={hrefVoltar} className="border-transparent text-muted-foreground">
            {textoVoltar}
          </LinkEstado>
        </>
      }
    />
  )
}
