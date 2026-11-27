import { z } from 'zod'

import type { TIdioma } from '@/common/i18n/idioma.constant'

/** Texto escrito em todos os idiomas publicados. */
export const textoLocalizadoSchema = z.object({
  pt: z.string().trim().min(1),
  en: z.string().trim().min(1),
}) satisfies z.ZodType<Record<TIdioma, string>>

export const imagemConteudoSchema = z.object({
  url: z.url(),
  alt: textoLocalizadoSchema,
})

export type TTextoLocalizado = z.infer<typeof textoLocalizadoSchema>
export type TImagemConteudo = z.infer<typeof imagemConteudoSchema>

/** Escolhe a versão do texto no idioma pedido. */
export function localizar<TValor>(texto: Record<TIdioma, TValor>, idioma: TIdioma): TValor {
  return texto[idioma]
}

/** Valida um conteúdo local e explica onde está o erro, para o build falhar com uma mensagem útil. */
export function validarConteudo<TSchema extends z.ZodType>(
  schema: TSchema,
  dados: unknown,
  origem: string,
): z.infer<TSchema> {
  const resultado = schema.safeParse(dados)
  if (resultado.success) return resultado.data
  throw new Error(`Conteúdo inválido em ${origem}:\n${z.prettifyError(resultado.error)}`)
}
