interface IOpcoesCookie {
  /** Validade em segundos. */
  maxAge?: number
  path?: string
  sameSite?: 'Lax' | 'Strict' | 'None'
  secure?: boolean
}

const UM_ANO_EM_SEGUNDOS = 60 * 60 * 24 * 365

/**
 * Monta a string de um cookie para document.cookie.
 * @example serializarCookie('tema', 'escuro') // 'tema=escuro; Path=/; Max-Age=31536000; SameSite=Lax'
 */
export function serializarCookie(nome: string, valor: string, opcoes: IOpcoesCookie = {}): string {
  const { maxAge = UM_ANO_EM_SEGUNDOS, path = '/', sameSite = 'Lax', secure = false } = opcoes
  const partes = [
    `${nome}=${encodeURIComponent(valor)}`,
    `Path=${path}`,
    `Max-Age=${maxAge}`,
    `SameSite=${sameSite}`,
  ]
  if (secure) partes.push('Secure')
  return partes.join('; ')
}

/** Lê um cookie de uma string no formato de document.cookie. */
export function lerCookie(cookies: string, nome: string): string | undefined {
  const par = cookies
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${nome}=`))
  return par ? decodeURIComponent(par.slice(nome.length + 1)) : undefined
}
