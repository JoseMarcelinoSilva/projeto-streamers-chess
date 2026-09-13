Brain Dump — Chess.com Streamers List

1. Visão Geral do Projeto

Aplicação frontend simples para listar os 10 primeiros streamers da API pública do Chess.com (https://api.chess.com/pub/streamers).

Objetivo principal:

Consumir a API

Exibir cards com informações básicas de cada streamer

Indicar status ao vivo (bolinha verde/vermelha)

Layout limpo, responsivo e acessível

Publicado no GitHub e compartilhado na comunidade B7Web

Stack técnica:

React + Vite

Hooks: useState e useEffect

Fetch nativo (sem bibliotecas extras de estado ou data-fetching)

2. Requisitos Funcionais

RF01 — Header

Exibir o nome do projeto (ex: "Chess.com Streamers" ou "Top Streamers Chess.com")

Fixo no topo ou simplesmente no início da página

RF02 — Listagem de Streamers

Buscar dados da API https://api.chess.com/pub/streamers

Exibir apenas os 10 primeiros streamers do array retornado

Cards empilhados verticalmente (um abaixo do outro)

RF03 — Conteúdo de cada Card

Cada card deve conter:

Status ao vivo → bolinha colorida à esquerda do nome:

Verde (#22c55e ou similar) se is_live === true

Vermelha (#ef4444 ou similar) se is_live === false

Nome de usuário (username)

Avatar (avatar) — imagem circular ou arredondada

Link da Twitch (twitch_url) — clicável, abrindo em nova aba

RF04 — Footer

Nome do desenvolvedor (José Marcelino)

Link para o GitHub do desenvolvedor

Posicionado no final da página

RF05 — Estados da aplicação

Loading (enquanto a API não responde)

Error (caso a requisição falhe)

Success (lista renderizada)

3. Estrutura de Dados (API)

A API retorna um objeto com a chave streamers (array).

Exemplo de item do array:

{"streamers": [
    {
      "username": "Chess24",
      "avatar": "https://images.chesscomfiles.com/uploads/v1/user/302880433.dc8aca73.50x50o.5dafc7607ff6.png",
      "twitch_url": "https://twitch.tv/chess24",
      "url": "https://www.chess.com/member/Chess24",
      "is_live": true,
      "is_community_streamer": false,
      "platforms": [
        {
          "type": "twitch",
          "stream_url": "https://twitch.tv/chess24",
          "channel_url": "https://twitch.tv/chess24",
          "is_live": true,
          "is_main_live_platform": true
        }
      ]
    }
}

Campos utilizados no projeto:

username

avatar

twitch_url

is_live

Os demais campos podem ser ignorados por enquanto.


4. Layout e Componentes

Estrutura de página

┌─────────────────────────────┐
│          HEADER             │  ← Nome do projeto
├─────────────────────────────┤
│                             │
│   [Card Streamer 1]         │
│   [Card Streamer 2]         │
│   [Card Streamer 3]         │
│   ...                       │
│   [Card Streamer 10]        │
│                             │
├─────────────────────────────┤
│          FOOTER             │  ← Dev + GitHub
└─────────────────────────────┘

Card de Streamer (visual)

┌──────────────────────────────────────┐
│  ●  Username                         │  ← bolinha + nome
│                                      │
│  [Avatar]                            │
│                                      │
│  🔗 twitch.tv/username               │  ← link clicável
└──────────────────────────────────────┘

Sugestões de estilo:


Card com fundo branco/cinza claro, borda sutil ou sombra leve

Border-radius: 12px–16px

Padding interno generoso (16–24px)

Avatar: 64px ou 80px, border-radius: 50% (circular)

Bolinha de status: 10–12px de diâmetro, com leve sombra ou ring

Tipografia limpa (system font ou Inter/Roboto)

Gap vertical entre cards: 16px

Cores sugeridas (tema claro)

Background página: #f8fafc ou #f1f5f9

Card: #ffffff

Texto principal: #0f172a

Texto secundário: #64748b

Verde live: #22c55e

Vermelho offline: #ef4444

Link Twitch: #9146FF (cor oficial da Twitch) ou azul padrão

5. Responsividade e Mobile-First


Layout 100% mobile-first


Cards ocupam quase toda a largura em mobile (max-width ~420–480px centralizado)

Em telas maiores (>640px): manter cards em coluna única, mas com max-width maior (ex: 560px) e centralizados

Não usar grid de múltiplas colunas — o requisito é “um abaixo do outro”

Imagens com loading="lazy" e width/height definidos para evitar layout shift

Fontes e botões com tamanho de toque adequado (≥44px de área clicável no link)

6. Acessibilidade (a11y)

Semântica correta:

<header>, <main>, <footer>

Cada card pode ser um <article>

Bolinha de status deve ter texto alternativo ou aria-label:

aria-label="Ao vivo" ou "Offline"

Link da Twitch deve ter texto descritivo (não só o ícone)

Contraste de cores suficiente (WCAG AA no mínimo)

Focus visível nos links

Imagens com alt descritivo: alt={Avatar de ${username}}

7. Performance (especialmente mobile)

Fetch apenas uma vez no useEffect (array de dependências vazio)

Limitar a 10 itens no frontend (streamers.slice(0, 10))

Usar loading="lazy" nas imagens

Evitar bibliotecas pesadas

CSS simples (pode ser CSS Modules, Tailwind ou CSS puro)

Preferir fetch nativo + estado local

8. Estados e Fluxo de Dados

const [streamers, setStreamers] = useState<Streamer[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  // fetch → setStreamers(data.streamers.slice(0, 10))
}, []);

Loading: spinner ou skeleton simples

Error: mensagem amigável + botão “Tentar novamente” (opcional)

Success: lista de cards

9. Informações do Desenvolvedor (Footer)

Placeholder (será preenchido depois):

Nome: [Nome do Dev]

GitHub: https://github.com/[username]

Sugestão de texto:

Desenvolvido por [Nome] · GitHub

10. Próximos Passos (para o PRD)

Definir nome final do projeto

Definir identidade visual (cores exatas, tipografia)

Decidir se haverá dark mode

Definir comportamento do link da Twitch (sempre externo)

Planejar estrutura de pastas do Vite

Definir se haverá testes (opcional para MVP)

Checklist de publicação no GitHub + README + deploy (Vercel/Netlify)

Observações extras do brain-dump

A API parece retornar streamers já ordenados (os primeiros costumam ser os mais relevantes/ao vivo).

Alguns streamers podem ter twitch_url vazio? (tratar caso edge com fallback)

Avatar às vezes vem em .webp — garantir suporte

Não é necessário autenticação na API pública

Rate limit da Chess.com API deve ser respeitado (não fazer polling agressivo)

priorizar para que o código seja leve e de fácil manutenção

Fim do Brain Dump

Este documento serve como base bruta para a criação do PRD.md formal.