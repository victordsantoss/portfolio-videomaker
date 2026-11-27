# Arquitetura do front-end do portfólio

Referência técnica do projeto: stack, bibliotecas, camadas, estrutura de pastas, nomenclatura, padrões de código,
testes e ferramentas de qualidade. Vale para todo arquivo novo. Este documento diz **como o código é construído**;
o que o portfólio é e o que deve mostrar está no contexto do projeto.

> **Atenção:** o Next 16 mudou APIs e convenções em relação às versões anteriores (por exemplo, `middleware.ts`
> virou `proxy.ts`, e a API de cache mudou). Antes de usar uma API do Next, confira a documentação que vem no pacote,
> em `node_modules/next/dist/docs/`, e respeite os avisos de depreciação.

## Sumário

1. [Stack](#stack)
2. [Bibliotecas](#bibliotecas)
3. [Camadas](#camadas)
4. [Estrutura de pastas](#estrutura-de-pastas)
5. [Rotas, renderização e SEO](#rotas-renderização-e-seo)
6. [Buscando dados](#buscando-dados)
7. [Formulários e validação](#formulários-e-validação)
8. [Textos](#textos)
9. [Interface: shadcn/ui, Tailwind e tema](#interface-shadcnui-tailwind-e-tema)
10. [Erros, carregamento e logs](#erros-carregamento-e-logs)
11. [Ambiente e segurança](#ambiente-e-segurança)
12. [Idioma do código](#idioma-do-código)
13. [Nomenclatura](#nomenclatura)
14. [Padrões de código](#padrões-de-código)
15. [Testes](#testes)
16. [Qualidade: lint, formatação e hooks de commit](#qualidade-lint-formatação-e-hooks-de-commit)
17. [Build e deploy](#build-e-deploy)
18. [Criando um módulo novo](#criando-um-módulo-novo)

## Stack

| Tecnologia              | Uso                                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------- |
| Next.js 16 (App Router) | Rotas, Server Components, renderização estática, metadados e SEO.                                    |
| React 19                | Interface. Server Components por padrão; `'use client'` só onde há interação.                        |
| TypeScript 5 (strict)   | Tipagem estática. O `pnpm typecheck` roda a cada commit.                                             |
| Tailwind CSS 4          | Estilos por classes utilitárias, configurado só por CSS (`globals.css`, sem `tailwind.config`).      |
| shadcn/ui (base-nova)   | Componentes copiados para o projeto, sobre o Base UI. Tema em `globals.css`.                         |
| Node 24 LTS             | Runtime do build e do servidor (`.nvmrc`, `engines` no `package.json`, `engine-strict` no `.npmrc`). |
| pnpm 10                 | Gerenciador de pacotes, com versão fixada em `packageManager` e ativada pelo `corepack`.             |

O App Router permite montar as páginas no servidor (de preferência estáticas, no build) e deixar no navegador só o que
precisa de interação.

## Bibliotecas

### Interface

| Biblioteca                 | Para que serve                                                                                                          |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `shadcn`                   | CLI que adiciona componentes em `common/components/ui`. Fornece o CSS base (`shadcn/tailwind.css`). Estilo `base-nova`. |
| `@base-ui/react`           | Primitivas acessíveis (dropdown, tooltip, dialog, sheet) usadas pelos componentes do shadcn.                            |
| `class-variance-authority` | Variantes de componente (`variant`, `size`).                                                                            |
| `cn`                       | Junta classes do Tailwind e resolve conflitos. Exportado em `common/utils/classes.util.ts`.                             |
| `lucide-react`             | Ícones.                                                                                                                 |
| `tw-animate-css`           | Animações usadas pelos componentes do shadcn.                                                                           |

### Dados

| Biblioteca              | Para que serve                                                                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fetch` (do Next)       | Buscas no servidor, com as opções de cache e tags do Next.                                                                                              |
| `@tanstack/react-query` | Só quando houver dado que muda sem navegar (busca enquanto digita, paginação infinita, envio de formulário com estados). Não instale antes de precisar. |
| `server-only`           | Faz o build falhar se um módulo de servidor (services de `server/`, `server.env`) for importado no navegador.                                           |
| `client-only`           | Faz o build falhar se um módulo do navegador for importado num Server Component.                                                                        |

### Formulários e validação

| Biblioteca            | Para que serve                                                                        |
| --------------------- | ------------------------------------------------------------------------------------- |
| `react-hook-form`     | Estado e envio de formulários sem re-render a cada tecla.                             |
| `zod`                 | Schemas de formulário, de parâmetros da URL, de conteúdo e das variáveis de ambiente. |
| `@hookform/resolvers` | Liga os schemas do Zod ao react-hook-form.                                            |

### Datas e números

| Biblioteca          | Para que serve                                                                                            |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| `date-fns`          | Formatação de datas em pt-BR, centralizada em `common/utils/data.util.ts`.                                |
| `Intl.NumberFormat` | Números, centralizados em `common/utils/numero.util.ts`. Nada de `toLocaleString` ou `toFixed` espalhado. |

### Desenvolvimento

| Biblioteca                         | Para que serve                                                                                                    |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `@biomejs/biome`                   | Lint, formatação e ordem dos imports numa só ferramenta. Também bloqueia imports entre camadas no sentido errado. |
| `husky`                            | Hooks de git versionados. O `pre-commit` roda o lint-staged e o typecheck.                                        |
| `lint-staged`                      | Roda o Biome só nos arquivos staged, aplicando as correções automáticas.                                          |
| `vitest`                           | Testes unitários, com o `.test.ts` ao lado do arquivo testado.                                                    |
| `@testing-library/react` e `jsdom` | Renderizam hooks num DOM simulado nos testes.                                                                     |
| `@playwright/test`                 | Testes ponta a ponta em `e2e/`.                                                                                   |

## Camadas

As dependências seguem um só sentido:

```
app → modules → api → infrastructure → common
```

| Camada           | Pode importar                                                      | Não pode importar                  |
| ---------------- | ------------------------------------------------------------------ | ---------------------------------- |
| `app`            | todas                                                              | —                                  |
| `modules`        | `api`, `infrastructure`, `common` e outros módulos pelo `index.ts` | arquivos internos de outro módulo  |
| `api`            | `infrastructure`, `common`                                         | `modules`                          |
| `infrastructure` | `common`                                                           | `modules`, `api`                   |
| `common`         | só `common`                                                        | `modules`, `api`, `infrastructure` |

O Biome (`biome.jsonc`, regra `noRestrictedImports`) bloqueia o que dá para expressar por caminho:

- fora de um módulo, importe-o só pelo `index.ts` (`@/modules/<modulo>`); dentro do módulo, os imports são relativos;
- `api` não importa `modules`;
- `infrastructure` e `common` não importam `api` nem `modules`;
- `client/` de um recurso só alcança `server/` por `*.action`; `server/` não importa `client/`.

Quando um componente de `common` precisa de algo de um módulo, o módulo passa essa parte pronta por prop (composição
por slot). Qualquer exceção à matriz é registrada nesta seção, com o motivo.

## Estrutura de pastas

```
src/
  app/                              rotas (só composição)
    (site)/                         páginas públicas do portfólio (layout em common/components/layout)
    api/                            route handlers (ex.: envio do formulário de contato)
    sitemap.ts, robots.ts           SEO
  proxy.ts                          só se houver necessidade real (redirects, headers por requisição)
  instrumentation.ts                log de erros do servidor; na subida, valida o env
  api/
    _core/                          cliente HTTP e utilitários comuns (sem conhecimento de recurso)
    resources/<recurso>/            dto e cache (keys e tags); client/ (service e hooks) e server/ (service e action)
  content/                          conteúdo local (MD/MDX/JSON), lido só pelos services de api/resources/*/server
  infrastructure/                   env, cookies, storage, tema, logger
  providers/                        providers do client
  modules/
    <modulo>/                       uma funcionalidade ou seção do site (ex.: inicio, projetos, sobre, contato)
  common/                           componentes, enums, mappers, utils, hooks, models, tipos
    components/ui/                  componentes gerados pelo shadcn (não editar à mão)
```

Pastas entre parênteses são grupos de rota do Next: permitem um `layout.tsx` por grupo, mas não entram na URL. Pastas
vazias que fazem parte da arquitetura levam um `.keep`.

**Conteúdo local é acessado como uma API.** Projetos, experiências e textos longos ficam em `src/content`, mas a
interface nunca os importa direto: quem lê é o service de `api/resources/<recurso>/server`, que valida com Zod e devolve
o model. Trocar o arquivo por um CMS ou uma API depois muda só o service.

### Para que serve cada pasta

| Pasta                                | Para que serve                                                                                                             | Arquivos                                                                                                                               | Teste unitário         |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `src/app`                            | Rotas do App Router, só com composição: importa layouts e páginas dos modules.                                             | `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `globals.css`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` | Não                    |
| `src/providers`                      | Providers da árvore React, compostos em `index.tsx` pelo `Provedores`.                                                     | `<nome>.provider.tsx`                                                                                                                  | Não                    |
| `src/api/_core`                      | Cliente HTTP do navegador (se houver) e utilitários do servidor para chamadas externas.                                    | `<nome>.http.ts`, `<nome>.util.ts`                                                                                                     | Só os `.util.ts`       |
| `src/api/resources/<nome>`           | Um recurso: o contrato (DTO) e o cache, a única fonte de query keys e tags.                                                | `<nome>.dto.ts`, `<nome>.cache.ts`, `<nome>.mapper.ts`                                                                                 | Não                    |
| `src/api/resources/<nome>/server`    | Buscas no servidor (conteúdo local ou API externa) e a server action que expira as tags do recurso.                        | `<nome>.service.ts`, `<nome>.action.ts`                                                                                                | Não                    |
| `src/api/resources/<nome>/client`    | Acesso no navegador: service (só HTTP) e hooks do React Query. Só existe quando há interação que precise.                  | `<nome>.service.ts`, `use-<nome>-queries.hook.ts`                                                                                      | Só os hooks            |
| `src/content`                        | Conteúdo do portfólio em arquivo. Sem código de interface.                                                                 | `.md`, `.mdx`, `.json`                                                                                                                 | Não                    |
| `src/infrastructure/env`             | Variáveis de ambiente validadas com Zod na subida.                                                                         | `server.env.ts` (e `client.env.ts`, se houver `NEXT_PUBLIC_*`)                                                                         | Não                    |
| `src/infrastructure/cookies`         | Cookies por recurso, com as chaves em `CookieKeys`.                                                                        | `<nome>.cookie.ts`, `keys.cookie.ts`, `cookie.util.ts`                                                                                 | Só o `cookie.util.ts`  |
| `src/infrastructure/storage`         | localStorage e sessionStorage por recurso, com as chaves em `StorageKeys`.                                                 | `<nome>.storage.ts`, `keys.storage.ts`, `storage.util.ts`                                                                              | Só o `storage.util.ts` |
| `src/infrastructure/tema`            | Esquema de cores (claro ou escuro) em cookie e a action que o altera.                                                      | `esquema-cor.ts`, `esquema-cor.action.ts`                                                                                              | Não                    |
| `src/infrastructure/observability`   | Ponto único de log. No servidor sai em JSON por linha.                                                                     | `logger.util.ts`                                                                                                                       | Sim                    |
| `src/common/components/<componente>` | Componentes usados por mais de um módulo, uma subpasta por componente.                                                     | `<nome>.component.tsx`                                                                                                                 | Não                    |
| `src/common/components/ui`           | Componentes do shadcn, gerados pelo CLI. Fora da regra de sufixos e do lint.                                               | `<nome>.tsx`                                                                                                                           | Não                    |
| `src/common/enums`                   | Enums usados por **mais de um módulo**.                                                                                    | `<nome>.enum.ts`                                                                                                                       | Não                    |
| `src/common/hooks`                   | Hooks usados por mais de um módulo.                                                                                        | `use-<nome>.hook.ts`                                                                                                                   | Sim                    |
| `src/common/mappers`                 | Mapas de valor para rótulo usados por **mais de um módulo**.                                                               | `<nome>.mapper.ts`                                                                                                                     | Não                    |
| `src/common/models`                  | Interfaces de domínio (`I<Nome>Model`) usadas por **mais de um módulo** ou pela camada `api`.                              | `<nome>.model.ts`                                                                                                                      | Não                    |
| `src/common/types`                   | Tipos genéricos reutilizáveis. Tipos de um componente ficam na pasta dele.                                                 | `<nome>.type.ts`                                                                                                                       | Não                    |
| `src/common/utils`                   | Funções puras e reutilizáveis, sempre com teste ao lado.                                                                   | `<nome>.util.ts`                                                                                                                       | Sim                    |
| `src/modules/<modulo>`               | Uma funcionalidade ou seção. O `index.ts` é a única porta de entrada.                                                      | `index.ts`                                                                                                                             | Não                    |
| `…/components`                       | Componentes usados por **mais de uma página** do módulo. Enquanto só uma página usa, o arquivo fica em `pages/<pagina>/…`. | `<nome>.component.tsx`, `<nome>.lazy.ts`                                                                                               | Não                    |
| `…/domain`                           | Constantes, schemas, enums, models e tipos usados só pelo módulo.                                                          | `<nome>.constant.ts`, `<nome>.schema.ts`, `<nome>.enum.ts`, `<nome>.model.ts`                                                          | Não                    |
| `…/hooks`                            | Hooks usados só pelo módulo.                                                                                               | `use-<nome>.hook.ts`                                                                                                                   | Sim                    |
| `…/mappers`                          | Mappers usados só pelo módulo (rótulo, formulário para DTO).                                                               | `<nome>.mapper.ts`                                                                                                                     | Não                    |
| `…/pages/<pagina>`                   | Páginas do módulo, montadas pelas rotas de `app`.                                                                          | `<pagina>.page.tsx`                                                                                                                    | Não                    |
| `…/pages/<pagina>/components`        | Componentes e schemas usados por uma única página.                                                                         | `<nome>.component.tsx`, `<nome>.schema.ts`                                                                                             | Não                    |
| `…/utils`                            | Funções puras usadas só pelo módulo, incluindo os metadados das páginas.                                                   | `<nome>.util.ts`                                                                                                                       | Sim                    |

### Escopo: módulo ou `common`

Não compartilhe cedo. O critério é **quem usa hoje**, não quem pode usar depois.

- **Exclusivo de um módulo:** model, enum, tipo, constante, schema e mapper ficam nesse módulo (`domain/`, `mappers/`).
- **Usado por mais de um módulo:** aí sobe para `common/`.
- **Model que a camada `api` devolve** fica em `common/models`, porque `api` não importa `modules`.
- **Enums e mappers agrupam por contexto**, não por valor: um `projeto.enum.ts` com todos os enums de projeto, um
  `projeto.mapper.ts` com todos os mappers de projeto.

Toda página tem a sua pasta, `pages/<pagina>/<pagina>.page.tsx`, mesmo num módulo de uma página só.

## Rotas, renderização e SEO

- Rotas conhecidas ficam em `Rotas` (`common/utils/rotas.util.ts`). Rotas internas de um módulo (ex.: detalhe de um
  projeto por slug) ficam no `domain/navegacao.constant.ts` dele (`<Modulo>Paginas`, com funções como
  `ProjetoPaginas.detalhe(slug)`). Nada de caminho escrito à mão em `href`.
- **Estático por padrão.** Páginas do portfólio são geradas no build. Rotas dinâmicas por slug usam
  `generateStaticParams` a partir do service do recurso. Só renderize por requisição o que realmente depende dela.
- **Metadados:** cada página exporta `generateMetadata` (ou `metadata`) vindo do util de metadados do módulo
  (`<modulo>-metadados.util.ts`), com título, descrição e Open Graph. O layout raiz define `metadataBase` e o template
  de título.
- **SEO:** `app/sitemap.ts` e `app/robots.ts` gerados a partir de `Rotas` e dos services (projetos por slug). Imagem
  Open Graph por `opengraph-image.tsx` quando fizer sentido.
- **404:** `app/not-found.tsx` com `PaginaNaoEncontrada`. Slug inexistente chama `notFound()` na página.
- **Acessibilidade:** link "Ir para o conteúdo" (`#conteudo-principal`), `header`, `nav` com `aria-label`, `main` e
  `footer` como landmarks; um único `h1` por página (`TituloPagina`).

## Buscando dados

**Servidor primeiro.** A página chega pronta do servidor; o navegador só busca o que muda sem navegar.

| Situação                                                             | Caminho                                                                                       |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Conteúdo exibido ao abrir a página (projetos, sobre, experiências)   | Servidor: service de `api/resources/<recurso>/server/`                                        |
| Dado que muda sem navegar: busca enquanto digita, paginação infinita | Navegador: hook de `client/` com React Query                                                  |
| O mesmo dado nas duas situações                                      | Pré-carrega no servidor para o React Query, com a mesma chave de `<recurso>Cache.keys`        |
| Escrita (ex.: enviar mensagem de contato)                            | No navegador: mutation chamando um route handler (`app/api/<nome>/route.ts`) ou server action |

### No servidor

```tsx
const projeto = await projetoService.buscarPorSlug(slug)
if (!projeto) notFound()
```

- O service esconde a origem (arquivo em `src/content`, CMS ou API externa), valida com Zod e devolve o model pelo
  mapper. A página não sabe de onde o dado veio.
- Chamadas independentes em `Promise.all`. A mesma busca em vários componentes da página: envolva o service em
  `cache()` do React.
- Quando a origem for externa, as tags ficam em `<recurso>.cache.ts` (`<recurso>Cache.tags`), e a revalidação é feita
  pela action do recurso (`revalidar<Recurso>()`), que expira só as tags dele e nunca aceita tags por parâmetro.
- Não chame `redirect()` nem `notFound()` dentro de `try/catch`: eles funcionam lançando um erro.

### No navegador (só quando necessário)

- `<recurso>.service.ts`: só HTTP. Resolve com o DTO ou rejeita com `IErro` (formato único).
- `use-<recurso>-queries.hook.ts`: hooks do React Query; a invalidação de cache fica dentro do hook de mutation.
- A interface nunca chama `fetch` ou axios direto: componente → hook → service → cliente HTTP.
- `QueryClient` criado em `providers/query-client.ts` (`criarQueryClient()`), com `staleTime` de 1 minuto, 1
  retentativa em queries, nenhuma em mutations e sem refetch ao focar a janela. No servidor, sempre uma instância nova
  por requisição.

### Filtros na URL

Filtros de listagem (ex.: projetos por tecnologia) ficam na URL, por um hook de `common/hooks`
(`useParametrosFiltro`). O schema Zod do filtro usa um fallback (`comFallback`, em `common/utils/schema.util.ts`) para
que um valor inválido na URL volte ao padrão em vez de quebrar a página.

## Formulários e validação

- `react-hook-form` com `zodResolver` e `mode: 'onTouched'`. O schema fica junto da página que o usa
  (`pages/<pagina>/components/<nome>.schema.ts`), ou em `domain/` se mais de uma página usar.
- As mensagens de erro do schema são o texto final exibido. As comuns ficam em `MensagensValidacao`
  (`common/utils/schema.util.ts`): `MensagensValidacao.OBRIGATORIO`, `MensagensValidacao.tamanhoMinimo(8)`.
- O tipo dos valores vem do schema (`z.infer`). A conversão para o contrato de envio fica num mapper
  (`ContatoFormularioMapper.paraEnvio`).
- O route handler que recebe o formulário valida de novo com o mesmo schema: a validação do navegador é só
  experiência de uso.
- Campos usam `Field`, `FieldLabel`, `Input` e `FieldError` do shadcn, com `aria-invalid` ligado ao estado do campo,
  compostos em `common/components/formulario` (`CampoTexto`, `CampoAreaTexto`).

## Textos

- Os textos ficam escritos direto no componente que os exibe, e o `<html>` tem o `lang` do idioma do site.
- Texto usado por mais de um lugar vira constante perto de quem usa (`MensagensValidacao`, `ErroMapper`).
- Conteúdo editorial longo (descrição de projeto, bio) fica em `src/content`, não no JSX.
- Se o site precisar de mais de um idioma, isso é decidido numa spec própria antes de escrever as páginas.

## Interface: shadcn/ui, Tailwind e tema

- Componentes do shadcn em `src/common/components/ui`, adicionados pelo CLI com os aliases de `components.json`:
  `pnpm dlx shadcn@latest add <componente>`. Estilo `base-nova`. **Não edite esses arquivos à mão:** componha um
  componente em `common/components/<nome>` ou no módulo.
- Antes de criar um componente, procure no código.
- Componentes base do sistema, compostos a partir do shadcn:

  | Componente                           | Pasta                          | Uso                                                            |
  | ------------------------------------ | ------------------------------ | -------------------------------------------------------------- |
  | `SiteLayout`                         | `common/components/layout`     | Casca do site: cabeçalho, navegação, `main` e rodapé           |
  | `CabecalhoSite`, `RodapeSite`        | `common/components/layout`     | Navegação principal (Sheet no mobile) e rodapé                 |
  | `LayoutPaginaEstado`                 | `common/components/layout`     | Casca compartilhada do `error.tsx` e do `not-found.tsx`        |
  | `EstadoVazio`, `Aviso`, `Carregando` | `common/components/estado`     | Estados de tela (`Aviso`: info, alerta, erro, sucesso)         |
  | `PaginaErro`, `PaginaNaoEncontrada`  | `common/components/estado`     | Telas do `error.tsx` e do `not-found.tsx`                      |
  | `TituloPagina`, `CabecalhoPagina`    | `common/components/pagina`     | O `h1` da página; título, descrição e ação opcional            |
  | `Secao`                              | `common/components/pagina`     | Bloco de seção com título (`h2`), espaçamento e largura padrão |
  | `Cartao`                             | `common/components/cartao`     | Superfície padrão dos cards, sobre o `Card` do shadcn          |
  | `CampoTexto`, `CampoAreaTexto`       | `common/components/formulario` | Campos ligados ao react-hook-form, com a mensagem do schema    |

- **Tema:** tokens de cor, tipografia e raio em `src/app/globals.css` (`--primary`, `--background`…), com aliases
  da marca como utilitários Tailwind. Fontes por `next/font` no layout raiz, com `display: swap`. O modo escuro é a
  classe `dark` no `<html>`, lida de um cookie em `app/layout.tsx` e alterada pela action `definirEsquemaCor`. Sem
  `next-themes`.
- **Imagens:** sempre `next/image`, com `alt` descritivo, `sizes` e `priority` só na imagem acima da dobra.
- Componente renderizado só por condição (modal, lightbox, galeria pesada) vai para um `.lazy.ts` com `next/dynamic`.

## Erros, carregamento e logs

- **Mensagens de erro vêm de um catálogo único, pelo código.** Os códigos ficam em `CodigoErroEnum`
  (`common/enums/codigo-erro.enum.ts`) e os textos em `ErroMapper` (`common/mappers/erro.mapper.ts`).
  `ErroMapper.paraMensagem({ codigo, status })` procura pelo código; sem ele, pelo status HTTP; senão, a genérica.
- **Nunca exiba a mensagem técnica de uma API externa:** ela vai só para o log.
- **Contrato único de erro** nos route handlers: `{ statusCode, code, message }`, montado por
  `responderErro(codigo)` (`api/_core/resposta-erro.util.ts`). Não escreva `NextResponse.json({ code, ... })` à mão.
- `error.tsx` usa `PaginaErro`, `not-found.tsx` usa `PaginaNaoEncontrada` e `loading.tsx` usa `Carregando`.
- `logger` (`infrastructure/observability/logger.util.ts`) é o ponto único de log: no servidor, uma linha JSON por
  entrada; no navegador, com prefixo legível. Nada de `console.*` fora dele.
- `instrumentation.ts` loga os erros do servidor.

## Ambiente e segurança

- Variáveis validadas com Zod em `infrastructure/env/server.env.ts` (`envServidor`, com `server-only`), na subida
  (`register()` do `instrumentation.ts`; em produção, encerra o processo se estiverem inválidas). Leia sempre por
  `envServidor`, nunca por `process.env` espalhado.
- `NEXT_PUBLIC_*` só para o que é público de fato (ex.: id de analytics), validado em `client.env.ts`. Segredos (chave
  do serviço de e-mail, token de API) nunca vão ao navegador.
- Route handlers de escrita conferem o header `Origin` e limitam o tamanho do corpo; o formulário de contato tem
  proteção contra spam (honeypot ou limite por IP).
- `next.config.ts` envia headers de segurança (`X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`)
  e uma Content Security Policy. Todo domínio externo (imagens, fontes, analytics) entra explicitamente na CSP e em
  `images.remotePatterns`.
- Cookies e chaves de storage usam um prefixo do projeto (`<prefixo>.`), com as chaves em `CookieKeys` e `StorageKeys`.

## Idioma do código

O código é escrito em português (pt-BR), com quatro exceções:

1. **Contrato com API externa fica como ela define:** propriedades de DTO, valores de enum enviados, caminhos e query
   params. Os nomes de tipos e de membros de enum são traduzidos (`StatusEnum.PUBLICADO = 'PUBLISHED'`). A conversão
   fica num mapper.
2. **Termos técnicos consagrados ficam em inglês:** debounce, cookie, storage, query, cache, token, layout, logger,
   mapper, schema, fetch, http, service, provider e slug.
3. **Sufixos de arquivo, pastas da arquitetura, prefixos `I`/`T` e o prefixo `use` dos hooks ficam como estão.**
4. **APIs do Next e do React mantêm os nomes delas:** `page.tsx`, `generateMetadata`, `params`, `generateStaticParams`.

Booleanos usam verbo auxiliar em português: `ehDestaque`, `estaCarregando`, `temLink`. Comentários, logs e nomes de
testes (`describe`/`it`) também ficam em português.

## Nomenclatura

O nome deve revelar a intenção: o sufixo diz o papel do arquivo, e o identificador diz o efeito.

### Sufixos de arquivo

| Sufixo           | Uso                                                     | Exemplo                        |
| ---------------- | ------------------------------------------------------- | ------------------------------ |
| `.component.tsx` | Componente React                                        | `cabecalho-site.component.tsx` |
| `.lazy.ts`       | Componente carregado sob demanda com `next/dynamic`     | `galeria-projeto.lazy.ts`      |
| `.page.tsx`      | Página de um módulo, montada por uma rota               | `projetos.page.tsx`            |
| `.provider.tsx`  | Provider da árvore React                                | `query.provider.tsx`           |
| `.context.tsx`   | Context React com Provider e hook                       | `navegacao.context.tsx`        |
| `.hook.ts`       | Hook React; o nome começa com `use-`                    | `use-debounce.hook.ts`         |
| `.enum.ts`       | Enums do mesmo contexto, agrupados                      | `projeto.enum.ts`              |
| `.model.ts`      | Interface de domínio (`I<Nome>Model`)                   | `projeto.model.ts`             |
| `.type.ts`       | Tipos genéricos                                         | `paginacao.type.ts`            |
| `.mapper.ts`     | Mapas do mesmo contexto (rótulo, contrato)              | `projeto.mapper.ts`            |
| `.util.ts`       | Funções puras                                           | `data.util.ts`                 |
| `.constant.ts`   | Constantes e tipos de negócio                           | `navegacao.constant.ts`        |
| `.schema.ts`     | Schema Zod de formulário, filtro, conteúdo ou parâmetro | `contato.schema.ts`            |
| `.mock.ts`       | Dados fictícios para testes                             | `projeto.mock.ts`              |
| `.dto.ts`        | Tipos de request e response                             | `contato.dto.ts`               |
| `.service.ts`    | Acesso a um recurso (conteúdo local ou HTTP)            | `projeto.service.ts`           |
| `.cache.ts`      | Query keys do React Query e tags de um recurso          | `projeto.cache.ts`             |
| `.cookie.ts`     | Acesso a cookies                                        | `esquema-cor.cookie.ts`        |
| `.storage.ts`    | Acesso ao localStorage                                  | `preferencias.storage.ts`      |
| `.action.ts`     | Server action                                           | `esquema-cor.action.ts`        |
| `.http.ts`       | Cliente HTTP                                            | `api.http.ts`                  |
| `.env.ts`        | Variáveis de ambiente validadas                         | `server.env.ts`                |
| `.test.ts`       | Teste do Vitest, ao lado do arquivo testado             | `data.util.test.ts`            |

### Arquivos e pastas

- Arquivos e pastas em kebab-case: `cabecalho-site.component.tsx`, `api/resources/projeto`.
- Testes ao lado do arquivo testado, com o mesmo nome e `.test.ts` no fim.
- Arquivos reservados do Next (`page.tsx`, `layout.tsx`, `error.tsx`, `sitemap.ts`...) não levam sufixo.
- `.page.tsx` só no arquivo que uma rota monta.
- Grupos de rota usam parênteses, como `(site)`.
- Exceção: `common/components/ui/` segue o nome do shadcn (`button.tsx`) para o `shadcn add` atualizar.

### Identificadores

| Tipo                                              | Padrão                                       | Exemplo                                                       |
| ------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------- |
| Interface                                         | `I<Nome>`                                    | `IProjetoModel`                                               |
| Type                                              | `T<Nome>`                                    | `TEsquemaCor`                                                 |
| Enum                                              | `<Nome>Enum`                                 | `CodigoErroEnum`                                              |
| Mapper                                            | `<Nome>Mapper`                               | `ContatoFormularioMapper`                                     |
| Componente (PascalCase, declarado com `function`) | `<Nome>`                                     | `CabecalhoSite`                                               |
| Hook                                              | `use<Nome>`                                  | `useParametrosFiltro`                                         |
| Constante                                         | `<NOME_EM_MAIUSCULAS>`                       | `MENSAGEM_TAMANHO_MAXIMO`                                     |
| Mapa de rotas de um módulo                        | `<Modulo>Paginas`                            | `ProjetoPaginas`                                              |
| Chaves de cookie e storage                        | `<Contexto>Keys`                             | `CookieKeys`, `StorageKeys`                                   |
| Service                                           | `<nome>Service`                              | `projetoService`                                              |
| Cache do recurso                                  | `<nome>Cache`                                | `projetoCache.keys.lista(filtros)`, `projetoCache.tags.lista` |
| DTO (namespace do recurso)                        | `<Nome>Dto.I<Acao><Recurso>Request/Response` | `ContatoDto.IEnviarMensagemRequest`                           |
| Mock                                              | `<NOME>_MOCK`                                | `PROJETO_MOCK`                                                |
| Booleano                                          | `eh<Estado>`, `esta<Estado>`, `tem<Algo>`    | `ehDestaque`, `estaEnviando`                                  |

## Padrões de código

### Interface ou type

- `interface` para formatos de objeto: props, models, DTOs e valores de context.
- Para estender um objeto, `extends` em vez de interseção com `&`.
- `type` para unions, literais e tipos derivados (`typeof`, `Omit`, `Pick`, `z.infer`, assinaturas de função).
- Prefixo `I` só em interface e `T` só em type. O Biome cobra com `useNamingConvention`.

### function ou arrow function

- Componentes declarados com `function`, com export nomeado (sem `export default`, exceto nos arquivos de rota).
- Toda função nomeada no nível do arquivo usa `function`: utils, hooks e actions. Helpers privados ficam abaixo de
  quem os usa.
- Arrow function para callbacks (`map`, `filter`, `then`) e para handlers declarados dentro do componente.

### Dentro ou fora do componente

- Dentro do componente, só o que depende de props, state ou hooks.
- Funções puras e conteúdo estático ficam fora: constantes acima, helpers abaixo.
- Helper usado por mais de um arquivo vai para `utils`, com teste.
- Ordem do arquivo: imports, tipos (incluindo a interface de props), constantes, componente exportado, helpers privados.
- Props recebidas como `Readonly<IProps>`.

### Server e Client Components

- Páginas e layouts são Server Components: buscam dados e leem cookies.
- `'use client'` só no componente folha que precisa de estado, efeitos ou eventos (menu mobile, troca de tema,
  formulário, filtro).
- Componentes que leem `useSearchParams` ficam dentro de `<Suspense>`.
- Server Components não passam funções nem componentes por prop para Client Components: passe dados serializáveis ou
  chaves (ex.: a chave de um ícone, resolvida por um mapa no client).

### Limites (sinais para revisar, não regras rígidas)

| O quê                                                                  | Limite aproximado |
| ---------------------------------------------------------------------- | ----------------- |
| Linhas por componente                                                  | ~150              |
| Linhas por arquivo                                                     | ~250              |
| Linhas em arquivos só de dados                                         | ~300              |
| Linhas por função (o Biome avisa acima de 40 em `.ts` e 150 em `.tsx`) | ~40               |
| Níveis de aninhamento no JSX                                           | 3                 |

### Quando dividir um componente

- Ele faz mais de uma coisa: buscar dados, montar layout e formatar valores.
- Um bloco se repete ou tem estado próprio.
- Recebe mais de 7 props, ou props que só uma parte dele usa.
- Só uma parte precisa de `'use client'`: isole essa parte numa folha e mantenha o resto no servidor.
- Componente renderizado só por condição vai para um `.lazy.ts`.
- Subcomponente de uma página vai em `pages/<pagina>/components`; de várias páginas do módulo, em `components`.

### Patterns usados no projeto

- **Composição por slot:** um componente recebe partes prontas como `ReactNode`, sem saber o que cada uma contém.
- **Provider e hook:** o context fica privado no arquivo e só é acessado por um hook.
- **Custom hook:** tira lógica, estado e chamadas da interface.
- **Server e client:** a página é Server Component, busca os dados e passa para uma folha client.
- **Mapper:** tabela de conversão entre valores (enum para rótulo, formulário para DTO, conteúdo para model) em vez de
  `switch` espalhado.
- **Service como fronteira da origem:** a interface não sabe se o dado vem de arquivo, CMS ou API.

### Comentários

- Uma linha, no formato JSDoc, acima da declaração.
- Explica o porquê ou uma restrição, não o que o código já mostra.
- `@example` só em utils e hooks públicos, quando o uso não é óbvio.
- Sem comentários que repetem o código, histórico de mudanças ou TODO sem responsável.

### SOLID

- **Responsabilidade única:** service e hooks de query são arquivos separados.
- **Aberto e fechado:** estenda por props, children e composição, sem editar o componente base.
- **Liskov:** um componente que envolve um elemento nativo aceita as props desse elemento.
- **Segregação de interfaces:** props pequenas e específicas.
- **Inversão de dependência:** componente → hook → service → cliente HTTP. A interface nunca chama `fetch` direto.

## Testes

- **Ferramentas:** Vitest (`vitest.config.mts`), com `@testing-library/react` para hooks. Ponta a ponta: Playwright em
  `e2e/*.spec.ts` (`playwright.config.ts`).
- **Onde:** o `.test.ts` fica ao lado do arquivo testado, com o mesmo nome.
- **Quando:** **só utils (`*.util.ts`) e hooks (`*.hook.ts`) têm teste unitário.** O `vitest.config.mts` só inclui
  `*.util.test.ts` e `*.hook.test.{ts,tsx}`. A lógica que precisa de teste vai para um util ou hook. Rotas, mappers,
  schemas, services e componentes ficam cobertos pelo e2e (navegação, páginas por slug, 404, formulário de contato,
  troca de tema).
- **Ambiente:** o padrão é `node`. Testes que precisam de DOM começam com `// @vitest-environment jsdom`.
- **Mocks:** `vi.mock` para `next/navigation`, `next/headers` e services; `vi.stubEnv` para variáveis de ambiente.
  `server-only` é trocado por um módulo vazio nos testes.
- **Escrita:** `describe` com o nome da unidade e `it` descrevendo o comportamento em português
  (`it('volta ao padrao para valores invalidos em vez de lancar')`).
- **Comandos:** `pnpm test`, `pnpm test:watch`, `pnpm test <caminho>` e `pnpm test:e2e`.

## Qualidade: lint, formatação e hooks de commit

- **Biome** (`biome.jsonc`) faz lint, formatação e ordem dos imports:
  - 2 espaços, 100 colunas, aspas simples, sem ponto e vírgula, vírgula final;
  - ordem dos imports: React, pacotes, linha em branco, aliases `@/`, linha em branco, relativos;
  - `useNamingConvention` (prefixos `I`/`T`), `noRestrictedImports` (camadas) e `noExcessiveLinesPerFunction` (aviso);
  - `common/components/ui` é só formatado, sem lint nem `organizeImports`.
- **Comandos:** `pnpm lint`, `pnpm lint:fix`, `pnpm format` e `pnpm typecheck` (gera os tipos de rota e roda o `tsc`).
- **Pre-commit** (husky): lint-staged (Biome com correção nos staged) e `pnpm typecheck` no projeto inteiro. O commit
  é recusado se algum falhar.
- **VS Code:** `.vscode/` recomenda a extensão do Biome, formata ao salvar e desliga Prettier e ESLint.

## Build e deploy

- `pnpm build` gera o site; páginas estáticas saem prontas no build.
- Em deploy por container: `output: 'standalone'` no `next.config.ts` e `Dockerfile` em estágios (`base`, `deps`,
  `builder`, `runner`) sobre `node:24-alpine`, rodando como usuário sem privilégios na porta 3000.
- Variáveis de servidor são lidas em runtime; só `NEXT_PUBLIC_*` entra no build.
- Antes de publicar: `pnpm lint`, `pnpm typecheck`, `pnpm test` e `pnpm test:e2e` passando, e Lighthouse sem
  regressão de performance, acessibilidade e SEO.

## Criando um módulo novo

Exemplo: módulo `projeto`, com listagem em `/projetos` e detalhe em `/projetos/[slug]`.

1. **Model e conteúdo:** `common/models/projeto.model.ts` (`IProjetoModel`) e os arquivos em `src/content/projetos/`.
2. **Recurso:** `api/resources/projeto/` com `projeto.dto.ts` (formato do arquivo ou da API), `projeto.mapper.ts`
   (DTO → model), `projeto.cache.ts` e `server/projeto.service.ts` (`listar`, `buscarPorSlug`, validando com Zod).
   `client/` só se houver interação que precise.
3. **Módulo:** `modules/projeto/` com `pages/projetos/projetos.page.tsx`, `pages/detalhe-projeto/detalhe-projeto.page.tsx`,
   `domain/navegacao.constant.ts` (`ProjetoPaginas`), `utils/projeto-metadados.util.ts` e o `index.ts` exportando só o
   que as rotas usam. Rota nova entra em `Rotas` (`common/utils/rotas.util.ts`) e no `sitemap.ts`.
4. **Rotas:** `app/(site)/projetos/page.tsx` e `app/(site)/projetos/[slug]/page.tsx`, importando página,
   `generateMetadata` e `generateStaticParams` de `@/modules/projeto`.
5. **Navegação:** item no `CabecalhoSite`, apontando para `Rotas`.
6. **Testes** conforme a política, e `pnpm lint`, `pnpm typecheck` e `pnpm test` antes do commit.
