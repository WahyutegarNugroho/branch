'use client'

import type { FormEvent } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, Search } from 'lucide-react'
import { PLATFORMS } from '@/utils/platforms'

interface SocialLinksSectionProps {
  socialLinks: Record<string, string>
  socialSearch: string
  setSocialSearch: (val: string) => void
  handleSocialChange: (key: string, val: string) => void
  socialLoading: boolean
  onSocialSubmit: (e: FormEvent) => Promise<void>
}

export function SocialLinksSection({
  socialLinks,
  socialSearch,
  setSocialSearch,
  handleSocialChange,
  socialLoading,
  onSocialSubmit,
}: SocialLinksSectionProps) {
  return (
    <Card className="rounded-2xl shadow-sm border-white/10 bg-zinc-900/50 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-xl text-white font-bold flex items-center gap-2">
          🔗 Social Icons
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Display beautiful social icon shortcuts horizontally below your bio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSocialSubmit} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search platforms..."
              value={socialSearch}
              onChange={(e) => setSocialSearch(e.target.value)}
              className="rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-brand-pink h-10 text-xs pl-9"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(() => {
              const filtered = PLATFORMS.filter(p => {
                if (!socialSearch) return true
                const q = socialSearch.toLowerCase()
                return p.name.toLowerCase().includes(q) || p.id.includes(q)
              })
              const sorted = [...filtered].sort((a, b) => {
                const aHasVal = !!socialLinks[a.id]
                const bHasVal = !!socialLinks[b.id]
                if (aHasVal && !bHasVal) return -1
                if (!aHasVal && bHasVal) return 1
                return a.name.localeCompare(b.name)
              })
              return sorted.map((platform) => {
                const Icon = platform.icon
                return (
                  <div key={platform.id} className="space-y-1.5">
                    <Label htmlFor={`social_${platform.id}`} className="text-zinc-300 flex items-center gap-1.5 text-xs font-semibold">
                      <Icon size={14} style={{ color: platform.color }} />
                      {platform.name}
                    </Label>
                    <Input
                      id={`social_${platform.id}`}
                      value={socialLinks[platform.id] || ''}
                      onChange={(e) => handleSocialChange(platform.id, e.target.value)}
                      placeholder={platform.urlPrefix || `https://${platform.id}.com/`}
                      className="rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-brand-pink h-10 text-xs"
                    />
                  </div>
                )
              })
            })()}
          </div>
          <Button type="submit" disabled={socialLoading} className="rounded-xl bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-90 text-white border-0 font-semibold h-11 px-6 shadow-lg mt-4">
            {socialLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Social Icons'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
