import Image from 'next/image'

import type { IImagemModel } from '../../models/midia.model'
import { cn } from '../../utils/classes.util'

interface IProps {
  imagem: IImagemModel
  /** Valor de sizes do next/image: quanto da largura da tela o quadro ocupa. */
  sizes: string
  className?: string
  /** Carrega antes do restante: use só na imagem acima da dobra. */
  ehPrioritario?: boolean
  /** Aproxima a imagem de leve quando o grupo pai recebe hover ou foco. */
  temZoomNoGrupo?: boolean
  classeImagem?: string
}

/**
 * Moldura de mídia com proporção fixa (definida por quem usa, via className) e fundo do tema,
 * para não haver salto de layout enquanto a imagem carrega.
 */
export function Quadro({
  imagem,
  sizes,
  className,
  ehPrioritario = false,
  temZoomNoGrupo = false,
  classeImagem,
}: Readonly<IProps>) {
  return (
    <div className={cn('relative overflow-hidden bg-quadro', className)}>
      <Image
        src={imagem.url}
        alt={imagem.alt}
        fill
        sizes={sizes}
        preload={ehPrioritario}
        className={cn(
          'object-cover',
          temZoomNoGrupo &&
            'transition-transform duration-700 ease-cinema motion-safe:group-hover:scale-[1.025] motion-safe:group-focus-visible:scale-[1.025]',
          classeImagem,
        )}
      />
    </div>
  )
}
