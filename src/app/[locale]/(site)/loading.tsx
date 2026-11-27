'use client'

import { useParams } from 'next/navigation'

import { Carregando } from '@/common/components/estado/carregando.component'
import { obterDicionario } from '@/common/i18n/dicionario.util'
import { IDIOMA_PADRAO } from '@/common/i18n/idioma.constant'
import { ehIdiomaValido } from '@/common/i18n/idioma.util'

export default function Loading() {
  const { locale } = useParams<{ locale?: string }>()
  const idioma = ehIdiomaValido(locale) ? locale : IDIOMA_PADRAO
  return <Carregando texto={obterDicionario(idioma).estados.carregando} />
}
