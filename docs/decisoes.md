# Decisões registradas

Complementa a [arquitetura](./arquitetura.md). Cada item diz o que foi decidido, por quê e onde está no código.

## Internacionalização (pt-BR e en)

- **Rotas com prefixo de idioma:** `/pt/...` e `/en/...`, no segmento dinâmico `app/[locale]`, que é o layout raiz
  (o `<html lang>` muda por idioma). Os dois idiomas são gerados no build (`generateStaticParams`, `dynamicParams = false`).
- **Sem `proxy.ts`:** a raiz e qualquer caminho sem idioma são redirecionados para `/pt` por `redirects()` no
  `next.config.ts`. Detecção por `Accept-Language` não foi feita porque o idioma padrão do site é sempre pt-BR.
- **Textos de interface** ficam em `src/common/i18n/dicionarios/<idioma>.dicionario.ts`, tipados por `IDicionario`.
  Um teste garante que os dois idiomas têm as mesmas chaves. Isso substitui, para este projeto, a regra
  "textos escritos direto no componente" da arquitetura (que pedia uma spec própria para mais de um idioma).
- **Conteúdo editorial** (projetos, bio, serviços) fica em `src/content/*.json` com os campos `{ "pt": ..., "en": ... }`.
  Os services de `api/resources/*/server` validam com Zod e devolvem o model já no idioma pedido.
- **SEO:** cada página gera canonical, `hreflang` (pt-BR, en, x-default) e Open Graph localizado
  (`common/utils/metadados.util.ts`); o `sitemap.xml` lista as duas versões de cada página com alternates.
- O seletor usa as siglas PT e EN (sem bandeiras), preserva a página atual e não toca no tema.

## Tema (claro e escuro)

- A arquitetura previa ler o cookie do tema no `app/layout.tsx`. Isso tornaria todas as páginas dinâmicas e não
  permitiria seguir o tema do sistema na primeira visita sem flash. Seguindo o guia
  "Preventing flash before hydration" da documentação do Next 16, o cookie é lido por um script inline no `<head>`
  (`SCRIPT_ESQUEMA_COR`, em `infrastructure/tema/esquema-cor.ts`), que aplica a classe `dark` antes da primeira pintura.
- Sem escolha salva, vale o tema do sistema; sem preferência do sistema, o escuro (tema de referência da marca).
- A troca acontece no navegador (`aplicarEsquemaCor`) e grava o cookie `portfolio.esquema-cor`. A server action
  `definirEsquemaCor` não foi criada: ela faria uma ida ao servidor sem ganho, já que o servidor não lê o cookie.
- `SincronizadorTema` reaplica a preferência quando o React recria o layout raiz (troca de idioma).
- Os controles de tema e idioma ficam no módulo `preferencias` e entram no `CabecalhoSite` por slot (`acoes`),
  porque `common` não pode importar `infrastructure`.

## Interface

- Componentes `ui/button.tsx` e `ui/sheet.tsx` seguem o estilo `base-nova` do shadcn. Foram escritos sem o CLI
  porque o ambiente de criação não alcançava o registro do shadcn; podem ser regerados com
  `pnpm dlx shadcn@latest add button sheet`.
- Tipografia: Archivo variável (eixo de largura) servida localmente por `next/font/local` a partir de
  `@fontsource-variable/archivo`. Corpo em largura normal; títulos expandidos (`titulo-cinema`, `titulo-secao`).
- Sem formulário de contato: os canais (e-mail, WhatsApp, Instagram) são links diretos. Assim não há backend,
  segredo nem proteção contra spam a manter. `react-hook-form`, `@hookform/resolvers`, `date-fns` e
  `@tanstack/react-query` não foram instalados por não haver uso.
- Vídeos usam um player sob demanda: a capa aparece primeiro e o iframe (YouTube sem cookies ou Vimeo com `dnt`)
  só carrega no clique.
- A seção de clientes e depoimentos só aparece quando houver itens em `src/content/perfil.json`.

## Conteúdo provisório

Todo o conteúdo atual é mockado e deve ser substituído:

- Nome, bio, contatos e serviços: `src/content/perfil.json`.
- Projetos: `src/content/projetos.json`. Fotos do Unsplash e vídeos dos filmes abertos da Blender Foundation
  (licença CC BY) servem só como marcadores de lugar.
- Novos domínios de imagem ou vídeo precisam entrar em `ORIGENS_IMAGEM` / `ORIGENS_VIDEO` no `next.config.ts`
  (CSP e `images.remotePatterns`).
