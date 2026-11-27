import type { CategoriaProjetoEnum } from '../enums/projeto.enum'
import type { IImagemModel, IVideoModel } from './midia.model'

export interface ICreditoModel {
  funcao: string
  nome: string
}

/** Projeto já resolvido para um idioma. */
export interface IProjetoModel {
  slug: string
  titulo: string
  categoria: CategoriaProjetoEnum
  ano: number
  cliente?: string
  local: string
  resumo: string
  contexto: string
  objetivo: string
  papel: string
  capa: IImagemModel
  video?: IVideoModel
  registros: IImagemModel[]
  creditos: ICreditoModel[]
  ehDestaque: boolean
}
