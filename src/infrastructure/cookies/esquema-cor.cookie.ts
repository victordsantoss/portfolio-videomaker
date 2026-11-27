import type { TEsquemaCor } from '../tema/esquema-cor'
import { serializarCookie } from './cookie.util'
import { CookieKeys } from './keys.cookie'

/** Grava a escolha de tema no navegador. O script de tema lê este cookie antes da primeira pintura. */
export function salvarEsquemaCorNoCookie(esquema: TEsquemaCor): void {
  // biome-ignore lint/suspicious/noDocumentCookie: a Cookie Store API ainda não está em todos os navegadores suportados.
  document.cookie = serializarCookie(CookieKeys.ESQUEMA_COR, esquema, {
    secure: window.location.protocol === 'https:',
  })
}
