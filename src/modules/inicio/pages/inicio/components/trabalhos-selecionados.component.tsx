import { Secao } from '@/common/components/pagina/secao.component'
import type { IDicionario } from '@/common/i18n/dicionario.type'
import type { TIdioma } from '@/common/i18n/idioma.constant'
import type { IProjetoModel } from '@/common/models/projeto.model'
import { Ancoras } from '@/common/utils/rotas.util'
import { CartaoProjeto, ProjetoPaginas } from '@/modules/projeto'

interface IProps {
  idioma: TIdioma
  projetos: IProjetoModel[]
  textos: IDicionario
}

interface IPosicaoComposicao {
  item: string
  quadro: string
  sizes: string
  tamanho: 'destaque' | 'padrao'
}

/**
 * Composição editorial que se repete a cada seis projetos: formatos de cinema alternados
 * (scope, 16:9, retrato) e colunas desencontradas, para cada trabalho ter o seu peso.
 */
const COMPOSICAO: IPosicaoComposicao[] = [
  {
    item: 'md:col-span-12',
    quadro: 'aspect-video md:aspect-[2.39/1]',
    sizes: '(min-width: 92rem) 85rem, 100vw',
    tamanho: 'destaque',
  },
  {
    item: 'md:col-span-7',
    quadro: 'aspect-video',
    sizes: '(min-width: 48rem) 56vw, 100vw',
    tamanho: 'padrao',
  },
  {
    item: 'md:col-span-4 md:col-start-9 md:mt-40',
    quadro: 'aspect-[4/5]',
    sizes: '(min-width: 48rem) 32vw, 100vw',
    tamanho: 'padrao',
  },
  {
    item: 'md:col-span-10 md:col-start-2',
    quadro: 'aspect-video md:aspect-[2/1]',
    sizes: '(min-width: 48rem) 80vw, 100vw',
    tamanho: 'destaque',
  },
  {
    item: 'md:col-span-5',
    quadro: 'aspect-[4/5]',
    sizes: '(min-width: 48rem) 40vw, 100vw',
    tamanho: 'padrao',
  },
  {
    item: 'md:col-span-6 md:col-start-7 md:mt-56',
    quadro: 'aspect-video',
    sizes: '(min-width: 48rem) 48vw, 100vw',
    tamanho: 'padrao',
  },
]

export function TrabalhosSelecionados({ idioma, projetos, textos }: Readonly<IProps>) {
  return (
    <Secao id={Ancoras.TRABALHOS} titulo={textos.inicio.trabalhos} className="pt-8 md:pt-12">
      <ul className="grid gap-y-20 md:grid-cols-12 md:gap-x-6 md:gap-y-32">
        {projetos.map((projeto, indice) => {
          const posicao = COMPOSICAO[indice % COMPOSICAO.length] as IPosicaoComposicao
          return (
            <li key={projeto.slug} className={posicao.item}>
              <CartaoProjeto
                projeto={projeto}
                href={ProjetoPaginas.detalhe(idioma, projeto.slug)}
                rotuloCategoria={textos.categorias[projeto.categoria]}
                classeQuadro={posicao.quadro}
                sizes={posicao.sizes}
                tamanho={posicao.tamanho}
              />
            </li>
          )
        })}
      </ul>
    </Secao>
  )
}
