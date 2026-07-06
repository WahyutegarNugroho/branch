'use client'

import type { RefObject } from 'react'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SelectableGrid } from '@/components/shared/SelectableGrid'
import { Sparkles, Image as ImageIcon, Sliders, AlignCenter, AlignLeft, AlignRight, LayoutGrid, Palette } from 'lucide-react'

interface AdvancedAppearanceSectionProps {
  bannerUrl: string
  setBannerUrl: (val: string) => void
  bannerInputRef: RefObject<HTMLInputElement | null>
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'bg' | 'banner') => Promise<void>
  setCropType: (val: 'avatar' | 'bg' | 'banner') => void
  profileAlign: string
  setProfileAlign: (val: string) => void
  layoutType: string
  setLayoutType: (val: string) => void
  avatarShape: string
  setAvatarShape: (val: string) => void
  avatarFrame: string
  setAvatarFrame: (val: string) => void
  avatarFrameConfig: Record<string, string | undefined>
  setAvatarFrameConfig: (val: Record<string, string | undefined>) => void
  avatarSize: string
  setAvatarSize: (val: string) => void
  linkSpacing: string
  setLinkSpacing: (val: string) => void
  textColor: string
  setTextColor: (val: string) => void
  setIsTextColorPickerOpen: (val: boolean) => void
  socialStyle: string
  setSocialStyle: (val: string) => void
  socialPlacement: string
  setSocialPlacement: (val: string) => void
}

const alignItems = [
  { val: 'center', label: 'Center', icon: AlignCenter },
  { val: 'left', label: 'Left Align', icon: AlignLeft },
  { val: 'right', label: 'Right Align', icon: AlignRight },
]

const layoutItems = [
  { val: 'list', label: 'List View', icon: AlignCenter },
  { val: 'grid', label: 'Grid 2-Column', icon: LayoutGrid },
]

const avatarShapeItems = [
  { val: 'circle', label: 'Circle' },
  { val: 'rounded', label: 'Square' },
  { val: 'hexagon', label: 'Hexagon' },
]

const avatarFrameItems = [
  { val: 'none', label: 'None' },
  { val: 'gradient-ring', label: 'Gradient' },
  { val: 'neon-glow', label: 'Neon' },
]

const avatarSizeItems = [
  { val: 'small', label: 'Small' },
  { val: 'medium', label: 'Medium' },
  { val: 'large', label: 'Large' },
]

const spacingItems = [
  { val: 'compact', label: 'Compact' },
  { val: 'normal', label: 'Normal' },
  { val: 'relaxed', label: 'Relaxed' },
]

const socialStyleItems = [
  { val: 'circle', label: 'Circle' },
  { val: 'outline', label: 'Outline' },
  { val: 'square', label: 'Square' },
  { val: 'minimal', label: 'No Border' },
]

const placementItems = [
  { val: 'top', label: 'Top (Under Bio)' },
  { val: 'bottom', label: 'Bottom (Footer)' },
]

export function AdvancedAppearanceSection({
  bannerUrl, setBannerUrl,
  bannerInputRef,
  handleFileChange,
  setCropType,
  profileAlign, setProfileAlign,
  layoutType, setLayoutType,
  avatarShape, setAvatarShape,
  avatarFrame, setAvatarFrame,
  avatarFrameConfig, setAvatarFrameConfig,
  avatarSize, setAvatarSize,
  linkSpacing, setLinkSpacing,
  textColor, setTextColor,
  setIsTextColorPickerOpen,
  socialStyle, setSocialStyle,
  socialPlacement, setSocialPlacement,
}: AdvancedAppearanceSectionProps) {
  return (
    <>
      {/* Layout & Hero Banner */}
      <div className="space-y-4 pt-6 border-t border-white/5 animate-in fade-in duration-300">
        <h3 className="text-sm font-bold text-zinc-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-white" /> Layout & Hero Banner
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs">Hero Banner Image (Rasio 3:1)</Label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                onClick={() => {
                  setCropType('banner')
                  bannerInputRef.current?.click()
                }}
                className="bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-xs h-10 px-4 flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4 text-zinc-400" />
                {bannerUrl ? 'Change Banner' : 'Upload Banner'}
              </Button>
              {bannerUrl && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    setBannerUrl('')
                  }}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs h-10 px-3"
                >
                  Delete
                </Button>
              )}
            </div>
            {bannerUrl && (
              <div className="w-full aspect-[3/1] rounded-xl overflow-hidden border border-white/10 mt-2 relative">
                <Image src={bannerUrl} alt="Banner preview" fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
              </div>
            )}
            <input
              type="file"
              ref={bannerInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, 'banner')}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs">Content Alignment</Label>
            <SelectableGrid
              items={alignItems}
              value={profileAlign}
              onChange={setProfileAlign}
              columns={3}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs">Link Layout Type</Label>
            <SelectableGrid
              items={layoutItems}
              value={layoutType}
              onChange={setLayoutType}
              columns={2}
            />
          </div>
        </div>
      </div>

      {/* Avatar & Spacing Controls */}
      <div className="space-y-4 pt-6 border-t border-white/5 animate-in fade-in duration-300">
        <h3 className="text-sm font-bold text-zinc-300 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-white" /> Spacing & Custom Elements
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs">Avatar Shape</Label>
            <SelectableGrid
              items={avatarShapeItems}
              value={avatarShape}
              onChange={setAvatarShape}
              columns={3}
              itemHeight="sm"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs">Avatar Frame</Label>
            <SelectableGrid
              items={avatarFrameItems}
              value={avatarFrame}
              onChange={setAvatarFrame}
              columns={3}
              itemHeight="sm"
            />

            {avatarFrame !== 'none' && (
              <div className="mt-3 space-y-2 animate-in fade-in zoom-in duration-300">
                <Label className="text-zinc-400 text-[10px] uppercase tracking-wider">Frame Colors</Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex flex-col gap-1">
                    <Label className="text-zinc-500 text-[9px]">Color 1</Label>
                    <div className="relative">
                      <input
                        type="color"
                        value={avatarFrameConfig?.color1 || (avatarFrame === 'gradient-ring' ? '#ffffff' : '#e4e4e7')}
                        onChange={(e) => setAvatarFrameConfig({ ...avatarFrameConfig, color1: e.target.value })}
                        className="w-full h-8 rounded-lg cursor-pointer bg-zinc-800 border border-white/10 p-0"
                      />
                    </div>
                  </div>
                  {avatarFrame === 'gradient-ring' && (
                    <div className="flex-1 flex flex-col gap-1">
                      <Label className="text-zinc-500 text-[9px]">Color 2</Label>
                      <div className="relative">
                        <input
                          type="color"
                          value={avatarFrameConfig?.color2 || '#71717a'}
                          onChange={(e) => setAvatarFrameConfig({ ...avatarFrameConfig, color2: e.target.value })}
                          className="w-full h-8 rounded-lg cursor-pointer bg-zinc-800 border border-white/10 p-0"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs">Avatar Size</Label>
            <SelectableGrid
              items={avatarSizeItems}
              value={avatarSize}
              onChange={setAvatarSize}
              columns={3}
              itemHeight="sm"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs">Link Spacing</Label>
            <SelectableGrid
              items={spacingItems}
              value={linkSpacing}
              onChange={setLinkSpacing}
              columns={3}
              itemHeight="sm"
            />
          </div>
        </div>
      </div>

      {/* Global Colors & Icon Styles */}
      <div className="space-y-4 pt-6 border-t border-white/5 animate-in fade-in duration-300">
        <h3 className="text-sm font-bold text-zinc-300 flex items-center gap-2">
          <Palette className="w-4 h-4 text-white" /> Global Colors & Icon Styles
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs">Profile Text Color (Global Text Color)</Label>
            <div className="flex gap-2">
              <div
                onClick={() => setIsTextColorPickerOpen(true)}
                className="w-12 h-12 rounded-xl border-2 border-white/15 cursor-pointer shadow-inner shrink-0 transition-transform hover:scale-105"
                style={{ backgroundColor: textColor }}
              />
              <Input
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                placeholder="#ffffff"
                className="rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-white h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs">Social Icon Border Style</Label>
            <SelectableGrid
              items={socialStyleItems}
              value={socialStyle}
              onChange={setSocialStyle}
              columns={4}
              itemHeight="sm"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-400 text-xs">Social Links Placement</Label>
            <SelectableGrid
              items={placementItems}
              value={socialPlacement}
              onChange={setSocialPlacement}
              columns={2}
              itemHeight="sm"
            />
          </div>
        </div>
      </div>
    </>
  )
}
