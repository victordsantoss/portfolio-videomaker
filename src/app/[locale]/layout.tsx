import '../globals.css'

import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'

import { perfilService } from '@/api/resources/perfil/server/perfil.service'
import { CabecalhoSite } from '@/common/components/layout/cabecalho-site.component'
import { RodapeSite } from '@/common/components/layout/rodape-site.component'
import { SiteLayout } from '@/common/components/layout/site-layout.component'
import { obterDicionario } from '@/common/i18n/dicionario.util'
import { IDIOMAS } from '@/common/i18n/idioma.constant'
import { ehIdiomaValido } from '@/common/i18n/idioma.util'
import { IdiomaMapper } from '@/common/mappers/idioma.mapper'
import { criarLinkEmail, criarLinkInstagram } from '@/common/utils/contato.util'
import { Ancoras, Rotas } from '@/common/utils/rotas.util'
import { envServidor } from '@/infrastructure/env/server.env'
import { CLASSE_TEMA_ESCURO, SCRIPT_ESQUEMA_COR } from '@/infrastructure/tema/esquema-cor'
import { AlternadorTema, SeletorIdioma, SincronizadorTema } from '@/modules/preferencias'

/** Archivo variável com eixo de largura: o corpo em largura normal, os títulos expandidos. */
const archivo = localFont({
  src: '../../../node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2',
  variable: '--fonte-archivo',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  declarations: [{ prop: 'font-stretch', value: '62% 125%' }],
})

export const dynamicParams = false

export function generateStaticParams() {
  return IDIOMAS.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eef1f4' },
    { media: '(prefers-color-scheme: dark)', color: '#10151c' },
  ],
}

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  if (!ehIdiomaValido(locale)) return {}
  const perfil = await perfilService.buscar(locale)

  return {
    metadataBase: new URL(envServidor.URL_SITE),
    title: { default: perfil.nome, template: `%s | ${perfil.nome}` },
    description: obterDicionario(locale).metadados.descricao,
    applicationName: perfil.nome,
    authors: [{ name: perfil.nome }],
    creator: perfil.nome,
  }
}

export default async function LayoutIdioma({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params
  if (!ehIdiomaValido(locale)) notFound()

  const textos = obterDicionario(locale)
  const perfil = await perfilService.buscar(locale)
  const itensNavegacao = [
    { href: Rotas.secao(locale, Ancoras.TRABALHOS), rotulo: textos.navegacao.trabalhos },
    { href: Rotas.secao(locale, Ancoras.SOBRE), rotulo: textos.navegacao.sobre },
    { href: Rotas.secao(locale, Ancoras.CONTATO), rotulo: textos.navegacao.contato },
  ]

  return (
    <html lang={IdiomaMapper[locale].tag} className={CLASSE_TEMA_ESCURO} suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: script fixo do projeto, aplica o tema antes da primeira pintura. */}
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_ESQUEMA_COR }} />
      </head>
      <body className={archivo.variable}>
        <SincronizadorTema />
        <SiteLayout
          textoPularConteudo={textos.navegacao.pularParaConteudo}
          cabecalho={
            <CabecalhoSite
              nome={perfil.nome}
              hrefInicio={Rotas.inicio(locale)}
              itens={itensNavegacao}
              textos={{
                rotuloNavegacao: textos.navegacao.rotulo,
                rotuloInicio: textos.navegacao.inicio,
                abrirMenu: textos.navegacao.abrirMenu,
                fecharMenu: textos.navegacao.fecharMenu,
                menu: textos.navegacao.menu,
              }}
              acoes={
                <>
                  <SeletorIdioma idiomaAtual={locale} rotulo={textos.preferencias.idioma} />
                  <AlternadorTema
                    textos={{
                      temaClaro: textos.preferencias.temaClaro,
                      temaEscuro: textos.preferencias.temaEscuro,
                    }}
                  />
                </>
              }
            />
          }
          rodape={
            <RodapeSite
              nome={perfil.nome}
              ano={new Date().getFullYear()}
              textoDireitos={textos.rodape.direitos}
              links={[
                { href: criarLinkEmail(perfil.contatos.email), rotulo: textos.contato.email },
                ...(perfil.contatos.instagram
                  ? [
                      {
                        href: criarLinkInstagram(perfil.contatos.instagram),
                        rotulo: textos.contato.instagram,
                        ehExterno: true,
                      },
                    ]
                  : []),
              ]}
              voltarAoTopo={{ href: `#${Ancoras.TOPO}`, rotulo: textos.rodape.voltarAoTopo }}
            />
          }
        >
          {children}
        </SiteLayout>
      </body>
    </html>
  )
}
