'use client'

import { useState } from 'react'
import { PlayIcon } from 'lucide-react'
import Image from 'next/image'

import type { IImagemModel, IVideoModel } from '@/common/models/midia.model'

interface IProps {
  video: IVideoModel
  capa: IImagemModel
  tituloProjeto: string
  textos: {
    assistir: string
    assistirTitulo: string
  }
}

/**
 * Mostra a capa com um botão e só carrega o player externo quando o visitante pede.
 * Evita baixar o player (e os cookies da plataforma) em cada visita.
 */
export function ReprodutorVideo({ video, capa, tituloProjeto, textos }: Readonly<IProps>) {
  const [estaTocando, setEstaTocando] = useState(false)

  if (estaTocando) {
    return (
      <div className="relative aspect-video w-full bg-meia-noite">
        <iframe
          src={video.urlIncorporacao}
          title={`${textos.assistirTitulo}: ${tituloProjeto}`}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 size-full"
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setEstaTocando(true)}
      className="group relative block aspect-video w-full overflow-hidden bg-quadro outline-offset-4"
    >
      <Image
        src={capa.url}
        alt={capa.alt}
        fill
        preload
        sizes="(min-width: 92rem) 85rem, 100vw"
        className="object-cover transition-transform duration-700 ease-cinema motion-safe:group-hover:scale-[1.015]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-meia-noite/25 transition-colors duration-500 group-hover:bg-meia-noite/35"
      />
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-geada">
        <span className="flex size-20 items-center justify-center rounded-full border border-geada/70 transition-transform duration-500 ease-cinema group-hover:scale-105 md:size-24">
          <PlayIcon
            aria-hidden="true"
            strokeWidth={1.25}
            className="ml-1 size-7 fill-current md:size-8"
          />
        </span>
        <span className="text-sm tracking-wide">
          {textos.assistir}
          <span className="sr-only">: {tituloProjeto}</span>
        </span>
      </span>
    </button>
  )
}
