import 'server-only'

import { cache } from 'react'

import type { TIdioma } from '@/common/i18n/idioma.constant'
import type { IPerfilModel } from '@/common/models/perfil.model'
import conteudoPerfil from '@/content/perfil.json'

import { validarConteudo } from '../../../_core/conteudo.util'
import { perfilConteudoSchema } from '../perfil.dto'
import { PerfilMapper } from '../perfil.mapper'

const lerPerfil = cache(() =>
  validarConteudo(perfilConteudoSchema, conteudoPerfil, 'src/content/perfil.json'),
)

export const perfilService = {
  async buscar(idioma: TIdioma): Promise<IPerfilModel> {
    return PerfilMapper.paraModel(lerPerfil(), idioma)
  },
}
