import { z } from 'zod'

import { CategoriaProjetoEnum, PlataformaVideoEnum } from '@/common/enums/projeto.enum'

import { imagemConteudoSchema, textoLocalizadoSchema } from '../../_core/conteudo.util'

/** Formato de cada projeto em src/content/projetos.json. */
export const projetoConteudoSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use letras minúsculas, números e hífens.'),
  titulo: textoLocalizadoSchema,
  categoria: z.enum(CategoriaProjetoEnum),
  ano: z.number().int().min(1990).max(2100),
  cliente: z.string().trim().min(1).optional(),
  local: textoLocalizadoSchema,
  resumo: textoLocalizadoSchema,
  contexto: textoLocalizadoSchema,
  objetivo: textoLocalizadoSchema,
  papel: textoLocalizadoSchema,
  capa: imagemConteudoSchema,
  video: z
    .object({ plataforma: z.enum(PlataformaVideoEnum), id: z.string().trim().min(1) })
    .optional(),
  registros: z.array(imagemConteudoSchema),
  creditos: z.array(z.object({ funcao: textoLocalizadoSchema, nome: z.string().trim().min(1) })),
  ehDestaque: z.boolean(),
})

export const listaProjetosConteudoSchema = z
  .array(projetoConteudoSchema)
  .refine(
    (projetos) => new Set(projetos.map((projeto) => projeto.slug)).size === projetos.length,
    'Cada projeto precisa de um slug único.',
  )

export type TProjetoConteudoDto = z.infer<typeof projetoConteudoSchema>
