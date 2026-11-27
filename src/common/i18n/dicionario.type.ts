import type { CategoriaProjetoEnum } from '../enums/projeto.enum'

/** Textos de interface de um idioma. Conteúdo editorial (projetos, bio) fica em src/content. */
export interface IDicionario {
  metadados: {
    descricao: string
  }
  navegacao: {
    rotulo: string
    pularParaConteudo: string
    inicio: string
    trabalhos: string
    sobre: string
    contato: string
    abrirMenu: string
    fecharMenu: string
    menu: string
  }
  preferencias: {
    idioma: string
    temaClaro: string
    temaEscuro: string
  }
  inicio: {
    verTrabalhos: string
    trabalhos: string
    verProjeto: string
    sobre: string
    servicos: string
    processo: string
    processoDescricao: string
    clientes: string
    contatoTitulo: string
    contatoDescricao: string
  }
  contato: {
    email: string
    whatsapp: string
    instagram: string
    abreEmNovaAba: string
  }
  projeto: {
    todosOsTrabalhos: string
    categoria: string
    ano: string
    cliente: string
    local: string
    assistir: string
    assistirTitulo: string
    contexto: string
    objetivo: string
    papel: string
    registros: string
    creditos: string
    outrosProjetos: string
    anterior: string
    proximo: string
  }
  categorias: Record<CategoriaProjetoEnum, string>
  estados: {
    carregando: string
    naoEncontradoTitulo: string
    naoEncontradoDescricao: string
    erroTitulo: string
    erroDescricao: string
    tentarNovamente: string
    voltarAoInicio: string
  }
  rodape: {
    direitos: string
    voltarAoTopo: string
  }
}
