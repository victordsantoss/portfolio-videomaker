import { ArrowLeftIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { projetoService } from '@/api/resources/projeto/server/projeto.service'
import { Quadro } from '@/common/components/quadro/quadro.component'
import { obterDicionario } from '@/common/i18n/dicionario.util'
import type { TIdioma } from '@/common/i18n/idioma.constant'
import { Ancoras, Rotas } from '@/common/utils/rotas.util'

import { ProjetoPaginas } from '../../domain/navegacao.constant'
import { gerarMetadadosProjeto } from '../../utils/projeto-metadados.util'
import { encontrarVizinhos, selecionarOutrosProjetos } from '../../utils/vizinhos-projeto.util'
import { CreditosProjeto } from './components/creditos-projeto.component'
import { FichaProjeto } from './components/ficha-projeto.component'
import { NavegacaoVizinhos } from './components/navegacao-vizinhos.component'
import { OutrosProjetos } from './components/outros-projetos.component'
import { RegistrosProjeto } from './components/registros-projeto.component'
import { ReprodutorVideo } from './components/reprodutor-video.component'

interface IProps {
  idioma: TIdioma
  slug: string
}

export async function DetalheProjetoPage({ idioma, slug }: Readonly<IProps>) {
  const [projeto, projetos] = await Promise.all([
    projetoService.buscarPorSlug(idioma, slug),
    projetoService.listar(idioma),
  ])
  if (!projeto) notFound()

  const textos = obterDicionario(idioma)
  const vizinhos = encontrarVizinhos(projetos, projeto.slug)
  const outros = selecionarOutrosProjetos(projetos, projeto, 3)
  const ficha = [
    { rotulo: textos.projeto.categoria, valor: textos.categorias[projeto.categoria] },
    { rotulo: textos.projeto.ano, valor: String(projeto.ano) },
    ...(projeto.cliente ? [{ rotulo: textos.projeto.cliente, valor: projeto.cliente }] : []),
    { rotulo: textos.projeto.local, valor: projeto.local },
  ]

  return (
    <article>
      <header className="moldura pt-10 pb-12 md:pt-16 md:pb-16">
        <Link
          href={Rotas.secao(idioma, Ancoras.TRABALHOS)}
          className="inline-flex items-center gap-2 py-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon aria-hidden="true" strokeWidth={1.5} className="size-4" />
          {textos.projeto.todosOsTrabalhos}
        </Link>
        <h1 className="titulo-cinema mt-10 mb-12 text-[clamp(3rem,11vw,9rem)] md:mt-14 md:mb-16">
          {projeto.titulo}
        </h1>
        <FichaProjeto itens={ficha} />
      </header>

      <div className="moldura">
        {projeto.video ? (
          <ReprodutorVideo
            video={projeto.video}
            capa={projeto.capa}
            tituloProjeto={projeto.titulo}
            textos={{
              assistir: textos.projeto.assistir,
              assistirTitulo: textos.projeto.assistirTitulo,
            }}
          />
        ) : (
          <Quadro imagem={projeto.capa} sizes="100vw" ehPrioritario className="aspect-video" />
        )}
      </div>

      <div className="moldura grid gap-16 pt-20 md:grid-cols-12 md:pt-28">
        <p className="titulo-secao text-[1.5rem] text-texto-apoio md:col-span-8 md:text-[2rem]">
          {projeto.resumo}
        </p>
        <dl className="grid gap-10 md:col-span-12 md:grid-cols-3 md:gap-12">
          {[
            { rotulo: textos.projeto.contexto, texto: projeto.contexto },
            { rotulo: textos.projeto.objetivo, texto: projeto.objetivo },
            { rotulo: textos.projeto.papel, texto: projeto.papel },
          ].map((bloco) => (
            <div key={bloco.rotulo} className="border-border border-t pt-5">
              <dt className="text-muted-foreground text-sm">{bloco.rotulo}</dt>
              <dd className="mt-3 max-w-sm text-texto-apoio">{bloco.texto}</dd>
            </div>
          ))}
        </dl>
      </div>

      <RegistrosProjeto registros={projeto.registros} titulo={textos.projeto.registros} />
      <CreditosProjeto creditos={projeto.creditos} titulo={textos.projeto.creditos} />

      {vizinhos ? (
        <NavegacaoVizinhos
          anterior={{
            href: ProjetoPaginas.detalhe(idioma, vizinhos.anterior.slug),
            titulo: vizinhos.anterior.titulo,
          }}
          proximo={{
            href: ProjetoPaginas.detalhe(idioma, vizinhos.proximo.slug),
            titulo: vizinhos.proximo.titulo,
          }}
          textos={{
            anterior: textos.projeto.anterior,
            proximo: textos.projeto.proximo,
            rotulo: textos.projeto.outrosProjetos,
          }}
        />
      ) : null}

      <OutrosProjetos idioma={idioma} projetos={outros} textos={textos} />
    </article>
  )
}

/** Metadados da rota de detalhe. Slug desconhecido não gera metadados: a página chama notFound(). */
export async function gerarMetadadosDetalheProjeto({ idioma, slug }: IProps): Promise<Metadata> {
  const projeto = await projetoService.buscarPorSlug(idioma, slug)
  return projeto ? gerarMetadadosProjeto(projeto, idioma) : {}
}

/** Slugs gerados no build, para cada idioma. */
export async function gerarSlugsDetalheProjeto(): Promise<{ slug: string }[]> {
  const slugs = await projetoService.listarSlugs()
  return slugs.map((slug) => ({ slug }))
}
