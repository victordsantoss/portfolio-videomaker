import type { TIdioma } from '@/common/i18n/idioma.constant'
import type { IItemTextoModel, IPerfilModel } from '@/common/models/perfil.model'

import { localizar, type TImagemConteudo } from '../../_core/conteudo.util'
import type { TPerfilConteudoDto } from './perfil.dto'

export const PerfilMapper = {
  paraModel(dto: TPerfilConteudoDto, idioma: TIdioma): IPerfilModel {
    const imagem = (valor: TImagemConteudo) => ({
      url: valor.url,
      alt: localizar(valor.alt, idioma),
    })
    const item = (valor: TPerfilConteudoDto['servicos'][number]): IItemTextoModel => ({
      titulo: localizar(valor.titulo, idioma),
      descricao: localizar(valor.descricao, idioma),
    })

    return {
      nome: dto.nome,
      especialidade: localizar(dto.especialidade, idioma),
      hero: {
        linhasTitulo: localizar(dto.hero.linhasTitulo, idioma),
        subtitulo: localizar(dto.hero.subtitulo, idioma),
        local: localizar(dto.hero.local, idioma),
        imagem: imagem(dto.hero.imagem),
      },
      sobre: {
        foto: imagem(dto.sobre.foto),
        paragrafos: dto.sobre.paragrafos.map((paragrafo) => localizar(paragrafo, idioma)),
        fatos: dto.sobre.fatos.map((fato) => ({
          rotulo: localizar(fato.rotulo, idioma),
          valor: localizar(fato.valor, idioma),
        })),
      },
      servicos: dto.servicos.map(item),
      processo: dto.processo.map(item),
      clientes: dto.clientes.map((cliente) => ({
        nome: cliente.nome,
        logo: cliente.logo ? imagem(cliente.logo) : undefined,
      })),
      depoimentos: dto.depoimentos.map((depoimento) => ({
        texto: localizar(depoimento.texto, idioma),
        autor: depoimento.autor,
        funcao: localizar(depoimento.funcao, idioma),
        projeto: depoimento.projeto,
      })),
      contatos: dto.contatos,
    }
  },
}
