export interface EmbedInfo {
  type: string
  embedUrl: string
  height: number
}

export function parseEmbedUrl(url: string, compact?: boolean): EmbedInfo | null {
  try {
    const cleanUrl = url.trim()
    const h = (full: number, _compact?: number) => compact ? (_compact ?? Math.round(full * 0.75)) : full

    // 1. YouTube
    if (cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be')) {
      let videoId = ''
      if (cleanUrl.includes('youtu.be/')) {
        videoId = cleanUrl.split('youtu.be/')[1]?.split('?')[0] || ''
      } else if (cleanUrl.includes('youtube.com/shorts/')) {
        videoId = cleanUrl.split('youtube.com/shorts/')[1]?.split('?')[0] || ''
      } else if (cleanUrl.includes('youtube.com/watch')) {
        videoId = new URLSearchParams(new URL(cleanUrl).search).get('v') || ''
      } else if (cleanUrl.includes('youtube.com/embed/')) {
        videoId = cleanUrl.split('youtube.com/embed/')[1]?.split('?')[0] || ''
      }
      if (videoId) {
        return {
          type: 'youtube',
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
          height: h(215, 160)
        }
      }
    }

    // 2. Spotify
    if (cleanUrl.includes('open.spotify.com')) {
      const parts = new URL(cleanUrl).pathname.split('/')
      const type = parts[1]
      const id = parts[2]
      if (type && id) {
        return {
          type: 'spotify',
          embedUrl: `https://open.spotify.com/embed/${type}/${id}`,
          height: type === 'track' ? 80 : h(352, 160)
        }
      }
    }

    // 3. SoundCloud
    if (cleanUrl.includes('soundcloud.com')) {
      return {
        type: 'soundcloud',
        embedUrl: `https://w.soundcloud.com/player/?url=${encodeURIComponent(cleanUrl)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`,
        height: h(166, 120)
      }
    }

    // 4. TikTok
    if (cleanUrl.includes('tiktok.com')) {
      const match = cleanUrl.match(/video\/(\d+)/)
      const videoId = match ? match[1] : ''
      if (videoId) {
        return {
          type: 'tiktok',
          embedUrl: `https://www.tiktok.com/embed/v2/${videoId}`,
          height: h(575, 180)
        }
      }
    }
  } catch (e) {
    console.error('Error parsing embed URL:', e)
  }
  return null
}
