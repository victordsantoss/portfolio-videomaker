import type { PlataformaVideoEnum } from '../enums/projeto.enum'

export interface IImagemModel {
  url: string
  alt: string
}

export interface IVideoModel {
  plataforma: PlataformaVideoEnum
  /** Endereço do player incorporável, já pronto para o iframe. */
  urlIncorporacao: string
}
