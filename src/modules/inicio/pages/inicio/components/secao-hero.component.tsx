import { ArrowDownIcon } from 'lucide-react'
import Image from 'next/image'

import type { IPerfilModel } from '@/common/models/perfil.model'

interface IProps {
  hero: IPerfilModel['hero']
  hrefTrabalhos: string
  textoVerTrabalhos: string
}

const ATRASO_INICIAL_MS = 350
const ATRASO_ENTRE_LINHAS_MS = 140

/**
 * Abertura em proporção de cinema (2.39:1 nas telas largas). É o único momento coreografado do site:
 * o quadro abre do escuro e o título sobe linha a linha, como uma cartela.
 */
export function SecaoHero({ hero, hrefTrabalhos, textoVerTrabalhos }: Readonly<IProps>) {
  return (
    <section aria-labelledby="hero-titulo" className="moldura pt-4 md:pt-6">
      <div className="relative aspect-[4/5] overflow-hidden bg-quadro sm:aspect-video lg:aspect-[2.39/1]">
        <Image
          src={hero.imagem.url}
          alt={hero.imagem.alt}
          fill
          preload
          sizes="(min-width: 92rem) 85rem, 100vw"
          className="object-cover motion-safe:animate-abrir-quadro"
        />
      </div>

      <div className="grid gap-10 pt-10 pb-20 md:grid-cols-12 md:items-end md:pt-14 md:pb-28">
        <h1
          id="hero-titulo"
          className="titulo-cinema text-[clamp(2.75rem,6.9vw,6.5rem)] md:col-span-8"
        >
          {hero.linhasTitulo.map((linha, indice) => (
            <span key={linha} className="block overflow-hidden pb-[0.06em]">
              <span
                className="block motion-safe:animate-subir-linha"
                style={{
                  animationDelay: `${ATRASO_INICIAL_MS + indice * ATRASO_ENTRE_LINHAS_MS}ms`,
                }}
              >
                {linha}
              </span>
            </span>
          ))}
        </h1>

        <div className="flex flex-col gap-8 motion-safe:animate-surgir motion-safe:[animation-delay:800ms] md:col-span-4 md:items-end md:text-right">
          <div>
            <p className="text-balance">{hero.subtitulo}</p>
            <p className="mt-1 text-muted-foreground text-sm">{hero.local}</p>
          </div>
          <a
            href={hrefTrabalhos}
            className="group inline-flex items-center gap-3 self-start text-muted-foreground text-sm transition-colors hover:text-foreground md:self-end"
          >
            <span aria-hidden="true" className="relative h-9 w-px overflow-hidden bg-border">
              <span className="absolute inset-x-0 top-0 h-1/3 bg-foreground motion-safe:animate-percorrer" />
            </span>
            {textoVerTrabalhos}
            <ArrowDownIcon
              aria-hidden="true"
              strokeWidth={1.5}
              className="size-4 transition-transform group-hover:translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
