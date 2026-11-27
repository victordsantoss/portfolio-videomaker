# Portfólio de videomaker

Portfólio cinematográfico em Next.js 16, React 19, TypeScript, Tailwind CSS 4 e shadcn/ui (base-nova),
com tema claro e escuro e versões em português (padrão) e inglês.

- Briefing: [docs/briefing.md](docs/briefing.md)
- Arquitetura: [docs/arquitetura.md](docs/arquitetura.md)
- Decisões e exceções: [docs/decisoes.md](docs/decisoes.md)

## Rodando

Requer Node 24 e pnpm 10 (ativado pelo corepack).

```bash
corepack enable
pnpm install
pnpm dev            # http://localhost:3000 (redireciona para /pt)
```

| Comando                       | O que faz                                              |
| ----------------------------- | ------------------------------------------------------ |
| `pnpm build`                  | Gera o site; todas as páginas saem estáticas           |
| `pnpm lint` / `pnpm lint:fix` | Biome: lint, formatação, ordem de imports e camadas    |
| `pnpm typecheck`              | Gera os tipos de rota e roda o `tsc`                   |
| `pnpm test`                   | Testes unitários (utils e hooks)                       |
| `pnpm test:e2e`               | Playwright: navegação, 404, idioma, tema e menu mobile |

## Editando o conteúdo

| O quê                                                     | Onde                           |
| --------------------------------------------------------- | ------------------------------ |
| Nome, hero, sobre, serviços, processo, contatos, clientes | `src/content/perfil.json`      |
| Projetos (capa, vídeo, frames, créditos)                  | `src/content/projetos.json`    |
| Textos de interface (menus, botões, estados)              | `src/common/i18n/dicionarios/` |
| Cores e tipografia                                        | `src/app/globals.css`          |

Todo texto de conteúdo é escrito em `{ "pt": "...", "en": "..." }`. O build valida os arquivos com Zod e
falha com a indicação do campo quando algo está faltando.

## Deploy

O projeto é estático e não precisa de variáveis de ambiente na Vercel. `URL_SITE` é opcional: sem ela, os
metadados usam o domínio de produção que a Vercel informa (`VERCEL_PROJECT_PRODUCTION_URL`). Ao ligar um
domínio próprio, defina `URL_SITE=https://seu-dominio` nas variáveis do projeto.
