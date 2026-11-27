import type { Metadata } from 'next'

import { perfilService } from '@/api/resources/perfil/server/perfil.service'
import { projetoService } from '@/api/resources/projeto/server/projeto.service'
import { obterDicionario } from '@/common/i18n/dicionario.util'
import type { TIdioma } from '@/common/i18n/idioma.constant'
import type { IContatosModel } from '@/common/models/perfil.model'
import {
  criarLinkEmail,
  criarLinkInstagram,
  criarLinkWhatsapp,
  formatarTelefone,
} from '@/common/utils/contato.util'
import { Ancoras } from '@/common/utils/rotas.util'

import { gerarMetadadosInicio } from '../../utils/inicio-metadados.util'
import { SecaoClientes } from './components/secao-clientes.component'
import { type ICanalContato, SecaoContato } from './components/secao-contato.component'
import { SecaoHero } from './components/secao-hero.component'
import { SecaoProcesso } from './components/secao-processo.component'
import { SecaoServicos } from './components/secao-servicos.component'
import { SecaoSobre } from './components/secao-sobre.component'
import { TrabalhosSelecionados } from './components/trabalhos-selecionados.component'

interface IProps {
  idioma: TIdioma
}

export async function InicioPage({ idioma }: Readonly<IProps>) {
  const [perfil, projetos] = await Promise.all([
    perfilService.buscar(idioma),
    projetoService.listarDestaques(idioma),
  ])
  const textos = obterDicionario(idioma)

  return (
    <>
      <SecaoHero
        hero={perfil.hero}
        hrefTrabalhos={`#${Ancoras.TRABALHOS}`}
        textoVerTrabalhos={textos.inicio.verTrabalhos}
      />
      <TrabalhosSelecionados idioma={idioma} projetos={projetos} textos={textos} />
      <SecaoSobre
        nome={perfil.nome}
        especialidade={perfil.especialidade}
        sobre={perfil.sobre}
        titulo={textos.inicio.sobre}
      />
      <SecaoServicos servicos={perfil.servicos} titulo={textos.inicio.servicos} />
      <SecaoProcesso
        etapas={perfil.processo}
        titulo={textos.inicio.processo}
        descricao={textos.inicio.processoDescricao}
      />
      <SecaoClientes
        titulo={textos.inicio.clientes}
        clientes={perfil.clientes}
        depoimentos={perfil.depoimentos}
      />
      <SecaoContato
        titulo={textos.inicio.contatoTitulo}
        descricao={textos.inicio.contatoDescricao}
        canais={montarCanais(perfil.contatos, textos.contato)}
        textoNovaAba={textos.contato.abreEmNovaAba}
      />
    </>
  )
}

export async function gerarMetadadosInicioPage({ idioma }: IProps): Promise<Metadata> {
  const perfil = await perfilService.buscar(idioma)
  return gerarMetadadosInicio({
    idioma,
    nome: perfil.nome,
    especialidade: perfil.especialidade,
    descricao: obterDicionario(idioma).metadados.descricao,
    imagem: perfil.hero.imagem,
  })
}

/** Canais na ordem de preferência; os opcionais só aparecem quando cadastrados. */
function montarCanais(
  contatos: IContatosModel,
  textos: { email: string; whatsapp: string; instagram: string },
): ICanalContato[] {
  const canais: ICanalContato[] = [
    {
      rotulo: textos.email,
      valor: contatos.email,
      href: criarLinkEmail(contatos.email),
      ehExterno: false,
    },
  ]
  if (contatos.whatsapp) {
    canais.push({
      rotulo: textos.whatsapp,
      valor: formatarTelefone(contatos.whatsapp),
      href: criarLinkWhatsapp(contatos.whatsapp),
      ehExterno: true,
    })
  }
  if (contatos.instagram) {
    canais.push({
      rotulo: textos.instagram,
      valor: `@${contatos.instagram.replace(/^@/, '')}`,
      href: criarLinkInstagram(contatos.instagram),
      ehExterno: true,
    })
  }
  return canais
}
