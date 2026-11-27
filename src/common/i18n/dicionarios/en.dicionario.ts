import { CategoriaProjetoEnum } from '../../enums/projeto.enum'
import type { IDicionario } from '../dicionario.type'

export const DICIONARIO_EN: IDicionario = {
  metadados: {
    descricao:
      'Films, music videos and commercials with an authorial approach to cinematography. Portfolio and contact for new projects.',
  },
  navegacao: {
    rotulo: 'Main navigation',
    pularParaConteudo: 'Skip to content',
    inicio: 'Home',
    trabalhos: 'Work',
    sobre: 'About',
    contato: 'Contact',
    abrirMenu: 'Open menu',
    fecharMenu: 'Close menu',
    menu: 'Menu',
  },
  preferencias: {
    idioma: 'Language',
    temaClaro: 'Use light theme',
    temaEscuro: 'Use dark theme',
  },
  inicio: {
    verTrabalhos: 'See the work',
    trabalhos: 'Selected work',
    verProjeto: 'View project',
    sobre: 'About',
    servicos: 'What I do',
    processo: 'How it works',
    processoDescricao:
      'From the first message to delivery, every stage has a clear deadline and owner.',
    clientes: 'Clients',
    contatoTitulo: "Let's create something meaningful.",
    contatoDescricao: "Have a project in mind? Let's talk.",
  },
  contato: {
    email: 'Email',
    whatsapp: 'WhatsApp',
    instagram: 'Instagram',
    abreEmNovaAba: '(opens in a new tab)',
  },
  projeto: {
    todosOsTrabalhos: 'All work',
    categoria: 'Category',
    ano: 'Year',
    cliente: 'Client',
    local: 'Location',
    assistir: 'Play',
    assistirTitulo: 'Watch the film',
    contexto: 'Context',
    objetivo: 'Goal',
    papel: 'My role',
    registros: 'Frames',
    creditos: 'Credits',
    outrosProjetos: 'More work',
    anterior: 'Previous project',
    proximo: 'Next project',
  },
  categorias: {
    [CategoriaProjetoEnum.CURTA]: 'Short film',
    [CategoriaProjetoEnum.VIDEOCLIPE]: 'Music video',
    [CategoriaProjetoEnum.AEREO]: 'Drone & aerial',
    [CategoriaProjetoEnum.EVENTO]: 'Event',
    [CategoriaProjetoEnum.COMERCIAL]: 'Commercial',
    [CategoriaProjetoEnum.LIFESTYLE]: 'Lifestyle',
  },
  estados: {
    carregando: 'Loading',
    naoEncontradoTitulo: 'This page has left the frame.',
    naoEncontradoDescricao:
      'The address may have changed or never existed. The work is still on the home page.',
    erroTitulo: "This page couldn't be loaded.",
    erroDescricao: 'Try again. If it keeps happening, go back to the home page.',
    tentarNovamente: 'Try again',
    voltarAoInicio: 'Back to home',
  },
  rodape: {
    direitos: 'All rights reserved.',
    voltarAoTopo: 'Back to top',
  },
}
