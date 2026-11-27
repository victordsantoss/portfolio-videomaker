import type { IDicionario } from '@/common/i18n/dicionario.type'
import type { TIdioma } from '@/common/i18n/idioma.constant'
import type { IProjetoModel } from '@/common/models/projeto.model'

import { CartaoProjeto } from '../../../components/cartao-projeto.component'
import { ProjetoPaginas } from '../../../domain/navegacao.constant'

interface IProps {
  idioma: TIdioma
  projetos: IProjetoModel[]
  textos: IDicionario
}

export function OutrosProjetos({ idioma, projetos, textos }: Readonly<IProps>) {
  if (projetos.length === 0) return null

  return (
    <section aria-labelledby="outros-titulo" className="moldura py-24 md:py-32">
      <h2 id="outros-titulo" className="titulo-secao mb-12 text-[1.75rem] md:text-[2.25rem]">
        {textos.projeto.outrosProjetos}
      </h2>
      <ul className="grid gap-14 md:grid-cols-3 md:gap-6">
        {projetos.map((projeto) => (
          <li key={projeto.slug}>
            <CartaoProjeto
              projeto={projeto}
              href={ProjetoPaginas.detalhe(idioma, projeto.slug)}
              rotuloCategoria={textos.categorias[projeto.categoria]}
              classeQuadro="aspect-[4/5]"
              sizes="(min-width: 48rem) 30vw, 100vw"
              tamanho="compacto"
              mostrarResumo={false}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
