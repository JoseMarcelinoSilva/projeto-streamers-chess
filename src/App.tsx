import { useEffect, useState } from 'react'
import { Footer } from './components/Footer.tsx'
import { Header } from './components/Header.tsx'
import { StreamerList } from './components/StreamerList.tsx'
import { STREAMERS_API_URL, STREAMERS_PAGE_SIZE } from './constants.ts'
import type { Streamer } from './types/streamer.ts'

const FRIENDLY_ERROR =
  'Não foi possível carregar os streamers. Verifique sua conexão e tente novamente.'

async function fetchStreamers(): Promise<Streamer[]> {
  const response = await fetch(STREAMERS_API_URL)

  if (!response.ok) {
    throw new Error('Resposta inválida da API')
  }

  const data: unknown = await response.json()

  if (
    typeof data !== 'object' ||
    data === null ||
    !('streamers' in data) ||
    !Array.isArray(data.streamers)
  ) {
    throw new Error('Formato inesperado da API')
  }

  return data.streamers as Streamer[]
}

function App() {
  const [streamers, setStreamers] = useState<Streamer[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const pageStart = page * STREAMERS_PAGE_SIZE
  const visibleStreamers = streamers.slice(
    pageStart,
    pageStart + STREAMERS_PAGE_SIZE,
  )
  const hasPreviousPage = page > 0
  const hasNextPage = pageStart + STREAMERS_PAGE_SIZE < streamers.length

  async function loadStreamers() {
    setLoading(true)
    setError(null)
    setPage(0)

    try {
      const items = await fetchStreamers()
      setStreamers(items)
    } catch {
      setStreamers([])
      setError(FRIENDLY_ERROR)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadStreamers()
  }, [])

  return (
    <div className="app">
      <Header />
      <main className="site-main" aria-busy={loading}>
        {loading ? (
          <div className="status-panel" role="status" aria-live="polite">
            <span className="spinner" aria-hidden="true" />
            <p className="status-message">Carregando streamers…</p>
          </div>
        ) : error ? (
          <div className="status-panel" role="alert">
            <p className="status-message">{error}</p>
            <button
              className="retry-button"
              type="button"
              onClick={() => {
                void loadStreamers()
              }}
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <>
            <StreamerList streamers={visibleStreamers} />
            {(hasPreviousPage || hasNextPage) && (
              <nav
                className={`pagination${hasPreviousPage ? ' has-previous' : ''}`}
                aria-label="Paginação de streamers"
              >
                {hasPreviousPage && (
                  <button
                    className="pagination-button"
                    type="button"
                    onClick={() => {
                      setPage((current) => current - 1)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    Anteriores
                  </button>
                )}
                {hasNextPage && (
                  <button
                    className="pagination-button"
                    type="button"
                    onClick={() => {
                      setPage((current) => current + 1)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    Próximos
                  </button>
                )}
              </nav>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
