import 'server-only'

import { cache } from 'react'

import type { TIdioma } from '@/common/i18n/idioma.constant'
import type { IProjetoModel } from '@/common/models/projeto.model'
import conteudoProjetos from '@/content/projetos.json'

import { validarConteudo } from '../../../_core/conteudo.util'
import { listaProjetosConteudoSchema } from '../projeto.dto'
import { ProjetoMapper } from '../projeto.mapper'

/** Lê e valida o conteúdo uma vez por renderização. Trocar a origem (CMS, API) muda só esta função. */
const lerProjetos = cache(() =>
  validarConteudo(listaProjetosConteudoSchema, conteudoProjetos, 'src/content/projetos.json'),
)

export const projetoService = {
  async listar(idioma: TIdioma): Promise<IProjetoModel[]> {
    return lerProjetos().map((projeto) => ProjetoMapper.paraModel(projeto, idioma))
  },

  async listarDestaques(idioma: TIdioma): Promise<IProjetoModel[]> {
    const projetos = await projetoService.listar(idioma)
    return projetos.filter((projeto) => projeto.ehDestaque)
  },

  async buscarPorSlug(idioma: TIdioma, slug: string): Promise<IProjetoModel | undefined> {
    const projeto = lerProjetos().find((item) => item.slug === slug)
    return projeto ? ProjetoMapper.paraModel(projeto, idioma) : undefined
  },

  async listarSlugs(): Promise<string[]> {
    return lerProjetos().map((projeto) => projeto.slug)
  },
}
