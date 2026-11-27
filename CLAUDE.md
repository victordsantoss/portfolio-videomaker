# Portfólio de videomaker (Cold Cinema)

Portfólio cinematográfico de um videomaker, em produção na Vercel. O conteúdo atual é **mockado** e será
substituído aos poucos pelo material real. Responda e escreva código em português (pt-BR).

- Produção: https://portfolio-videomaker-ten.vercel.app (deploy automático a cada push na `main`)
- Repositório: https://github.com/victordsantoss/portfolio-videomaker (público)
- Vercel: projeto `portfolio-videomaker` no time "victordsantoss' projects" (Hobby)

## Leia antes de mudar algo

| Documento | O que tem |
| --- | --- |
| `docs/briefing.md` | O briefing completo: identidade Cold Cinema, UX, seções, i18n, tema, critérios de aceite |
| `docs/arquitetura.md` | A arquitetura obrigatória: camadas, pastas, sufixos, nomenclatura, padrões, testes |
| `docs/decisoes.md` | Onde e por que este projeto se afasta da arquitetura (tema, i18n, shadcn, sem formulário) |

A arquitetura é do Victor e é a regra. Não reorganize pastas nem crie estrutura paralela. Quando algo precisar
fugir dela, explique o motivo antes e registre em `docs/decisoes.md`.

## Comandos

```bash
pnpm dev          # http://localhost:3000 → redireciona para /pt
pnpm lint         # Biome (lint, formatação, imports, camadas). lint:fix corrige
pnpm typecheck    # next typegen + tsc
pnpm test         # Vitest: só *.util.test.ts e *.hook.test.ts
pnpm test:e2e     # Playwright (sobe `pnpm start` na porta 3100; rode `pnpm build` antes)
pnpm build
```

O pre-commit (husky) roda lint-staged e typecheck. Antes de dar uma tarefa por concluída: lint, typecheck, test,
build e, se mexeu em interface, test:e2e. Não declare verificação que não rodou.

Stack fixada: Node 24, pnpm 10, Next 16.4 (App Router), React 19.3, TypeScript 5.9 estrito, Tailwind 4 (só CSS,
sem `tailwind.config`), shadcn base-nova sobre `@base-ui/react`, Zod 4, Biome 2. O Next 16 mudou APIs: confira
`node_modules/next/dist/docs/` antes de usar uma API (ex.: `preload` substituiu `priority` no `next/image`).

## Mapa do código

```
src/app/[locale]/layout.tsx            layout raiz por idioma: html lang, script de tema, fonte, cabeçalho, rodapé
src/app/[locale]/(site)/page.tsx       home → @/modules/inicio
src/app/[locale]/(site)/projetos/[slug] detalhe → @/modules/projeto
src/app/[locale]/[...resto]            qualquer caminho desconhecido → not-found localizado
src/app/sitemap.ts, robots.ts, icon.svg
src/content/perfil.json                nome, hero, sobre, serviços, processo, clientes, depoimentos, contatos
src/content/projetos.json              projetos (capa, vídeo, frames, créditos), na ordem de exibição
src/api/resources/{perfil,projeto}     dto (schema Zod), mapper (dto → model no idioma), server/*.service.ts
src/common/i18n/                       idiomas, dicionários de UI (pt/en), utils de idioma
src/common/components/                 layout (SiteLayout, CabecalhoSite, MenuMobile, RodapeSite), Secao, Quadro, estados
src/infrastructure/                    env (URL_SITE), cookies, tema (script anti-flash), logger
src/modules/inicio                     página inicial e suas seções
src/modules/projeto                    detalhe do projeto, CartaoProjeto, ProjetoPaginas
src/modules/preferencias               AlternadorTema, SeletorIdioma, SincronizadorTema
e2e/portfolio.spec.ts                  navegação, 404, player, idioma, tema, menu mobile
```

Camadas: `app → modules → api → infrastructure → common`. O Biome bloqueia imports no sentido errado. Fora de um
módulo, importe só pelo `index.ts` dele.

## Como as coisas funcionam

- **Idiomas:** URLs `/pt` (padrão) e `/en`. `/` e caminhos sem idioma redirecionam para `/pt` via `redirects()`
  no `next.config.ts` (sem proxy). Textos de interface em `src/common/i18n/dicionarios/*.dicionario.ts`
  (tipados por `IDicionario`; um teste exige as mesmas chaves nos dois). Conteúdo em JSON com `{ "pt", "en" }`.
  Metadados com canonical, hreflang (pt-BR, en, x-default) e Open Graph localizado.
- **Tema:** classe `dark` no `<html>`. Um script inline no `<head>` lê o cookie `portfolio.esquema-cor`
  ou, sem ele, o tema do sistema (sem preferência → escuro). Assim as páginas seguem estáticas e não há flash.
  `SincronizadorTema` reaplica o tema quando a troca de idioma recria o layout raiz.
- **Conteúdo:** os services validam o JSON com Zod. Erro de conteúdo quebra o build com o campo exato.
- **Mídia:** imagens externas precisam estar em `ORIGENS_IMAGEM` e vídeos em `ORIGENS_VIDEO` no `next.config.ts`
  (CSP + `images.remotePatterns`). O player só carrega o iframe no clique (YouTube sem cookies ou Vimeo `dnt`).
- **Tudo estático:** home e projetos são gerados no build nos dois idiomas.

## Direção visual (não negocie sem o Victor)

- Paleta fria: Midnight `#10151C`, Slate `#1C2632`, Steel Blue `#667C91`, Ice `#C5D0DA`, Frost `#F2F5F7`.
  Tokens em `src/app/globals.css`; nunca cor fixa em componente (exceto `meia-noite`/`geada` sobre imagem).
  Todas as combinações passam AA nos dois temas; mantenha isso ao mexer em cor.
- Tipografia: Archivo variável local. Títulos expandidos (`titulo-cinema`, `titulo-secao`), corpo em largura normal.
- A mídia é a protagonista. Sem cards para tudo, sem ícones decorativos, sem gradientes, sem rótulos em caixa alta.
  O hero (quadro 2.39:1 + título linha a linha) é o único momento animado. Respeite `prefers-reduced-motion`.
- Composição dos trabalhos: padrão de 6 posições em `trabalhos-selecionados.component.tsx`, que se repete.

## Estado atual e próximos passos

Pronto e publicado: home completa, detalhe de projeto, tema claro/escuro, pt/en, SEO, 404, testes.

Conteúdo provisório que o Victor vai substituir:
- Nome "Theo Arantes", bio, contatos (`contato@exemplo.com.br`, WhatsApp `5561900000000`, `@seuperfil`).
- Fotos do Unsplash e vídeos dos filmes abertos da Blender (CC BY) nos 6 projetos.
- Seção de clientes/depoimentos fica oculta até haver conteúdo real. Nunca invente clientes, depoimentos ou métricas.

Pendências possíveis (confirme antes):
- Domínio próprio na Vercel e `URL_SITE` apontando para ele.
- Vídeo de fundo opcional no hero (o modelo ainda não tem esse campo).
- Mover as mídias para um storage próprio quando o material real chegar.
- Regenerar `ui/button.tsx` e `ui/sheet.tsx` com `pnpm dlx shadcn@latest add button sheet` (foram escritos à mão,
  sem acesso ao registro do shadcn).

Para adicionar um projeto, use a skill `novo-projeto` (`.claude/skills/novo-projeto/SKILL.md`).
