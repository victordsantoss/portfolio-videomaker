import type { IImagemModel } from './midia.model'

export interface IContatosModel {
  email: string
  whatsapp?: string
  instagram?: string
}

export interface IItemTextoModel {
  titulo: string
  descricao: string
}

export interface IFatoModel {
  rotulo: string
  valor: string
}

export interface IClienteModel {
  nome: string
  logo?: IImagemModel
}

export interface IDepoimentoModel {
  texto: string
  autor: string
  funcao: string
  projeto?: string
}

/** Identidade e textos institucionais do videomaker, já resolvidos para um idioma. */
export interface IPerfilModel {
  nome: string
  especialidade: string
  hero: {
    linhasTitulo: string[]
    subtitulo: string
    local: string
    imagem: IImagemModel
  }
  sobre: {
    foto: IImagemModel
    paragrafos: string[]
    fatos: IFatoModel[]
  }
  servicos: IItemTextoModel[]
  processo: IItemTextoModel[]
  clientes: IClienteModel[]
  depoimentos: IDepoimentoModel[]
  contatos: IContatosModel
}
