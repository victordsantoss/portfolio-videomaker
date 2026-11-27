import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ehIdiomaValido } from '@/common/i18n/idioma.util'
import {
  DetalheProjetoPage,
  gerarMetadadosDetalheProjeto,
  gerarSlugsDetalheProjeto,
} from '@/modules/projeto'

export const dynamicParams = false

export function generateStaticParams() {
  return gerarSlugsDetalheProjeto()
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/projetos/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  return ehIdiomaValido(locale) ? gerarMetadadosDetalheProjeto({ idioma: locale, slug }) : {}
}

export default async function Page({ params }: PageProps<'/[locale]/projetos/[slug]'>) {
  const { locale, slug } = await params
  if (!ehIdiomaValido(locale)) notFound()
  return <DetalheProjetoPage idioma={locale} slug={slug} />
}
