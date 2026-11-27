import { z } from 'zod'

import { imagemConteudoSchema, textoLocalizadoSchema } from '../../_core/conteudo.util'

const itemTextoSchema = z.object({
  titulo: textoLocalizadoSchema,
  descricao: textoLocalizadoSchema,
})

/** Formato de src/content/perfil.json. */
export const perfilConteudoSchema = z.object({
  nome: z.string().trim().min(1),
  especialidade: textoLocalizadoSchema,
  hero: z.object({
    linhasTitulo: z.object({
      pt: z.array(z.string().trim().min(1)).min(1),
      en: z.array(z.string().trim().min(1)).min(1),
    }),
    subtitulo: textoLocalizadoSchema,
    local: textoLocalizadoSchema,
    imagem: imagemConteudoSchema,
  }),
  sobre: z.object({
    foto: imagemConteudoSchema,
    paragrafos: z.array(textoLocalizadoSchema).min(1),
    fatos: z.array(z.object({ rotulo: textoLocalizadoSchema, valor: textoLocalizadoSchema })),
  }),
  servicos: z.array(itemTextoSchema),
  processo: z.array(itemTextoSchema),
  clientes: z.array(
    z.object({ nome: z.string().trim().min(1), logo: imagemConteudoSchema.optional() }),
  ),
  depoimentos: z.array(
    z.object({
      texto: textoLocalizadoSchema,
      autor: z.string().trim().min(1),
      funcao: textoLocalizadoSchema,
      projeto: z.string().trim().min(1).optional(),
    }),
  ),
  contatos: z.object({
    email: z.email(),
    whatsapp: z
      .string()
      .regex(/^\d{10,15}$/, 'Use só dígitos, com DDI e DDD.')
      .optional(),
    instagram: z.string().trim().min(1).optional(),
  }),
})

export type TPerfilConteudoDto = z.infer<typeof perfilConteudoSchema>
