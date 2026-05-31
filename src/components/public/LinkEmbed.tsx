'use client'

import { parseEmbedUrl } from '@/lib/embed-utils'

interface LinkEmbedProps {
  url: string
}

export function LinkEmbed({ url }: LinkEmbedProps) {
  const embedInfo = parseEmbedUrl(url)
  if (!embedInfo) return null

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-white/10 backdrop-blur-md bg-zinc-900/40">
      <iframe
        width="100%"
        height={embedInfo.height}
        src={embedInfo.embedUrl}
        title={`${embedInfo.type} embed player`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full block"
      />
    </div>
  )
}
