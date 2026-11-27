type TNivelLog = 'info' | 'aviso' | 'erro'

type TDadosLog = Record<string, unknown>

const METODO_CONSOLE: Record<TNivelLog, 'info' | 'warn' | 'error'> = {
  info: 'info',
  aviso: 'warn',
  erro: 'error',
}

/** Ponto único de log. No servidor, uma linha JSON por entrada; no navegador, com prefixo legível. */
export const logger = {
  info: (mensagem: string, dados?: TDadosLog) => registrar('info', mensagem, dados),
  aviso: (mensagem: string, dados?: TDadosLog) => registrar('aviso', mensagem, dados),
  erro: (mensagem: string, dados?: TDadosLog) => registrar('erro', mensagem, dados),
}

/** Monta a linha JSON de uma entrada de log do servidor. */
export function formatarLinhaLog(
  nivel: TNivelLog,
  mensagem: string,
  dados: TDadosLog = {},
  data: Date = new Date(),
): string {
  return JSON.stringify({ data: data.toISOString(), nivel, mensagem, ...serializarErros(dados) })
}

function registrar(nivel: TNivelLog, mensagem: string, dados?: TDadosLog): void {
  const metodo = METODO_CONSOLE[nivel]
  if (typeof window === 'undefined') {
    // biome-ignore lint/suspicious/noConsole: este é o ponto único de saída de log.
    console[metodo](formatarLinhaLog(nivel, mensagem, dados))
    return
  }
  // biome-ignore lint/suspicious/noConsole: este é o ponto único de saída de log.
  console[metodo](`[portfolio] ${mensagem}`, dados ?? '')
}

/** Error não vira JSON sozinho: extrai nome, mensagem e digest. */
function serializarErros(dados: TDadosLog): TDadosLog {
  return Object.fromEntries(
    Object.entries(dados).map(([chave, valor]) => [
      chave,
      valor instanceof Error
        ? {
            nome: valor.name,
            mensagem: valor.message,
            digest: (valor as { digest?: string }).digest,
          }
        : valor,
    ]),
  )
}
