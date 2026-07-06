'use client'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { SelectableGrid } from '@/components/shared/SelectableGrid'

interface ButtonFontSectionProps {
  buttonShape: string
  setButtonShape: (val: string) => void
  buttonStyle: string
  setButtonStyle: (val: string) => void
  themeStyle: string
  setThemeStyle: (val: string) => void
  themeLock: boolean
  setThemeLock: (val: boolean) => void
  buttonHoverEffect: string
  setButtonHoverEffect: (val: string) => void
  fontFamily: string
  setFontFamily: (val: string) => void
  glassBlur: number[]
  setGlassBlur: (val: number[]) => void
  glassOpacity: number[]
  setGlassOpacity: (val: number[]) => void
}

const shapeItems = [
  { val: 'rounded-none', label: 'Square' },
  { val: 'rounded-xl', label: 'Rounded' },
  { val: 'rounded-3xl', label: 'Curve' },
  { val: 'rounded-full', label: 'Pill' },
  { val: 'cut-corners', label: 'Cut Corners' },
  { val: 'leaf', label: 'Leaf' },
  { val: 'hexagon', label: 'Hexagon' },
  { val: 'diamond', label: 'Diamond' },
]

const styleItems = [
  { val: 'fill', label: 'Filled' },
  { val: 'outline', label: 'Outline' },
  { val: 'soft', label: 'Soft' },
  { val: 'shadow', label: 'Shadow' },
  { val: 'neumorphism', label: 'Neumorphism' },
  { val: 'glassmorphism', label: 'Glassmorphism' },
  { val: 'neon', label: 'Neon Glow' },
  { val: 'brutalism', label: 'Brutalism' },
  { val: 'claymorphism', label: 'Claymorphism' },
]

const hoverItems = [
  { val: 'none', label: 'None' },
  { val: 'scale', label: 'Scale Up' },
  { val: 'lift', label: 'Lift & Shadow' },
  { val: 'glow', label: 'Glow' },
  { val: 'wobble', label: 'Wobble' },
  { val: 'pulse', label: 'Pulse' },
  { val: 'shine', label: 'Shine' },
  { val: 'glitch', label: 'Glitch' },
]

const fontItems = [
  { val: 'font-sans-theme', label: 'Classic Sans', preview: 'Abc', previewClass: 'font-sans-theme' },
  { val: 'font-display-theme', label: 'Jakarta Display', preview: 'Abc', previewClass: 'font-display-theme' },
  { val: 'font-serif-theme', label: 'Georgia Serif', preview: 'Abc', previewClass: 'font-serif-theme' },
  { val: 'font-mono-theme', label: 'Space Mono', preview: 'Abc', previewClass: 'font-mono-theme' },
  { val: 'font-handwriting', label: 'Caveat Hand', preview: 'Abc', previewClass: 'font-handwriting' },
  { val: 'font-comic', label: 'Comic Neue', preview: 'Abc', previewClass: 'font-comic' },
  { val: 'font-elegant', label: 'Playfair', preview: 'Abc', previewClass: 'font-elegant' },
  { val: 'font-pixel', label: '8-Bit Pixel', preview: 'Abc', previewClass: 'font-pixel' },
  { val: 'font-space', label: 'Space Grotesk', preview: 'Abc', previewClass: 'font-space' },
  { val: 'font-oswald', label: 'Oswald', preview: 'Abc', previewClass: 'font-oswald' },
  { val: 'font-righteous', label: 'Righteous', preview: 'Abc', previewClass: 'font-righteous' },
  { val: 'font-dancing', label: 'Dancing Script', preview: 'Abc', previewClass: 'font-dancing' },
]

export function ButtonFontSection({
  buttonShape, setButtonShape,
  buttonStyle, setButtonStyle,
  themeStyle, setThemeStyle,
  themeLock, setThemeLock,
  buttonHoverEffect, setButtonHoverEffect,
  fontFamily, setFontFamily,
  glassBlur, setGlassBlur,
  glassOpacity, setGlassOpacity,
}: ButtonFontSectionProps) {
  return (
    <>
      <div className="space-y-6 pt-6 border-t border-white/5">
        <div className="space-y-3">
          <Label className="text-zinc-300 font-bold text-sm">Button Shapes</Label>
          <SelectableGrid
            items={shapeItems}
            value={buttonShape}
            onChange={setButtonShape}
            columns={4}
            name="button_shape"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-zinc-300 font-bold text-sm">Button Styles</Label>
          <SelectableGrid
            items={styleItems}
            value={buttonStyle}
            onChange={setButtonStyle}
            columns={4}
            name="button_style"
          />
        </div>

        <div className="space-y-3 pt-4 border-t border-white/5">
          <Label className="text-zinc-300 font-bold text-sm flex items-center justify-between">
            <span>Glassmorphism Container Theme</span>
            <Switch
              checked={themeStyle === 'glass'}
              onCheckedChange={(checked) => setThemeStyle(checked ? 'glass' : 'solid')}
            />
          </Label>
          <p className="text-xs text-zinc-500">Enable frosted glass effect for links and containers. Works best with image backgrounds.</p>
          <input type="hidden" name="theme_style" value={themeStyle} />

          {themeStyle === 'glass' && (
            <div className="space-y-6 pt-4 px-4 pb-2 bg-white/5 rounded-xl border border-white/10 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-4">
                <Label className="text-zinc-300 text-xs">Glass Blur Effect ({glassBlur[0]}px)</Label>
                <Slider
                  value={glassBlur}
                  onValueChange={(val) => setGlassBlur(Array.isArray(val) ? val : [val])}
                  max={50}
                  step={1}
                  className="w-full [&_[role=slider]]:bg-white"
                />
              </div>
              <div className="space-y-4">
                <Label className="text-zinc-300 text-xs">Glass Background Opacity ({glassOpacity[0]}%)</Label>
                <Slider
                  value={glassOpacity}
                  onValueChange={(val) => setGlassOpacity(Array.isArray(val) ? val : [val])}
                  max={100}
                  step={1}
                  className="w-full [&_[role=slider]]:bg-white"
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3 pt-4 border-t border-white/5">
          <Label className="text-zinc-300 font-bold text-sm flex items-center justify-between">
            <span>Force Lock Theme</span>
            <Switch
              checked={themeLock}
              onCheckedChange={(checked) => setThemeLock(checked)}
            />
          </Label>
          <p className="text-xs text-zinc-500">If enabled, visitors will NOT be able to toggle Dark/Light mode on your public profile. It will lock to your exact custom styling.</p>
          <input type="hidden" name="theme_lock" value={themeLock ? 'true' : 'false'} />
        </div>

        <div className="space-y-3 pt-4 border-t border-white/5">
          <Label className="text-zinc-300 font-bold text-sm">Button Hover Animation</Label>
          <SelectableGrid
            items={hoverItems}
            value={buttonHoverEffect}
            onChange={setButtonHoverEffect}
            columns={4}
          />
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-white/5">
        <Label className="text-zinc-300 font-bold text-sm">Font Styles</Label>
        <SelectableGrid
          items={fontItems}
          value={fontFamily}
          onChange={setFontFamily}
          columns={4}
          itemHeight="lg"
          name="font_family"
        />
      </div>
    </>
  )
}
