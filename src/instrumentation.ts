import type { Instrumentation } from 'next'

/** Na subida do servidor: valida as variáveis de ambiente. Se estiverem inválidas, a subida falha. */
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  const { logger } = await import('./infrastructure/observability/logger.util')
  try {
    await import('./infrastructure/env/server.env')
  } catch (erro) {
    logger.erro('Variáveis de ambiente inválidas', { erro })
    throw erro
  }
}

export const onRequestError: Instrumentation.onRequestError = async (
  erro,
  requisicao,
  contexto,
) => {
  const { logger } = await import('./infrastructure/observability/logger.util')
  logger.erro('Erro em requisição', {
    erro,
    caminho: requisicao.path,
    metodo: requisicao.method,
    rota: contexto.routePath,
    tipo: contexto.routeType,
  })
}
