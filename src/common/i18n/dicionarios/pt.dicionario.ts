import { CategoriaProjetoEnum } from '../../enums/projeto.enum'
import type { IDicionario } from '../dicionario.type'

export const DICIONARIO_PT: IDicionario = {
  metadados: {
    descricao:
      'Filmes, videoclipes e filmes publicitários com direção de fotografia autoral. Portfólio e contato para novos projetos.',
  },
  navegacao: {
    rotulo: 'Navegação principal',
    pularParaConteudo: 'Ir para o conteúdo',
    inicio: 'Página inicial',
    trabalhos: 'Trabalhos',
    sobre: 'Sobre',
    contato: 'Contato',
    abrirMenu: 'Abrir menu',
    fecharMenu: 'Fechar menu',
    menu: 'Menu',
  },
  preferencias: {
    idioma: 'Idioma',
    temaClaro: 'Usar tema claro',
    temaEscuro: 'Usar tema escuro',
  },
  inicio: {
    verTrabalhos: 'Ver trabalhos',
    trabalhos: 'Trabalhos selecionados',
    verProjeto: 'Ver projeto',
    sobre: 'Sobre',
    servicos: 'O que eu faço',
    processo: 'Como funciona',
    processoDescricao:
      'Do primeiro contato à entrega, cada etapa tem prazo e responsável definidos.',
    clientes: 'Com quem já trabalhei',
    contatoTitulo: 'Vamos criar algo com significado.',
    contatoDescricao: 'Tem um projeto em mente? Vamos conversar.',
  },
  contato: {
    email: 'E-mail',
    whatsapp: 'WhatsApp',
    instagram: 'Instagram',
    abreEmNovaAba: '(abre em nova aba)',
  },
  projeto: {
    todosOsTrabalhos: 'Todos os trabalhos',
    categoria: 'Categoria',
    ano: 'Ano',
    cliente: 'Cliente',
    local: 'Local',
    assistir: 'Assistir',
    assistirTitulo: 'Assistir ao filme',
    contexto: 'Contexto',
    objetivo: 'Objetivo',
    papel: 'Meu papel',
    registros: 'Frames',
    creditos: 'Créditos',
    outrosProjetos: 'Outros projetos',
    anterior: 'Projeto anterior',
    proximo: 'Próximo projeto',
  },
  categorias: {
    [CategoriaProjetoEnum.CURTA]: 'Curta-metragem',
    [CategoriaProjetoEnum.VIDEOCLIPE]: 'Videoclipe',
    [CategoriaProjetoEnum.AEREO]: 'Drone e aéreo',
    [CategoriaProjetoEnum.EVENTO]: 'Evento',
    [CategoriaProjetoEnum.COMERCIAL]: 'Filme publicitário',
    [CategoriaProjetoEnum.LIFESTYLE]: 'Lifestyle',
  },
  estados: {
    carregando: 'Carregando',
    naoEncontradoTitulo: 'Esta página saiu de cena.',
    naoEncontradoDescricao:
      'O endereço pode ter mudado ou nunca ter existido. Os trabalhos continuam na página inicial.',
    erroTitulo: 'Não foi possível carregar esta página.',
    erroDescricao: 'Tente de novo. Se o problema continuar, volte para a página inicial.',
    tentarNovamente: 'Tentar novamente',
    voltarAoInicio: 'Voltar ao início',
  },
  rodape: {
    direitos: 'Todos os direitos reservados.',
    voltarAoTopo: 'Voltar ao topo',
  },
}
