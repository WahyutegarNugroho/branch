'use client'

import type { FormEvent, RefObject } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { usePreviewStore } from '@/lib/preview-store'
import { cn } from '@/lib/utils'

interface ProfileInfoSectionProps {
  avatarUrl: string
  setAvatarUrl: (url: string) => void
  avatarInputRef: RefObject<HTMLInputElement | null>
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'bg' | 'banner') => Promise<void>
  hostPrefix: string
  username: string
  setUsername: (val: string) => void
  usernameStatus: 'idle' | 'checking' | 'available' | 'taken' | 'invalid'
  fullName: string
  setFullName: (val: string) => void
  bio: string
  setBio: (val: string) => void
  infoLoading: boolean
  onInfoSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
}

const statusBadge: Record<string, { className: string; label: string; ping?: boolean }> = {
  checking: { className: 'bg-zinc-800 text-zinc-400', label: 'Checking...', ping: false },
  available: { className: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20', label: 'Available', ping: true },
  taken: { className: 'bg-rose-500/10 text-rose-400 border border-rose-500/20', label: 'Taken' },
  invalid: { className: 'bg-amber-500/10 text-amber-400 border border-amber-500/20', label: 'Invalid' },
}

export function ProfileInfoSection({
  avatarUrl,
  setAvatarUrl,
  avatarInputRef,
  handleFileChange,
  hostPrefix,
  username,
  setUsername,
  usernameStatus,
  fullName,
  setFullName,
  bio,
  setBio,
  infoLoading,
  onInfoSubmit,
}: ProfileInfoSectionProps) {
  return (
    <Card className="rounded-2xl shadow-sm border-white/10 bg-zinc-900/50 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-xl text-white font-bold">Profile</CardTitle>
        <CardDescription className="text-zinc-400">Update your personal details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onInfoSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/5 mb-6">
            <div className="relative group cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-white transition-all relative shadow-lg">
                {avatarUrl ? (
                  <Image src={avatarUrl} alt="Avatar Preview" fill className="object-cover" sizes="96px" />
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center text-zinc-500 font-semibold text-xs uppercase">
                    No Photo
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Change</span>
                </div>
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left space-y-2">
              <span className="text-sm font-semibold text-white block">Profile Picture</span>
              <p className="text-xs text-zinc-400 max-w-sm">Click the avatar or button below to upload your photo. Circle-crop will be applied automatically.</p>
              <div className="flex gap-2 justify-center sm:justify-start">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => avatarInputRef.current?.click()}
                  className="rounded-xl border-white/10 bg-white/5 text-zinc-300 hover:text-white h-9 text-xs"
                >
                  Upload Photo
                </Button>
                {avatarUrl && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setAvatarUrl('')
                      usePreviewStore.getState().updateProfile({ avatar_url: '' })
                    }}
                    className="rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 h-9 text-xs"
                  >
                    Remove
                  </Button>
                )}
              </div>
              <input
                type="file"
                ref={avatarInputRef}
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, 'avatar')}
              />
            </div>
          </div>

          <div className="space-y-2 border-b border-white/5 pb-6 mb-6 font-sans-theme">
            <Label htmlFor="username" className="text-zinc-300 font-semibold">Custom Profile URL</Label>
            <div className="flex items-stretch shadow-sm rounded-xl overflow-hidden">
              <span className="bg-zinc-900/80 border border-white/10 border-r-0 rounded-l-xl px-4 flex items-center text-zinc-500 font-bold text-sm tracking-wide shrink-0 select-none font-display-theme">
                {hostPrefix}
              </span>
              <div className="relative flex-1">
                <Input
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                  placeholder="username"
                  required
                  className="rounded-r-xl rounded-l-none border-white/10 bg-white/5 text-white focus-visible:ring-white h-12 pl-3 pr-28 text-sm font-semibold tracking-wide w-full focus-visible:ring-offset-0 focus:border-white"
                />
                {usernameStatus !== 'idle' && statusBadge[usernameStatus] && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none font-sans-theme">
                    <span className={cn('text-[10px] font-bold px-2 py-1 rounded-md', statusBadge[usernameStatus].className)}>
                      {statusBadge[usernameStatus].ping && (
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping inline-block mr-1" />
                      )}
                      {statusBadge[usernameStatus].label}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 font-medium">
              Your unique public profile link. Only lowercase letters, numbers, underscores (_), or hyphens (-) are allowed.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_name" className="text-zinc-300">Full Name</Label>
            <Input
              id="full_name"
              name="full_name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jane Doe"
              className="rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-white h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-zinc-300">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a short bio..."
              className="rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-white min-h-[100px]"
            />
          </div>
          <Button type="submit" disabled={infoLoading} className="rounded-xl bg-white text-black hover:bg-zinc-200 border-0 font-semibold h-11 px-6 shadow-lg">
            {infoLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
