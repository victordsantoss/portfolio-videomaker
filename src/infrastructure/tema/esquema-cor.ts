import { lerCookie } from '../cookies/cookie.util'
import { salvarEsquemaCorNoCookie } from '../cookies/esquema-cor.cookie'
import { CookieKeys } from '../cookies/keys.cookie'

export type TEsquemaCor = 'claro' | 'escuro'

/** Classe no <html> que ativa os tokens do tema escuro. */
export const CLASSE_TEMA_ESCURO = 'dark'

/** Classe temporária que liga a transição de cores só durante a troca de tema. */
const CLASSE_TROCANDO_TEMA = 'trocando-tema'
const DURACAO_TRANSICAO_MS = 320

const NOME_COOKIE_REGEX = CookieKeys.ESQUEMA_COR.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Roda no <head>, antes da primeira pintura: aplica o tema salvo no cookie ou, sem escolha salva,
 * o do sistema operacional. Sem preferência do sistema, fica o escuro, tema de referência da marca.
 * Também acompanha mudanças do sistema enquanto o visitante não escolher um tema.
 */
export const SCRIPT_ESQUEMA_COR = `(function(){try{var r=document.documentElement,q=window.matchMedia('(prefers-color-scheme: light)');function c(){var m=document.cookie.match(/(?:^|; )${NOME_COOKIE_REGEX}=(claro|escuro)/);return m?m[1]:null}function a(){var s=c();var e=s?s==='escuro':!q.matches;r.classList.toggle('${CLASSE_TEMA_ESCURO}',e);r.style.colorScheme=e?'dark':'light'}a();q.addEventListener('change',function(){if(!c())a()})}catch(_){}})()`

/** Tema salvo no cookie ou, sem escolha salva, o do sistema operacional. Só funciona no navegador. */
export function obterEsquemaCorPreferido(): TEsquemaCor {
  const salvo = lerCookie(document.cookie, CookieKeys.ESQUEMA_COR)
  if (salvo === 'claro' || salvo === 'escuro') return salvo
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'claro' : 'escuro'
}

/** Reaplica a preferência no <html> sem transição nem gravação, para quando o React recria o documento. */
export function sincronizarEsquemaCor(): void {
  const ehEscuro = obterEsquemaCorPreferido() === 'escuro'
  document.documentElement.classList.toggle(CLASSE_TEMA_ESCURO, ehEscuro)
  document.documentElement.style.colorScheme = ehEscuro ? 'dark' : 'light'
}

/** Lê o tema ativo a partir do <html>. Só funciona no navegador. */
export function obterEsquemaCorAtivo(): TEsquemaCor {
  return document.documentElement.classList.contains(CLASSE_TEMA_ESCURO) ? 'escuro' : 'claro'
}

/** Aplica um tema na hora, com uma transição curta, e salva a escolha. */
export function aplicarEsquemaCor(esquema: TEsquemaCor): void {
  const raiz = document.documentElement
  const ehEscuro = esquema === 'escuro'
  raiz.classList.add(CLASSE_TROCANDO_TEMA)
  raiz.classList.toggle(CLASSE_TEMA_ESCURO, ehEscuro)
  raiz.style.colorScheme = ehEscuro ? 'dark' : 'light'
  salvarEsquemaCorNoCookie(esquema)
  window.setTimeout(() => raiz.classList.remove(CLASSE_TROCANDO_TEMA), DURACAO_TRANSICAO_MS)
}
