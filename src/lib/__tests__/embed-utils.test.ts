import { describe, it, expect } from 'vitest'
import { parseEmbedUrl } from '../embed-utils'

describe('parseEmbedUrl', () => {
  describe('YouTube', () => {
    it('parses youtube.com/watch', () => {
      const result = parseEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
      expect(result).toEqual({
        type: 'youtube',
        embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        height: 215,
      })
    })

    it('parses youtu.be short URL', () => {
      const result = parseEmbedUrl('https://youtu.be/dQw4w9WgXcQ')
      expect(result).toEqual({
        type: 'youtube',
        embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        height: 215,
      })
    })

    it('parses youtube shorts', () => {
      const result = parseEmbedUrl('https://www.youtube.com/shorts/dQw4w9WgXcQ')
      expect(result?.type).toBe('youtube')
      expect(result?.embedUrl).toContain('dQw4w9WgXcQ')
    })

    it('parses youtube.com/embed', () => {
      const result = parseEmbedUrl('https://www.youtube.com/embed/dQw4w9WgXcQ')
      expect(result?.type).toBe('youtube')
      expect(result?.embedUrl).toContain('dQw4w9WgXcQ')
    })

    it('returns compact height when compact=true', () => {
      const result = parseEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ', true)
      expect(result?.height).toBe(160)
    })

    it('returns null for invalid YouTube URL', () => {
      expect(parseEmbedUrl('https://youtube.com')).toBeNull()
    })
  })

  describe('Spotify', () => {
    it('parses a track URL', () => {
      const result = parseEmbedUrl('https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT')
      expect(result).toEqual({
        type: 'spotify',
        embedUrl: 'https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT',
        height: 80,
      })
    })

    it('parses a playlist URL', () => {
      const result = parseEmbedUrl('https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M')
      expect(result?.type).toBe('spotify')
      expect(result?.height).toBe(352)
    })

    it('returns compact height for playlist', () => {
      const result = parseEmbedUrl('https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M', true)
      expect(result?.height).toBe(160)
    })
  })

  describe('SoundCloud', () => {
    it('parses a SoundCloud URL', () => {
      const result = parseEmbedUrl('https://soundcloud.com/user/track')
      expect(result).toEqual({
        type: 'soundcloud',
        embedUrl: expect.stringContaining('soundcloud.com/player'),
        height: 166,
      })
    })

    it('returns compact height', () => {
      const result = parseEmbedUrl('https://soundcloud.com/user/track', true)
      expect(result?.height).toBe(120)
    })
  })

  describe('TikTok', () => {
    it('parses a TikTok video URL', () => {
      const result = parseEmbedUrl('https://www.tiktok.com/@user/video/1234567890')
      expect(result).toEqual({
        type: 'tiktok',
        embedUrl: 'https://www.tiktok.com/embed/v2/1234567890',
        height: 575,
      })
    })

    it('returns compact height', () => {
      const result = parseEmbedUrl('https://www.tiktok.com/@user/video/1234567890', true)
      expect(result?.height).toBe(180)
    })
  })

  it('returns null for unknown URL', () => {
    expect(parseEmbedUrl('https://example.com')).toBeNull()
  })

  it('returns null for empty string', () => {
    expect(parseEmbedUrl('')).toBeNull()
  })
})
