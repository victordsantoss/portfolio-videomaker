'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { IDIOMAS, type TIdioma } from '@/common/i18n/idioma.constant'
import { trocarIdiomaDoCaminho } from '@/common/i18n/idioma.util'
import { IdiomaMapper } from '@/common/mappers/idioma.mapper'
import { cn } from '@/common/utils/classes.util'

interface IProps {
  idiomaAtual: TIdioma
  rotulo: string
}

/** Troca o idioma mantendo a página atual. O tema não é afetado: ele vive no html, não na URL. */
export function SeletorIdioma({ idiomaAtual, rotulo }: Readonly<IProps>) {
  const caminho = usePathname()

  return (
    <ul aria-label={rotulo} className="flex items-center">
      {IDIOMAS.map((idioma) => {
        const ehAtual = idioma === idiomaAtual
        const { rotulo: sigla, nome, tag } = IdiomaMapper[idioma]

        return (
          <li key={idioma}>
            <Link
              href={trocarIdiomaDoCaminho(caminho, idioma)}
              hrefLang={tag}
              lang={tag}
              aria-current={ehAtual ? 'true' : undefined}
              scroll={false}
              className={cn(
                'relative inline-flex h-11 min-w-9 items-center justify-center text-xs tracking-wide transition-colors md:h-9',
                ehAtual ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <span aria-hidden="true">{sigla}</span>
              <span className="sr-only">{nome}</span>
              {ehAtual ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-2.5 bottom-2 h-px bg-current md:bottom-1.5"
                />
              ) : null}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
