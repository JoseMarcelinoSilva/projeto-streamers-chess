# Chess.com Streamers

Aplicação frontend que consome a [API pública do Chess.com](https://api.chess.com/pub/streamers) e lista streamers em cards, com status online/offline, avatar e link da Twitch.

O projeto demonstra **state**, **effects** e **listas dinâmicas** em React: um único `fetch` no mount, estados de loading/erro e paginação de 10 cards por vez.

![Tela da listagem de streamers do Chess.com](.docs/screenshot.png)

**App no ar:** [https://josemarcelinosilva.github.io/projeto-streamers-chess/](https://josemarcelinosilva.github.io/projeto-streamers-chess/)

## Stack

- **React** + **Vite** + TypeScript
- Hooks: `useState` e `useEffect`
- HTTP: `fetch` nativo (sem Axios, React Query ou Redux)
- CSS puro, layout mobile-first

## Como rodar

Pré-requisito: Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Abra o endereço exibido no terminal (em geral `http://localhost:5173`).

Outros scripts:

```bash
npm run build    # build de produção
npm run preview  # pré-visualiza o build
```

## API

Os dados vêm do endpoint público:

```
GET https://api.chess.com/pub/streamers
```

Não é necessária autenticação. A aplicação busca a lista uma vez ao montar e exibe 10 streamers por página.

## Funcionalidades

- Header com o nome **Chess.com Streamers**
- Cards em duas colunas, com status **online** / **offline** abaixo do username, avatar e link da Twitch
- Estados de **loading** (spinner), **erro** com botão *Tentar novamente* e **sucesso**
- Paginação *Anteriores* / *Próximos* (10 cards por página)
- Footer com crédito do desenvolvedor e link do GitHub

## Deploy

O app está publicado no GitHub Pages:

**https://josemarcelinosilva.github.io/projeto-streamers-chess/**

Repositório: [github.com/JoseMarcelinoSilva/projeto-streamers-chess](https://github.com/JoseMarcelinoSilva/projeto-streamers-chess)

Também é possível importar o mesmo repositório na [Vercel](https://vercel.com/new) ou na [Netlify](https://app.netlify.com/start) para um deploy contínuo a partir do `main`.

## Autor

[José Marcelino](https://github.com/JoseMarcelinoSilva)
