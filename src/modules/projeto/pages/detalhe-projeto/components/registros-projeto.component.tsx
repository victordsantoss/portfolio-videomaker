import { Quadro } from '@/common/components/quadro/quadro.component'
import type { IImagemModel } from '@/common/models/midia.model'

interface IProps {
  registros: IImagemModel[]
  titulo: string
}

interface IPosicaoRegistro {
  item: string
  quadro: string
  sizes: string
}

/** Composição dos frames: o primeiro em scope, os seguintes em par com alturas desencontradas. */
const POSICOES: IPosicaoRegistro[] = [
  { item: 'md:col-span-12', quadro: 'aspect-video md:aspect-[2.39/1]', sizes: '100vw' },
  { item: 'md:col-span-5', quadro: 'aspect-[4/5]', sizes: '(min-width: 48rem) 42vw, 100vw' },
  {
    item: 'md:col-span-6 md:col-start-7 md:mt-32',
    quadro: 'aspect-[4/3]',
    sizes: '(min-width: 48rem) 50vw, 100vw',
  },
]

export function RegistrosProjeto({ registros, titulo }: Readonly<IProps>) {
  if (registros.length === 0) return null

  return (
    <section aria-labelledby="registros-titulo" className="moldura py-20 md:py-28">
      <h2 id="registros-titulo" className="mb-10 text-muted-foreground text-sm">
        {titulo}
      </h2>
      <ul className="grid gap-4 md:grid-cols-12 md:gap-6">
        {registros.map((registro, indice) => {
          const posicao = POSICOES[indice % POSICOES.length] as IPosicaoRegistro
          return (
            <li key={registro.url} className={posicao.item}>
              <Quadro imagem={registro} sizes={posicao.sizes} className={posicao.quadro} />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
