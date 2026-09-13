# Tasks — Chess.com Streamers

**PRD:** `.docs/PRD.md`  
**Fonte:** `.docs/brain-dump.md`

Legenda de status: `[ ]` pendente · `[x]` concluída

---

## Fase 1 — Fundação

Objetivo: deixar o projeto React + Vite pronto para receber componentes, tipos e estilos.

### Task 1.1 — Inicializar o projeto Vite + React

- [x] Criar o projeto com Vite (React + TypeScript, se possível)
- [x] Remover boilerplate desnecessário (conteúdo padrão do `App`)
- [x] Validar que `npm run dev` sobe a aplicação

**Pronto quando:** a tela inicial renderiza um app vazio (ou placeholder) sem erros no console.

### Task 1.2 — Definir estrutura de pastas e tipos

- [x] Criar pastas: `src/components`, `src/types`
- [x] Criar o tipo `Streamer` com `username`, `avatar`, `twitch_url`, `is_live`
- [x] Exportar a URL da API em uma constante (`https://api.chess.com/pub/streamers`)

**Pronto quando:** a estrutura de pastas existe e o tipo `Streamer` pode ser importado.

### Task 1.3 — Configurar estilos globais e tokens

- [x] Definir reset/base (`box-sizing`, margin, tipografia)
- [x] Aplicar tokens do PRD (cores, fontes, background `#f8fafc`)
- [x] Garantir que o layout base é mobile-first e centralizado

**Pronto quando:** a página tem fundo, tipografia e largura máxima alinhados ao PRD.

---

## Fase 2 — Layout estrutural

Objetivo: montar Header, Footer e o esqueleto semântico da página.

### Task 2.1 — Criar o Header

- [x] Componente `Header` com o nome **Chess.com Streamers**
- [x] Usar `<header>`
- [x] Posicionar no topo da página

**Pronto quando:** o título do projeto aparece no topo em qualquer estado da app.

### Task 2.2 — Criar o Footer

- [x] Componente `Footer` com: "Desenvolvido por José Marcelino · GitHub"
- [x] Link do GitHub abre em nova aba (`rel="noopener noreferrer"`)
- [x] Usar `<footer>` no final da página

**Pronto quando:** o rodapé está visível e o link do GitHub funciona.

### Task 2.3 — Montar o esqueleto em `App`

- [x] Compor `Header` + `<main>` + `Footer`
- [x] Reservar a área principal para loading / error / lista
- [x] Manter a hierarquia semântica (`header`, `main`, `footer`)

**Pronto quando:** a página tem a estrutura visual do wireframe do PRD.

---

## Fase 3 — Dados e estados

Objetivo: buscar a API uma vez e controlar Loading, Error e Success com `useState` e `useEffect`.

### Task 3.1 — Implementar o fetch no `useEffect`

- [x] Estado: `streamers`, `loading`, `error`
- [x] `useEffect` com array de dependências vazio
- [x] `fetch` nativo no endpoint público
- [x] Em sucesso: `setStreamers(data.streamers.slice(0, 10))`
- [x] Não fazer polling

**Pronto quando:** os 10 primeiros streamers chegam no estado após o mount.

### Task 3.2 — Estado Loading

- [x] Enquanto `loading === true`, exibir spinner ou skeleton simples
- [x] Não renderizar a lista nesse momento

**Pronto quando:** o usuário vê feedback de carregamento antes dos cards.

### Task 3.3 — Estado Error + tentar novamente

- [x] Se a requisição falhar, gravar mensagem amigável em `error`
- [x] Exibir a mensagem e um botão **Tentar novamente**
- [x] O botão dispara o fetch de novo (extrair a função de busca para reutilizar)

**Pronto quando:** um erro simulado (API offline / URL inválida) mostra a mensagem e o retry funciona.

---

## Fase 4 — Listagem e cards

Objetivo: renderizar a lista dinâmica e o conteúdo de cada streamer.

### Task 4.1 — Criar o `StreamerCard`

- [x] Receber um `Streamer` via props
- [x] Renderizar como `<article>`
- [x] Layout interno: bolinha + username, avatar, link da Twitch

**Pronto quando:** um card isolado exibe os quatro elementos do RF03.

### Task 4.2 — Indicador de status ao vivo

- [x] Bolinha 10–12px à esquerda do nome
- [x] Verde `#22c55e` se `is_live`, vermelha `#ef4444` se offline
- [x] `aria-label="Ao vivo"` ou `aria-label="Offline"`

**Pronto quando:** live e offline são visualmente e semanticamente distintos.

### Task 4.3 — Avatar, username e link da Twitch

- [x] Avatar circular (64px ou 80px), `loading="lazy"`, `width`/`height` definidos
- [x] `alt={`Avatar de ${username}`}`
- [x] Link com texto descritivo, cor `#9146FF`, `target="_blank"` e `rel="noopener noreferrer"`
- [x] Área clicável ≥ 44px

**Pronto quando:** imagem, nome e link estão corretos e acessíveis.

### Task 4.4 — Renderizar a lista dos 10 streamers

- [x] Componente `StreamerList` (ou map direto no `App`)
- [x] `streamers.map` com `key` estável (`username`)
- [x] Cards em coluna única, gap de 16px
- [x] Só renderizar no estado Success

**Pronto quando:** a página lista exatamente 10 cards empilhados.

### Task 4.5 — Edge cases do card

- [x] `twitch_url` vazio/ausente: ocultar o link ou mostrar "Twitch indisponível"
- [x] Avatar ausente: placeholder simples
- [x] Garantir que avatares `.webp` aparecem

**Pronto quando:** cards sem Twitch ou sem avatar não quebram o layout.

---

## Fase 5 — UX e qualidade

Objetivo: fechar estilo, responsividade, acessibilidade e performance do MVP.

### Task 5.1 — Estilizar cards e página

- [x] Card branco, borda sutil ou sombra leve, radius 12–16px, padding 16–24px
- [x] Tipografia e cores do PRD
- [x] Visual limpo, sem excesso de decoração

**Pronto quando:** o visual bate com o wireframe e os tokens do PRD.

### Task 5.2 — Responsividade

- [x] Mobile: `max-width` ~420–480px, centralizado
- [x] `>640px`: `max-width` ~560px, ainda em coluna única
- [x] Sem grid de múltiplas colunas

**Pronto quando:** mobile e desktop mostram a mesma coluna, só muda a largura.

### Task 5.3 — Acessibilidade

- [x] Semântica correta (`header`, `main`, `footer`, `article`)
- [x] Contraste WCAG AA
- [x] Focus visível nos links
- [x] Textos/aria das bolinhas e da Twitch conferidos

**Pronto quando:** navegação por teclado e leitores de tela descrevem status e links.

### Task 5.4 — Checagem de performance

- [x] Confirmar um único fetch no mount
- [x] Confirmar `slice(0, 10)` e `loading="lazy"`
- [x] Nenhuma lib extra de estado/data-fetching

**Pronto quando:** o bundle permanece leve e não há requisições repetidas.

---

## Fase 6 — Publicação

Objetivo: documentar e publicar o projeto.

### Task 6.1 — Escrever o README

- Nome, descrição curta, screenshot (se houver)
- Como rodar (`npm install`, `npm run dev`)
- Menção à API pública do Chess.com
- Stack: React, Vite, `useState`, `useEffect`, `fetch`

**Pronto quando:** um visitante do repo consegue entender e rodar o projeto.

### Task 6.2 — Publicar no GitHub

- Repositório com o código do MVP
- `.gitignore` adequado (não versionar `node_modules`, `.env`)

**Pronto quando:** o repositório está público (ou compartilhado) com o código atualizado.

### Task 6.3 — Deploy (Vercel ou Netlify)

- Publicar o build de produção
- Validar Header, lista, estados e Footer no ambiente publicado
- Colocar a URL no README

**Pronto quando:** o app está no ar e o link pode ser compartilhado na comunidade B7Web.
