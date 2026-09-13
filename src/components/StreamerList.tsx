import type { Streamer } from '../types/streamer.ts'
import { StreamerCard } from './StreamerCard.tsx'

type StreamerListProps = {
  streamers: Streamer[]
}

export function StreamerList({ streamers }: StreamerListProps) {
  return (
    <section className="streamer-list" aria-label="Lista de streamers">
      {streamers.map((streamer) => (
        <StreamerCard key={streamer.username} streamer={streamer} />
      ))}
    </section>
  )
}
