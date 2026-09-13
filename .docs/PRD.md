# PRD — Chess.com Streamers

**Versão:** 1.0  
**Status:** Rascunho para implementação  
**Fonte:** `.docs/brain-dump.md`  
**Tasks:** `.docs/tasks.md`

---

## 1. Visão do produto

Aplicação frontend simples que consome a API pública do Chess.com e lista os **10 primeiros streamers** em cards empilhados, com status ao vivo, avatar e link da Twitch.

O projeto demonstra **state**, **effects** e **listas dinâmicas** em React, com layout limpo, responsivo e acessível. Será publicado no GitHub e compartilhado na comunidade B7Web.

### 1.1 Problema

Não há, neste contexto de estudo, uma interface própria e didática para visualizar streamers do Chess.com com status ao vivo, estados de carregamento/erro e cards acessíveis.

### 1.2 Objetivo

Entregar um MVP funcional, leve e fácil de manter, usando apenas React + Vite, `useState`, `useEffect` e `fetch` nativo.

### 1.3 Fora de escopo (MVP)

- Autenticação
- Dark mode
- Grid de múltiplas colunas
- Polling / atualização automática do status ao vivo
- Bibliotecas de estado ou data-fetching (Redux, React Query, Axios, etc.)
- Testes automatizados (opcional pós-MVP)
- Páginas extras (perfil, busca, filtros)

---

## 2. Decisões de produto

| Item | Decisão |
|---|---|
| Nome do projeto | **Chess.com Streamers** |
| Identidade visual | Tema claro, tokens definidos na seção 7 |
| Dark mode | Não no MVP |
| Link da Twitch | Sempre externo (`target="_blank"` + `rel="noopener noreferrer"`) |
| CSS | CSS puro ou CSS Modules (sem Tailwind, para manter o código leve) |
| Testes | Fora do MVP |
| Deploy | Vercel ou Netlify após publicação no GitHub |
| Desenvolvedor | José Marcelino |

---

## 3. Stack técnica

- **React** + **Vite**
- **Hooks:** `useState` e `useEffect`
- **HTTP:** `fetch` nativo
- **Sem** bibliotecas extras de estado ou data-fetching
- Código leve e de fácil manutenção

---

## 4. Requisitos funcionais

### RF01 — Header

- Exibir o nome do projeto: **Chess.com Streamers**
- Posicionado no topo da página (início do documento; sticky opcional)

### RF02 — Listagem de streamers

- Buscar dados em `https://api.chess.com/pub/streamers`
- Exibir **apenas os 10 primeiros** itens do array `streamers`
- Cards empilhados verticalmente (um abaixo do outro)

### RF03 — Conteúdo de cada card

Cada card deve conter:

- **Status ao vivo** — bolinha à esquerda do nome:
  - Verde (`#22c55e`) se `is_live === true`
  - Vermelha (`#ef4444`) se `is_live === false`
- **Nome de usuário** (`username`)
- **Avatar** (`avatar`) — imagem circular
- **Link da Twitch** (`twitch_url`) — clicável, abre em nova aba

### RF04 — Footer

- Nome do desenvolvedor: **José Marcelino**
- Link para o GitHub do desenvolvedor
- Posicionado no final da página

### RF05 — Estados da aplicação

| Estado | Comportamento |
|---|---|
| Loading | Spinner ou skeleton enquanto a API não responde |
| Error | Mensagem amigável + botão **Tentar novamente** |
| Success | Lista de cards renderizada |

---

## 5. Requisitos não funcionais

### 5.1 Responsividade (mobile-first)

- Layout 100% mobile-first
- Mobile: cards com quase toda a largura, `max-width` ~420–480px, centralizados
- Telas `>640px`: coluna única, `max-width` ~560px, centralizados
- Sem grid de múltiplas colunas
- Imagens com `loading="lazy"` e `width`/`height` definidos (evitar layout shift)
- Área clicável do link ≥ 44px

### 5.2 Acessibilidade (WCAG AA)

- Semântica: `<header>`, `<main>`, `<footer>`; cada card como `<article>`
- Bolinha de status com `aria-label` ("Ao vivo" ou "Offline")
- Link da Twitch com texto descritivo (não só ícone)
- Contraste suficiente (WCAG AA)
- Focus visível nos links
- Imagens com `alt={`Avatar de ${username}`}`

### 5.3 Performance

- Fetch **uma única vez** no `useEffect` (dependências `[]`)
- Limitar no frontend: `streamers.slice(0, 10)`
- Sem polling agressivo (respeitar rate limit da Chess.com)
- Sem bibliotecas pesadas
- Imagens com lazy loading

### 5.4 Edge cases

- `twitch_url` vazio ou ausente: fallback (ocultar link ou texto "Twitch indisponível")
- Avatar em `.webp`: garantir exibição
- Avatar ausente: placeholder simples

---

## 6. API e modelo de dados

**Endpoint:** `GET https://api.chess.com/pub/streamers`  
**Auth:** nenhuma  
**Resposta:** objeto com chave `streamers` (array)

Campos utilizados:

| Campo | Tipo | Uso |
|---|---|---|
| `username` | string | Nome no card |
| `avatar` | string (URL) | Imagem do streamer |
| `twitch_url` | string (URL) | Link externo |
| `is_live` | boolean | Bolinha de status |

Demais campos (`url`, `is_community_streamer`, `platforms`, etc.) são ignorados no MVP.

A API costuma retornar streamers já ordenados (mais relevantes / ao vivo primeiro). Não reordenar no frontend.

Tipo esperado:

```ts
type Streamer = {
  username: string;
  avatar: string;
  twitch_url: string;
  is_live: boolean;
};
```

Estado da aplicação:

```ts
const [streamers, setStreamers] = useState<Streamer[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
```

---

## 7. Layout e identidade visual

### 7.1 Estrutura da página

```
┌─────────────────────────────┐
│          HEADER             │  Chess.com Streamers
├─────────────────────────────┤
│   [Card Streamer 1]         │
│   [Card Streamer 2]         │
│   ...                       │
│   [Card Streamer 10]        │
├─────────────────────────────┤
│          FOOTER             │  Dev + GitHub
└─────────────────────────────┘
```

### 7.2 Card

```
┌──────────────────────────────────────┐
│  ●  Username                         │
│  [Avatar]                            │
│  🔗 twitch.tv/username               │
└──────────────────────────────────────┘
```

### 7.3 Tokens de design

| Token | Valor |
|---|---|
| Background da página | `#f8fafc` |
| Card | `#ffffff` |
| Texto principal | `#0f172a` |
| Texto secundário | `#64748b` |
| Verde live | `#22c55e` |
| Vermelho offline | `#ef4444` |
| Link Twitch | `#9146FF` |
| Border-radius do card | `12px`–`16px` |
| Padding do card | `16px`–`24px` |
| Avatar | `64px` ou `80px`, `border-radius: 50%` |
| Bolinha de status | `10px`–`12px` |
| Gap entre cards | `16px` |
| Tipografia | System font stack (ou Inter) |

---

## 8. Estrutura de pastas (Vite)

```
src/
  components/
    Header.tsx
    Footer.tsx
    StreamerCard.tsx
    StreamerList.tsx
  types/
    streamer.ts
  App.tsx
  main.tsx
  index.css
```

Nomes e extensão (TS/JS, CSS Modules) podem ser ajustados na implementação, desde que a separação por componente se mantenha.

---

## 9. Critérios de aceite do MVP

- [ ] Header exibe **Chess.com Streamers**
- [ ] A API é consumida uma vez ao montar a aplicação
- [ ] Apenas 10 streamers são exibidos, em coluna única
- [ ] Cada card mostra status, username, avatar e link da Twitch (quando existir)
- [ ] Loading e Error são tratados; Error permite tentar novamente
- [ ] Footer mostra José Marcelino + link do GitHub
- [ ] Layout mobile-first, acessível e sem bibliotecas extras de fetch/estado
- [x] README no repositório e app publicado (GitHub + deploy)

---

## 10. Fases do projeto

| Fase | Nome | Objetivo |
|---|---|---|
| 1 | Fundação | Projeto Vite, pastas e estilos globais |
| 2 | Layout estrutural | Header, Footer e esqueleto da página |
| 3 | Dados e estados | Fetch, loading, error, retry |
| 4 | Listagem e cards | Cards, lista dinâmica e edge cases |
| 5 | UX e qualidade | Estilo, responsividade, a11y e performance |
| 6 | Publicação | README, GitHub e deploy |

O detalhamento de cada task está em [`.docs/tasks.md`](./tasks.md).
