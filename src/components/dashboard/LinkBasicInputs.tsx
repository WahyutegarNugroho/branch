'use client'

import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Globe } from 'lucide-react'

export function LinkBasicInputs({
  title,
  setTitle,
  url,
  setUrl,
  isEmbed,
  setIsEmbed
}: {
  title: string
  setTitle: (val: string) => void
  url: string
  setUrl: (val: string) => void
  isEmbed: boolean
  setIsEmbed: (val: boolean) => void
}) {
  const normalizeUrl = (input: string) => {
    const trimmed = input.trim()
    if (!trimmed) return ''
    if (/^(https?:\/\/|mailto:|tel:|#|\/)/i.test(trimmed)) {
      return trimmed
    }
    // Prepend https:// if user pasted domain or path
    if (/^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/i.test(trimmed)) {
      return `https://${trimmed}`
    }
    return trimmed
  }

  return (
    <>
      <div className="flex-1 space-y-3">
        <Input 
          name="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Title (e.g. My Website, Latest Video)" 
          required 
          className="font-bold rounded-xl border-white/10 bg-white/5 text-white placeholder:text-zinc-400 focus-visible:ring-white h-12" 
        />
        <div className="relative flex items-center">
          <Globe className="w-4 h-4 text-zinc-500 absolute left-3.5 pointer-events-none" />
          <Input 
            name="url" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)}
            onBlur={() => setUrl(normalizeUrl(url))}
            placeholder="https://example.com" 
            required 
            className="pl-10 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-zinc-400 focus-visible:ring-white h-12" 
          />
        </div>
      </div>
      
      {/* Embed Switch */}
      <div className="flex items-center justify-between bg-zinc-950/50 p-3 rounded-xl border border-white/5 mt-4">
        <div>
          <span className="text-xs font-bold text-white block">Embed Content</span>
          <span className="text-[10px] text-zinc-400">Show video/music directly on your profile</span>
        </div>
        <Switch checked={isEmbed} onCheckedChange={setIsEmbed} />
      </div>
      <input type="hidden" name="is_embed" value={isEmbed ? 'on' : 'off'} />
    </>
  )
}
