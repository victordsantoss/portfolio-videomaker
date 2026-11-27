'use client'

import { useParams } from 'next/navigation'

import { PaginaNaoEncontrada } from '@/common/components/estado/pagina-nao-encontrada.component'
import { obterDicionario } from '@/common/i18n/dicionario.util'
import { IDIOMA_PADRAO } from '@/common/i18n/idioma.constant'
import { ehIdiomaValido } from '@/common/i18n/idioma.util'
import { Rotas } from '@/common/utils/rotas.util'

export default function NotFound() {
  const { locale } = useParams<{ locale?: string }>()
  const idioma = ehIdiomaValido(locale) ? locale : IDIOMA_PADRAO
  const textos = obterDicionario(idioma).estados

  return (
    <PaginaNaoEncontrada
      titulo={textos.naoEncontradoTitulo}
      descricao={textos.naoEncontradoDescricao}
      textoVoltar={textos.voltarAoInicio}
      hrefVoltar={Rotas.inicio(idioma)}
    />
  )
}
