Projeto: Portfólio Cinematográfico de Videomaker

1. Papel
   Atue como Senior Front-end Engineer, UI/UX Designer e especialista em
   experiências digitais premium, responsável por desenvolver um
   portfólio de videomaker com estética minimalista, cinematográfica,
   moderna e altamente intuitiva.

Seu objetivo não é apenas construir um site funcional, mas criar uma
experiência digital que transmita a identidade artística do videomaker,
valorize seus trabalhos audiovisuais e proporcione uma navegação fluida,
elegante e memorável.

Tenha senso crítico de design. Não construa uma interface genérica, não
utilize padrões visuais de templates prontos e não adicione elementos
sem propósito.

2. Contexto do projeto
   O projeto consiste em um portfólio profissional de videomaker, com foco
   na apresentação de produções audiovisuais, identidade visual, serviços,
   informações sobre o profissional e canais de contato.

A experiência deve transmitir:

Sofisticação
Minimalismo
Cinematografia
Criatividade
Modernidade
Elegância
Personalidade
Profissionalismo
O conteúdo audiovisual deve ser o protagonista. A interface deve
funcionar como uma moldura que valoriza vídeos, fotografias e projetos,
sem competir visualmente com eles.

3. Stack tecnológica
   Utilize:

Next.js
React na versão estável mais atual, compatível com a versão atual do
Next.js
TypeScript
shadcn/ui
Tailwind CSS
Lucide Icons, quando necessário
Diretrizes de versões
Antes de iniciar:

Verifique as versões atuais e estáveis das tecnologias.
Utilize versões estáveis e compatíveis entre si.
Não utilize versões Canary, Beta, RC ou experimental, salvo
justificativa explícita.
Não utilize APIs depreciadas.
Priorize padrões modernos de React e Next.js.
Evite dependências desnecessárias.
Utilize APIs e práticas atuais do React, incluindo componentes
funcionais, hooks quando apropriados, composição de componentes e
gerenciamento eficiente de estado.

Não introduza bibliotecas de animação, gerenciamento de estado ou
componentes adicionais sem necessidade real.

4. Arquitetura
   A arquitetura do projeto será fornecida por mim.

Não invente, substitua, reorganize ou proponha uma arquitetura
paralela antes de analisar a arquitetura que será disponibilizada.

Quando a arquitetura for fornecida:

Analise sua estrutura.
Identifique os padrões definidos.
Respeite as responsabilidades de cada camada.
Respeite a organização dos diretórios.
Utilize os componentes e abstrações existentes.
Reaproveite configurações, tokens, utilitários e padrões existentes.
Evite duplicação de responsabilidades.
Não altere configurações estruturais sem necessidade.
Não crie abstrações prematuras.
Caso identifique algum problema arquitetural, explique-o e justifique
antes de realizar alterações que extrapolem a estrutura estabelecida.

Não crie uma estrutura genérica de projeto se já existir uma arquitetura
definida.

5. Direção visual --- Cold Cinema
   A identidade visual deve seguir o conceito:

Minimal · Cold · Cinematic · Editorial

Combine referências de cinema contemporâneo, fotografia editorial,
design suíço, portfólios de diretores de fotografia e estúdios criativos
independentes.

Paleta inicial
Midnight: #10151C --- fundo principal
Slate: #1C2632 --- superfícies e elementos secundários
Steel Blue: #667C91 --- cor de destaque
Ice: #C5D0DA --- textos secundários
Frost: #F2F5F7 --- textos principais
A paleta pode ser refinada para melhorar contraste, acessibilidade e
consistência, mas preserve a direção de cores frias.

Regras visuais
Predominância de tons frios.
Contraste elegante, sem excesso de brilho.
Grande utilização de espaço negativo.
Layouts limpos e editoriais.
Tipografia moderna e legível.
Hierarquia visual bem definida.
Bordas discretas.
Divisores sutis.
Imagens e vídeos em destaque.
Composições assimétricas quando fizerem sentido.
Transições suaves.
Interface visualmente leve, apesar do tema escuro.
Evite
Gradientes excessivos.
Neon.
Glassmorphism exagerado.
Elementos decorativos desnecessários.
Cards para absolutamente tudo.
Border radius exagerados.
Sombras pesadas.
Ícones decorativos sem função.
Animações exageradas.
Layouts com aparência de dashboard.
Visual de template SaaS.
Excesso de textos.
Excesso de CTAs.
Efeitos que comprometam performance ou usabilidade.
O design deve parecer intencional, não apenas minimalista por falta de
elementos.

6. Theme System --- Dark & Light Mode
   O projeto deve possuir suporte completo a Dark Mode e Light Mode,
   com alternância intuitiva entre os temas.

Requisitos
Disponibilizar temas Dark e Light.
Criar um mecanismo consistente de tokens de cores.
Utilizar CSS Variables e a estrutura de theming do
Tailwind/shadcn/ui.
Garantir que todos os componentes respeitem o tema ativo.
Evitar cores hardcoded nos componentes.
Garantir contraste e acessibilidade nos dois temas.
A transição entre temas deve ser suave, mas sem efeitos exagerados.
Persistir a preferência do usuário, seguindo estratégia compatível
com a arquitetura.
Considerar o tema do sistema operacional na primeira visita, caso o
usuário ainda não tenha escolhido uma preferência.
Evitar flash de tema incorreto durante o carregamento inicial
(FOUC).
Garantir consistência entre fundos, textos, bordas, overlays, menus,
vídeos, controles e demais elementos.
Identidade dos temas
O Dark Mode é o tema de referência da identidade Cold Cinema, utilizando
tons de midnight, slate e steel blue.

O Light Mode não deve ser apenas uma inversão de cores. Ele deverá
possuir identidade própria, preservando a estética cinematográfica,
minimalista e fria, com tons de branco gelo, cinza, azul acinzentado e
superfícies neutras.

Ambos os temas devem parecer intencionais, premium e cuidadosamente
projetados.

A alternância de tema deve ser acessível e fácil de encontrar, mas não
deve chamar atenção excessiva. Utilize um controle discreto e intuitivo,
com ícones apropriados e estados acessíveis.

7. Internationalization (i18n) --- Português e Inglês
   O projeto deve possuir suporte à internacionalização desde a
   implementação inicial, disponibilizando:

Português brasileiro (pt-BR)
Inglês (en)
Requisitos
O idioma padrão deve ser Português brasileiro (pt-BR).
Deve existir uma opção intuitiva para alternar entre Português e
Inglês.
Utilize preferencialmente recursos nativos do Next.js e padrões
compatíveis com seu sistema de routing e rendering.
Não adicionar bibliotecas externas de internacionalização sem
necessidade ou justificativa técnica.
Centralizar textos e conteúdos traduzíveis.
Não espalhar textos fixos diretamente nos componentes.
Garantir que todos os elementos sejam traduzidos, incluindo:
Navegação.
Headings.
Descrições.
Botões.
CTAs.
Serviços.
Formulários.
Mensagens de feedback.
Metadados e SEO.
Estados de loading e erro.
Labels de acessibilidade.
Evitar tradução automática em runtime.
As traduções devem ser naturais em cada idioma, respeitando o
contexto e o tom da marca.
Garantir que a troca de idioma não comprometa o tema ativo.
Preservar a experiência visual ao alternar idiomas, evitando que
diferenças no comprimento dos textos quebrem o layout.
Implementação
Analise a arquitetura existente e implemente a internacionalização
utilizando recursos nativos do Next.js, especialmente routing, layouts,
parâmetros de locale e configuração de metadados, conforme apropriado
para a versão utilizada e para o App Router ou Pages Router existente.

A implementação deve ser simples, escalável e compatível com Server
Components sempre que possível.

Evite criar uma solução de i18n complexa para um portfólio pequeno.

Organize conteúdos de tradução de forma centralizada e clara,
respeitando a arquitetura fornecida.

UX do seletor de idioma
O seletor de idioma deve ser discreto e integrado à navegação.

Preferencialmente, utilize labels explícitas como PT e EN ou PT-BR
e EN, evitando depender apenas de ícones ou bandeiras.

A troca de idioma deve:

Ser rápida.
Preservar a página atual quando possível.
Preservar o tema escolhido.
Não causar navegação confusa.
Ser acessível por teclado.
Possuir estado visual claro do idioma ativo.
Não utilize bandeiras como representação principal de idioma.

SEO e internacionalização
Implemente boas práticas de SEO multilíngue:

Metadados localizados.
Titles e descriptions em cada idioma.
URLs coerentes com a estratégia de locale.
lang correto no documento.
Links alternativos entre idiomas (hreflang) quando aplicável.
Open Graph localizado.
Conteúdo indexável em ambos os idiomas.
Defina a estratégia de URLs de maneira consistente com a arquitetura do
Next.js e evite duplicação desnecessária de páginas ou componentes.

8. Compatibilidade entre Theme e Locale
   Dark/Light Mode e Português/Inglês devem funcionar de forma
   independente.

O usuário deve poder navegar em todas as combinações:

Português com tema Dark.
Português com tema Light.
Inglês com tema Dark.
Inglês com tema Light.
A alteração de idioma não deve redefinir o tema e a alteração do tema
não deve redefinir o idioma.

Ambas as preferências devem coexistir de forma previsível, sem conflitos
de estado ou hydration errors.

9. Experiência do usuário (UX)
   A experiência deve ser extremamente simples e intuitiva.

O visitante precisa entender rapidamente:

Quem é o videomaker.
Qual é seu estilo.
Quais trabalhos ele realiza.
O que ele oferece.
Como entrar em contato.
Princípios
Navegação simples e previsível.
Baixa carga cognitiva.
Conteúdo priorizado por relevância.
Interações intuitivas.
Feedback visual apropriado.
Responsividade.
Acessibilidade.
Performance.
Consistência entre todas as seções.
Evitar barreiras para visualizar os trabalhos.
Não utilize soluções criativas de navegação que prejudiquem
familiaridade e usabilidade.

O usuário deve conseguir navegar sem precisar descobrir como o site
funciona.

10. Estrutura da landing page
    10.1 Hero
    A primeira seção deve causar impacto visual imediato.

Elementos:

Nome ou identidade do videomaker.
Navegação minimalista.
Headline curta e expressiva.
Subtítulo identificando sua atuação.
Vídeo ou imagem cinematográfica de destaque.
Indicador de scroll discreto.
Exemplo de posicionamento:

"Visual stories. Real emotions."

"Filmmaker & Visual Storyteller"

Não utilize grandes blocos de texto na primeira dobra.

O hero deve ser visualmente impactante, mas não confuso.

Se houver vídeo de background:

Garanta fallback para imagem.
Evite bloquear o carregamento da página.
Utilize carregamento apropriado.
Evite autoplay com áudio.
Considere dispositivos com economia de dados.
Respeite prefers-reduced-motion.
Não comprometa a legibilidade do texto.
10.2 Selected Works
Esta deve ser a principal seção do site.

Apresente uma seleção dos melhores projetos do videomaker, utilizando
uma composição visual editorial.

Cada projeto pode apresentar:

Thumbnail.
Preview em vídeo, quando apropriado.
Nome do projeto.
Categoria.
Ano.
Descrição curta, se necessária.
Acesso ao projeto completo.
A apresentação deve priorizar mídia em tamanho adequado.

Evite uma grade convencional composta por muitos cards pequenos.

Utilize layouts que valorizem cada projeto, com variações sutis de
tamanho e composição, mantendo consistência e usabilidade.

A galeria não deve depender de filtros complexos para ser útil.

Se houver interação de hover:

Utilize zoom extremamente sutil.
Exiba informações de forma elegante.
Utilize transições rápidas e suaves.
Não esconda informações essenciais exclusivamente no hover.
Preserve a usabilidade em dispositivos touch.
10.3 Project Details
Caso a arquitetura permita páginas individuais para projetos, cada
projeto deverá possuir uma apresentação própria.

A página deve priorizar:

Nome do projeto.
Vídeo principal.
Contexto.
Objetivo.
Papel do videomaker na produção.
Créditos, quando aplicável.
Outros registros visuais.
Projetos relacionados.
Navegação para próximo ou anterior projeto.
Evite textos extensos e apresentações excessivamente corporativas.

A experiência deve se aproximar de uma apresentação editorial de um
filme ou produção.

10.4 About
Uma seção para apresentar o videomaker de forma humana e objetiva.

Pode incluir:

Fotografia pessoal ou registro trabalhando.
Nome.
Especialidade.
Breve descrição.
Abordagem artística.
Filosofia de trabalho.
Experiência, quando relevante.
A escrita deve ser natural, autêntica e concisa.

Evite biografias longas, textos genéricos ou frases clichês de
marketing.

A seção deve contribuir para criar conexão e confiança.

10.5 Services
Apresente os serviços de maneira clara e minimalista.

Possíveis serviços:

Film Production
Commercial Films
Events
Lifestyle
Music Videos
Drone & Aerial
Editing & Post-production
Color Grading
Os serviços devem ser apresentados de forma organizada e escaneável.

Evite transformar cada serviço em um card com ícone, título, descrição,
botão e decoração.

Prefira listas editoriais, layouts simples e interações sutis.

Os serviços definitivos deverão ser facilmente ajustáveis.

10.6 Process
Se houver espaço para essa seção, apresente o processo de trabalho de
forma simples:

Briefing
Planning
Production
Post-production
Delivery
Não torne essa seção longa ou burocrática.

Ela deve ajudar o cliente a entender como funciona a contratação e
transmitir segurança.

10.7 Clients / Testimonials
Caso existam clientes ou depoimentos disponíveis, apresente-os com
discrição.

Logos de clientes.
Depoimentos reais.
Nome e identificação do cliente, quando autorizado.
Contexto do projeto.
Não invente clientes, depoimentos, métricas ou experiências
profissionais.

Se não houver conteúdo real, mantenha a seção preparada para futura
inclusão ou não a exiba.

10.8 Contact
A seção final deve ser clara, convidativa e focada em conversão.

Exemplo de headline:

"Let's create something meaningful."

Texto complementar:

"Have a project in mind? Let's talk."

Disponibilize os canais de contato definidos pelo projeto, como:

WhatsApp.
E-mail.
Instagram.
Formulário de contato, se necessário.
O contato deve ser fácil de encontrar em toda a experiência.

Evite formulários longos. Solicite apenas informações realmente
necessárias.

11. Navegação
    Utilize uma navegação simples e minimalista.

Sugestão:

Work
About
Contact
O nome ou logo pode funcionar como link para a Home.

A navegação deverá:

Ser fácil de entender.
Funcionar perfeitamente em desktop e mobile.
Ter estados de interação.
Possuir feedback visual.
Não ocupar espaço excessivo.
Evitar menus desnecessariamente complexos.
Caso seja utilizado menu mobile, ele deve ser intuitivo, acessível e
fácil de fechar.

Inclua também controles discretos para tema e idioma, sem sobrecarregar
o header.

12. Motion Design e microinterações
    As animações devem reforçar a experiência, não chamar atenção para si
    mesmas.

Utilize motion design com moderação.

Possíveis interações:

Fade-in discreto.
Transições entre seções.
Reveal sutil de elementos.
Hover de projetos.
Microinterações nos links.
Indicador de scroll.
Transições entre páginas.
Feedback em botões.
Regras
Não animar tudo.
Não utilizar animações lentas que atrasem a interação.
Evitar movimentos grandes e desnecessários.
Evitar parallax exagerado.
Evitar scroll hijacking.
Não bloquear a navegação durante animações.
Respeitar prefers-reduced-motion.
Priorizar CSS e recursos nativos sempre que suficiente.
O motion design deve ser sofisticado, discreto e fluido.

13. Responsividade
    O projeto deverá ser desenvolvido com abordagem responsiva,
    considerando:

Desktop.
Laptop.
Tablet.
Mobile.
Não faça apenas uma adaptação superficial de desktop para mobile.

Reavalie a composição visual em cada breakpoint.

Mobile
Prioridades:

Navegação fácil.
Mídia otimizada.
Tipografia legível.
Espaçamento adequado.
Interações touch.
Botões com áreas de toque adequadas.
Projetos apresentados de forma natural.
Ausência de overflow horizontal.
Boa performance.
O mobile deverá ser uma experiência completa, não uma versão reduzida e
prejudicada do desktop.

14. Componentização
    Utilize componentes reutilizáveis, mas sem fragmentar excessivamente a
    aplicação.

A componentização deve ocorrer quando houver:

Reutilização real.
Responsabilidade bem definida.
Complexidade que justifique isolamento.
Elementos visuais consistentes.
Benefício para manutenção.
Não crie componentes para cada elemento simples de uma página sem
necessidade.

Utilize shadcn/ui como base quando seus componentes forem apropriados,
mas não deixe a interface com aparência padrão da biblioteca.

Customize os componentes para que sejam coerentes com a identidade
visual.

15. Dados e conteúdo
    Mantenha projetos, serviços, informações de contato e conteúdos
    repetitivos organizados conforme a arquitetura fornecida.

Sempre que apropriado, permita que informações como:

Nome do projeto.
Categoria.
Ano.
Thumbnail.
Vídeo.
Descrição.
Links.
Serviços.
Redes sociais.
Sejam atualizadas sem necessidade de modificar a estrutura visual dos
componentes.

Não invente dados profissionais reais.

Quando não houver assets disponíveis:

Utilize placeholders visualmente coerentes.
Prefira imagens cinematográficas de alta qualidade.
Evite imagens genéricas de escritório ou tecnologia.
Não espalhe placeholders sem propósito.
Centralize e facilite a substituição dos assets.
Os placeholders devem ser claramente substituíveis pelos conteúdos
reais.

Todo conteúdo textual apresentado na interface deve estar integrado ao
sistema de i18n.

16. Performance
    A performance é parte essencial da experiência.

Priorize:

Otimização de imagens.
Uso adequado de recursos do Next.js.
Lazy loading.
Carregamento sob demanda de mídia.
Evitar JavaScript desnecessário.
Evitar dependências pesadas.
Evitar renderizações desnecessárias.
Uso apropriado de Server Components.
Client Components somente quando necessários.
Estratégias eficientes de carregamento de vídeos.
Prevenção de layout shift.
Boas métricas Core Web Vitals.
Não transforme toda a aplicação em Client Components.

Utilize recursos nativos do Next.js sempre que possível.

17. Acessibilidade
    Garanta:

HTML semântico.
Hierarquia correta de headings.
Contraste adequado nos temas Light e Dark.
Navegação por teclado.
Foco visível.
Labels adequados.
Textos alternativos em imagens relevantes.
Botões e links semanticamente corretos.
Compatibilidade com leitores de tela.
Respeito a prefers-reduced-motion.
Interações não dependentes exclusivamente de hover.
A acessibilidade não deve ser tratada como uma etapa posterior.

18. SEO
    Implemente boas práticas de SEO utilizando recursos atuais do Next.js:

Metadata.
Title.
Description.
Open Graph.
Favicons.
URLs amigáveis.
Estrutura semântica.
Conteúdo indexável.
Metadados localizados por idioma.
lang correto no documento.
hreflang quando aplicável.
O SEO deve ser implementado de maneira coerente, sem comprometer a
experiência visual.

19. Regras de implementação
    Antes de começar a codificar:

Analise o projeto existente.
Leia a arquitetura que será fornecida.
Identifique tecnologias e dependências já instaladas.
Verifique os padrões de código existentes.
Identifique os recursos disponíveis.
Entenda as restrições.
Planeje a implementação.
Durante o desenvolvimento:

Não modifique arquivos desnecessariamente.
Não remova funcionalidades existentes sem autorização.
Não instale bibliotecas sem necessidade.
Não crie abstrações prematuras.
Não ignore erros de TypeScript.
Não utilize any indiscriminadamente.
Não deixe código morto.
Não deixe TODOs desnecessários.
Não crie funcionalidades fictícias.
Não utilize emojis como elemento de interface.
Não entregue uma implementação superficial apenas para cumprir as
seções.
Não substitua boas decisões de UX por efeitos visuais.
Se uma decisão importante estiver indefinida, analise as alternativas e
adote a opção mais simples, consistente e adequada ao contexto, sem
interromper o desenvolvimento por questões de baixo impacto.

20. Qualidade visual esperada
    Antes de considerar uma tela concluída, faça uma avaliação crítica.

Pergunte:

O layout parece premium ou genérico?
A hierarquia visual é clara?
Os vídeos são os protagonistas?
Existe espaço negativo suficiente?
As cores estão consistentes nos dois temas?
Há elementos que poderiam ser removidos?
A navegação é intuitiva?
O site funciona bem sem animações?
O mobile foi realmente pensado?
O design transmite uma identidade própria?
A interface está coerente em todas as seções?
A troca de idioma é natural?
Ambos os temas possuem qualidade visual equivalente?
Sempre prefira remover um elemento desnecessário em vez de adicionar
outro para tentar melhorar visualmente a tela.

21. Critérios de aceite
    O projeto respeita a arquitetura fornecida.
    Utiliza Next.js, React estável atual, TypeScript e shadcn/ui.
    Possui identidade visual minimalista e cinematográfica.
    Utiliza uma paleta predominantemente fria.
    Possui Dark Mode e Light Mode completos e cuidadosamente
    projetados.
    Possui suporte a Português brasileiro (pt-BR) e Inglês (en).
    Tema e idioma funcionam independentemente.
    A navegação é simples e intuitiva.
    O portfólio valoriza os trabalhos audiovisuais.
    O layout é responsivo.
    As microinterações são sutis e consistentes.
    A experiência mobile é bem executada.
    Os componentes são reutilizáveis na medida certa.
    O código segue os padrões arquiteturais existentes.
    A aplicação possui boa performance.
    A acessibilidade básica está implementada.
    O SEO básico está configurado, incluindo suporte multilíngue.
    Não existem erros de build, lint ou TypeScript.
    Não há dependências desnecessárias.
    Não há elementos visuais genéricos ou decorativos em excesso.
22. Resultado esperado
    Entregue um portfólio que pareça ter sido criado por um estúdio digital
    especializado em experiências para profissionais do audiovisual.

O resultado deve ser:

Visualmente sofisticado.
Minimalista.
Cinematográfico.
Frio, mas não impessoal.
Fácil de navegar.
Intuitivo.
Responsivo.
Performático.
Acessível.
Consistente.
Multilíngue.
Com Dark e Light Mode bem executados.
Focado em apresentar trabalhos e gerar oportunidades.
O design deve transmitir qualidade sem precisar demonstrá-la por meio
de efeitos exagerados.

A simplicidade deve ser intencional. Cada elemento precisa ter uma razão
para existir.

O objetivo final é que o visitante entre no site, se conecte visualmente
com o trabalho, explore os projetos com facilidade e tenha vontade de
entrar em contato.

23. Fluxo de trabalho para o Claude Code
    Execute o trabalho de forma disciplinada:

Fase 1 --- Análise
Inspecione o projeto e os arquivos existentes.
Analise a arquitetura fornecida.
Verifique versões e dependências.
Identifique convenções e restrições.
Não comece a implementar antes de compreender a estrutura.
Fase 2 --- Planejamento
Defina como a experiência será estruturada dentro da arquitetura
existente.
Identifique componentes e responsabilidades.
Planeje tokens, temas e internacionalização.
Liste assets necessários e placeholders.
Identifique decisões relevantes.
Fase 3 --- Implementação
Implemente seguindo o plano e a arquitetura.
Priorize a qualidade da interface e a experiência do usuário.
Mantenha a implementação simples, organizada e consistente.
Faça Dark/Light e i18n parte integral da implementação.
Fase 4 --- Revisão visual e UX
Faça uma revisão crítica da interface implementada.

Verifique:

Hierarquia visual.
Espaçamento.
Tipografia.
Composição.
Contraste.
Consistência dos temas.
Experiência de navegação.
Responsividade.
Microinterações.
Acessibilidade.
Qualidade visual dos placeholders.
Corrija problemas encontrados. Não considere a primeira versão
automaticamente concluída.

Fase 5 --- QA
Execute verificações aplicáveis ao projeto:

Build.
Lint.
Type checking.
Verificação de links e navegação.
Verificação de alternância entre temas.
Verificação de alternância entre idiomas.
Verificação de persistência de preferências.
Verificação de layout em diferentes tamanhos.
Verificação de acessibilidade básica.
Verificação de erros de console, quando possível.
Fase 6 --- Entrega
Ao concluir, apresente um resumo objetivo:

O que foi implementado.
Principais decisões de design.
Componentes ou áreas criadas.
Como funciona o sistema de temas.
Como funciona a internacionalização.
Verificações executadas.
Pendências reais, se houver.
Não declare verificações como concluídas se elas não foram executadas.

Diretriz final: construa uma experiência digital de qualidade, não
apenas uma página bonita. A interface deve ser discreta, os trabalhos
devem ser memoráveis e toda a tecnologia deve servir à experiência,
nunca o contrário.
