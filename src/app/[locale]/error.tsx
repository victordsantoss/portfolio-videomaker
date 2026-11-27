'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'

import { PaginaErro } from '@/common/components/estado/pagina-erro.component'
import { obterDicionario } from '@/common/i18n/dicionario.util'
import { IDIOMA_PADRAO } from '@/common/i18n/idioma.constant'
import { ehIdiomaValido } from '@/common/i18n/idioma.util'
import { Rotas } from '@/common/utils/rotas.util'
import { logger } from '@/infrastructure/observability/logger.util'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { locale } = useParams<{ locale?: string }>()
  const idioma = ehIdiomaValido(locale) ? locale : IDIOMA_PADRAO
  const textos = obterDicionario(idioma).estados

  useEffect(() => {
    logger.erro('Erro ao renderizar página', { erro: error })
  }, [error])

  return (
    <PaginaErro
      titulo={textos.erroTitulo}
      descricao={textos.erroDescricao}
      textoTentarNovamente={textos.tentarNovamente}
      textoVoltar={textos.voltarAoInicio}
      hrefVoltar={Rotas.inicio(idioma)}
      aoTentarNovamente={reset}
    />
  )
}
