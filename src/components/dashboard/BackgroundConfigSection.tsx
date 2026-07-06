'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Video } from 'lucide-react'

export function BackgroundConfigSection({
  bgType,
  setBgType,
  bgColor,
  setBgColor,
  bgImageUrl,
  bgVideoUrl,
  setBgVideoUrl,
  opacity,
  setOpacity,
  fileInputRef,
  handleFileChange,
  setIsColorPickerOpen,
  setIsGradientPickerOpen,
}: {
  bgType: string
  setBgType: (val: 'solid' | 'gradient' | 'image' | 'video') => void
  bgColor: string
  setBgColor: (val: string) => void
  bgImageUrl: string
  bgVideoUrl: string
  setBgVideoUrl: (val: string) => void
  opacity: number[]
  setOpacity: (val: number[]) => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, type?: 'avatar' | 'bg' | 'banner') => void
  setIsColorPickerOpen: (val: boolean) => void
  setIsGradientPickerOpen: (val: boolean) => void
}) {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="cursor-pointer" onClick={() => { setBgType('solid'); setIsColorPickerOpen(true); }}>
          <input type="radio" name="bg_type" value="solid" checked={bgType === 'solid'} onChange={() => setBgType('solid')} id="bg_type_solid" className="peer sr-only" />
          <div className={`h-24 rounded-2xl border-2 ${bgType === 'solid' ? 'border-white' : 'border-white/10'} flex flex-col items-center justify-center bg-white/5 transition-all relative overflow-hidden`}>
            <span className="font-semibold text-zinc-300 relative z-10">Solid</span>
            <div className="w-5 h-5 rounded-full border border-white/20 mt-2 relative z-10 shadow-sm" style={{ backgroundColor: bgType === 'solid' ? bgColor : '#09090b' }} />
          </div>
        </div>
        <div className="cursor-pointer" onClick={() => { setBgType('gradient'); setIsGradientPickerOpen(true); }}>
          <input type="radio" name="bg_type" value="gradient" checked={bgType === 'gradient'} onChange={() => setBgType('gradient')} id="bg_type_gradient" className="peer sr-only" />
          <div
            className={`h-24 rounded-2xl border-2 ${bgType === 'gradient' ? 'border-white' : 'border-white/10'} flex flex-col items-center justify-center transition-all relative overflow-hidden`}
            style={{ background: bgColor.includes('gradient') ? bgColor : 'linear-gradient(to bottom, #ffffff, #71717a)' }}
          >
            <span className="font-semibold text-white drop-shadow-md relative z-10">Gradient</span>
          </div>
        </div>
        <div className="cursor-pointer" onClick={() => { setBgType('image'); fileInputRef.current?.click(); }}>
          <input type="radio" name="bg_type" value="image" checked={bgType === 'image'} onChange={() => setBgType('image')} id="bg_type_image" className="peer sr-only" />
          <div
            className={`h-24 rounded-2xl border-2 ${bgType === 'image' ? 'border-white' : 'border-white/10'} flex items-center justify-center bg-cover bg-center transition-all relative overflow-hidden`}
            style={{ backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : `url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=300&auto=format&fit=crop')` }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <span className="font-semibold text-white drop-shadow-md relative z-10">Image</span>
          </div>
        </div>
        <div className="cursor-pointer" onClick={() => { setBgType('video'); }}>
          <input type="radio" name="bg_type" value="video" checked={bgType === 'video'} onChange={() => setBgType('video')} id="bg_type_video" className="peer sr-only" />
          <div className={`h-24 rounded-2xl border-2 ${bgType === 'video' ? 'border-white' : 'border-white/10'} flex flex-col items-center justify-center bg-white/5 transition-all relative overflow-hidden`}>
            <Video className="w-5 h-5 text-zinc-400 mb-1 relative z-10" />
            <span className="font-semibold text-zinc-300 relative z-10">Video</span>
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="space-y-2">
        <Label htmlFor="bg_color" className="text-zinc-300">Color Code (Solid/Gradient)</Label>
        <Input
          id="bg_color"
          name="bg_color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          placeholder="#09090b"
          className="rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-white h-12"
        />
      </div>

      {bgType === 'video' && (
        <div className="space-y-2 animate-in fade-in duration-200">
          <Label htmlFor="bg_video_url" className="text-zinc-300 flex items-center gap-2">
            <Video className="w-4 h-4 text-white" /> Background Video URL (MP4, YouTube, etc.)
          </Label>
          <Input
            id="bg_video_url"
            name="bg_video_url"
            value={bgVideoUrl}
            onChange={(e) => setBgVideoUrl(e.target.value)}
            placeholder="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4"
            className="rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-white h-12 text-sm"
          />
          <p className="text-[11px] text-zinc-400">Enter a direct MP4 (.mp4) link, YouTube video link, or other short video url.</p>
        </div>
      )}

      <div className="space-y-4">
        <Label className="text-zinc-300">Dark Overlay Opacity ({opacity?.[0] ?? 0}%)</Label>
        <Slider
          value={opacity}
          onValueChange={(val) => setOpacity(Array.isArray(val) ? val : [val])}
          max={100}
          step={1}
          className="w-full [&_[role=slider]]:bg-white"
        />
        <p className="text-sm text-zinc-400">Useful to make text readable on bright custom images.</p>
      </div>
    </>
  )
}
