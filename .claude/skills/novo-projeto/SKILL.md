---
name: novo-projeto
description: Adiciona ou substitui um projeto do portfólio em src/content/projetos.json, com textos em pt e en, mídia liberada na CSP e verificação. Use quando o Victor pedir para incluir, trocar ou remover um trabalho.
---

# Adicionar ou trocar um projeto do portfólio

1. **Junte o material com o Victor.** Título, categoria, ano, cliente (opcional), local, resumo de uma frase,
   contexto, objetivo, papel do videomaker, créditos, capa, frames e link do vídeo. Se faltar algo, pergunte.
   Não invente dados reais (clientes, créditos, métricas).

2. **Categoria:** um valor de `CategoriaProjetoEnum` (`src/common/enums/projeto.enum.ts`): CURTA, VIDEOCLIPE,
   AEREO, EVENTO, COMERCIAL ou LIFESTYLE. Categoria nova entra no enum e nos dois dicionários
   (`src/common/i18n/dicionarios/`), senão o teste do dicionário falha.

3. **Escreva a entrada em `src/content/projetos.json`.** Siga o formato das entradas existentes:
   - `slug` em kebab-case, único (vira a URL `/pt/projetos/<slug>`);
   - todo texto como `{ "pt": "...", "en": "..." }`, com tradução natural, não literal;
   - textos curtos: resumo com uma frase, contexto e objetivo com uma ou duas;
   - `video`: `{ "plataforma": "youtube" | "vimeo", "id": "<id do vídeo>" }`;
   - `alt` descritivo em cada imagem, nos dois idiomas;
   - `ehDestaque: true` para aparecer na home. A posição no array define a ordem e o formato na composição.

4. **Mídia de outro domínio:** inclua a origem em `ORIGENS_IMAGEM` ou `ORIGENS_VIDEO` no `next.config.ts`.

5. **Verifique:** `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` (o build valida o JSON com Zod e
   aponta o campo inválido) e, se mudou a quantidade de projetos, ajuste a contagem em `e2e/portfolio.spec.ts`
   e rode `pnpm test:e2e`.

6. **Publique:** commit em português no padrão `feat: ...` e push na `main`; a Vercel publica sozinha.
   Confira a página do projeto em produção.
