'use client'

import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

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
  return (
    <>
      <div className="flex-1 space-y-3">
        <Input name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required className="font-bold rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-white h-12" />
        <Input name="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" required className="rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-white h-12" />
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
