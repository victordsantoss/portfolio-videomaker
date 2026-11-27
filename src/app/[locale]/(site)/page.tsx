import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ehIdiomaValido } from '@/common/i18n/idioma.util'
import { gerarMetadadosInicioPage, InicioPage } from '@/modules/inicio'

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  return ehIdiomaValido(locale) ? gerarMetadadosInicioPage({ idioma: locale }) : {}
}

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  if (!ehIdiomaValido(locale)) notFound()
  return <InicioPage idioma={locale} />
}
