import { useState } from 'react'
import type { Streamer } from '../types/streamer.ts'

type StreamerCardProps = {
  streamer: Streamer
}

function hasText(value?: string): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function StreamerAvatar({
  username,
  avatar,
}: {
  username: string
  avatar?: string
}) {
  const [failed, setFailed] = useState(false)
  const showImage = hasText(avatar) && !failed
  const initial = username.trim().charAt(0).toUpperCase() || '?'

  if (!showImage) {
    return (
      <div
        className="streamer-avatar streamer-avatar-placeholder"
        role="img"
        aria-label={`Avatar de ${username}`}
      >
        {initial}
      </div>
    )
  }

  return (
    <img
      className="streamer-avatar"
      src={avatar}
      alt={`Avatar de ${username}`}
      width={80}
      height={80}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

export function StreamerCard({ streamer }: StreamerCardProps) {
  const { username, avatar, twitch_url, is_live } = streamer
  const statusLabel = is_live ? 'online' : 'offline'

  return (
    <article className="streamer-card">
      <div className="streamer-heading">
        <h2 className="streamer-username">{username}</h2>
        <p
          className={`streamer-status-text ${is_live ? 'is-live' : 'is-offline'}`}
        >
          <span
            className={`streamer-status ${is_live ? 'is-live' : 'is-offline'}`}
            aria-hidden="true"
          />
          {statusLabel}
        </p>
      </div>

      <StreamerAvatar username={username} avatar={avatar} />

      {hasText(twitch_url) ? (
        <a
          className="streamer-twitch"
          href={twitch_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Assistir {username} na Twitch
        </a>
      ) : (
        <p className="streamer-twitch-unavailable">Twitch indisponível</p>
      )}
    </article>
  )
}
