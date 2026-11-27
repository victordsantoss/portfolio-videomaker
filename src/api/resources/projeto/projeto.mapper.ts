import { PlataformaVideoEnum } from '@/common/enums/projeto.enum'
import type { TIdioma } from '@/common/i18n/idioma.constant'
import type { IImagemModel, IVideoModel } from '@/common/models/midia.model'
import type { IProjetoModel } from '@/common/models/projeto.model'

import { localizar, type TImagemConteudo } from '../../_core/conteudo.util'
import type { TProjetoConteudoDto } from './projeto.dto'

/** Endereço do player de cada plataforma, sem cookies de rastreamento quando a plataforma permite. */
const URL_INCORPORACAO: Record<PlataformaVideoEnum, (id: string) => string> = {
  [PlataformaVideoEnum.YOUTUBE]: (id) =>
    `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&modestbranding=1`,
  [PlataformaVideoEnum.VIMEO]: (id) =>
    `https://player.vimeo.com/video/${encodeURIComponent(id)}?autoplay=1&dnt=1`,
}

export const ProjetoMapper = {
  paraModel(dto: TProjetoConteudoDto, idioma: TIdioma): IProjetoModel {
    return {
      slug: dto.slug,
      titulo: localizar(dto.titulo, idioma),
      categoria: dto.categoria,
      ano: dto.ano,
      cliente: dto.cliente,
      local: localizar(dto.local, idioma),
      resumo: localizar(dto.resumo, idioma),
      contexto: localizar(dto.contexto, idioma),
      objetivo: localizar(dto.objetivo, idioma),
      papel: localizar(dto.papel, idioma),
      capa: ProjetoMapper.paraImagem(dto.capa, idioma),
      video: dto.video ? ProjetoMapper.paraVideo(dto.video) : undefined,
      registros: dto.registros.map((registro) => ProjetoMapper.paraImagem(registro, idioma)),
      creditos: dto.creditos.map((credito) => ({
        funcao: localizar(credito.funcao, idioma),
        nome: credito.nome,
      })),
      ehDestaque: dto.ehDestaque,
    }
  },

  paraImagem(imagem: TImagemConteudo, idioma: TIdioma): IImagemModel {
    return { url: imagem.url, alt: localizar(imagem.alt, idioma) }
  },

  paraVideo(video: NonNullable<TProjetoConteudoDto['video']>): IVideoModel {
    return {
      plataforma: video.plataforma,
      urlIncorporacao: URL_INCORPORACAO[video.plataforma](video.id),
    }
  },
}
