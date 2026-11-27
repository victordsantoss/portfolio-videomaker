/** Link de e-mail com assunto opcional. */
export function criarLinkEmail(email: string, assunto?: string): string {
  return assunto ? `mailto:${email}?subject=${encodeURIComponent(assunto)}` : `mailto:${email}`
}

/** Link do WhatsApp. Aceita o número em qualquer formato e mantém só os dígitos. */
export function criarLinkWhatsapp(numero: string, mensagem?: string): string {
  const digitos = numero.replace(/\D/g, '')
  const texto = mensagem ? `?text=${encodeURIComponent(mensagem)}` : ''
  return `https://wa.me/${digitos}${texto}`
}

/** Link do perfil no Instagram, com ou sem @. */
export function criarLinkInstagram(usuario: string): string {
  return `https://www.instagram.com/${usuario.replace(/^@/, '')}/`
}

/**
 * Formata um número brasileiro com DDI para exibição.
 * @example formatarTelefone('5561912345678') // '+55 61 91234-5678'
 */
export function formatarTelefone(numero: string): string {
  const digitos = numero.replace(/\D/g, '')
  const partes = /^(\d{2})(\d{2})(\d{4,5})(\d{4})$/.exec(digitos)
  if (!partes) return numero
  const [, ddi, ddd, inicio, fim] = partes
  return `+${ddi} ${ddd} ${inicio}-${fim}`
}
