'use client'

import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

export function LinkDesignSettings({
  linkId,
  linkType,
  isSpotlight,
  setIsSpotlight,
  spotlightColor,
  setSpotlightColor,
  animation,
  setAnimation,
  customStyleEnabled,
  setCustomStyleEnabled,
  bgColor,
  setBgColor,
  textColor,
  setTextColor,
  bgOpacity,
  setBgOpacity,
  iconColorMode,
  setIconColorMode,
  iconColor,
  setIconColor,
  thumbnailUrl,
  setThumbnailUrl,
  iconPosition,
  setIconPosition,
  loading,
  handleApplyToAll,
  isStickyCta,
  setIsStickyCta
}: {
  linkId: string
  linkType: string
  isSpotlight: boolean
  setIsSpotlight: (val: boolean) => void
  spotlightColor: string
  setSpotlightColor: (val: string) => void
  animation: string
  setAnimation: (val: string) => void
  customStyleEnabled: boolean
  setCustomStyleEnabled: (val: boolean) => void
  bgColor: string
  setBgColor: (val: string) => void
  textColor: string
  setTextColor: (val: string) => void
  bgOpacity: number
  setBgOpacity: (val: number) => void
  iconColorMode: 'original' | 'text' | 'custom'
  setIconColorMode: (val: 'original' | 'text' | 'custom') => void
  iconColor: string
  setIconColor: (val: string) => void
  thumbnailUrl: string
  setThumbnailUrl: (val: string) => void
  iconPosition: string
  setIconPosition: (val: string) => void
  isStickyCta?: boolean
  setIsStickyCta?: (val: boolean) => void
  loading: boolean
  handleApplyToAll: () => void
}) {
  return (
    <>
      <input type="hidden" name="is_spotlight" value={isSpotlight ? 'on' : 'off'} />
      <input type="hidden" name="spotlight_color" value={spotlightColor} />

      {linkType === 'link' && (
        <>
          <div className="p-4 bg-zinc-950/40 border border-white/5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  ⭐ Priority / Spotlight Link
                </span>
                <p className="text-[10px] text-zinc-400 max-w-[280px]">
                  Highlight this link with a special glowing effect.
                </p>
              </div>
              <Switch checked={isSpotlight} onCheckedChange={setIsSpotlight} />
            </div>

            {isSpotlight && (
              <div className="space-y-2 pt-2 border-t border-white/5 animate-in fade-in slide-in-from-top-1 duration-200">
                <span className="text-xs text-zinc-400">Choose Spotlight Color:</span>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl border border-white/10 overflow-hidden shrink-0 relative">
                    <input 
                      type="color" 
                      value={spotlightColor} 
                      onChange={(e) => setSpotlightColor(e.target.value)} 
                      className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer bg-transparent scale-150" 
                    />
                  </div>
                  <Input 
                    type="text" 
                    value={spotlightColor} 
                    onChange={(e) => setSpotlightColor(e.target.value)} 
                    maxLength={7}
                    className="font-mono rounded-xl border-white/10 bg-white/5 text-white h-10 text-sm focus-visible:ring-brand-pink w-32" 
                  />
                </div>
              </div>
            )}

            <div className="space-y-2 pt-2 border-t border-white/5">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                ✨ Animation Effect
              </span>
              <p className="text-[10px] text-zinc-400">
                Choose a movement effect to subtly attract visitors&apos; eyes.
              </p>
              <select
                name="animation"
                value={animation}
                onChange={(e) => setAnimation(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900 text-white h-10 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-pink"
              >
                <option value="none">No Animation</option>
                <option value="pulse">Pulse (Slow Pulse)</option>
                <option value="bounce">Bounce</option>
                <option value="shake">Shake</option>
                <option value="wobble">Wobble</option>
                <option value="glow">Glow</option>
              </select>
            </div>

            {/* Sticky CTA (Link only) */}
            {setIsStickyCta && (
              <div className="space-y-2 pt-2 border-t border-white/5 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    📌 Sticky Footer CTA
                  </span>
                  <p className="text-[10px] text-zinc-400 max-w-[280px]">
                    Pin this link to the bottom of the screen so it&apos;s always visible when scrolling.
                  </p>
                </div>
                <Switch checked={isStickyCta} onCheckedChange={setIsStickyCta} />
                <input type="hidden" name="is_sticky_cta" value={isStickyCta ? 'on' : 'off'} />
              </div>
            )}
          </div>
        </>
      )}

      {/* Custom Theme Section */}
      <div className="bg-zinc-950/40 border border-white/5 p-4 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch 
              id={`custom_style_${linkId}`} 
              checked={customStyleEnabled} 
              onCheckedChange={setCustomStyleEnabled} 
              className="data-[state=checked]:bg-brand-pink"
            />
            <label htmlFor={`custom_style_${linkId}`} className="text-sm font-bold text-white cursor-pointer flex items-center gap-1.5">
              🎨 Custom Button Style
            </label>
          </div>

          {customStyleEnabled && (
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              onClick={handleApplyToAll}
              disabled={loading}
              className="text-xs text-brand-pink hover:text-brand-orange hover:bg-white/5 rounded-xl font-bold transition-all px-2.5 h-8 border border-brand-pink/20"
            >
              Apply to All
            </Button>
          )}
        </div>

        {customStyleEnabled && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Background Color */}
            <div className="space-y-1.5">
              <span className="text-xs text-zinc-400">Background Color:</span>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl border border-white/10 overflow-hidden shrink-0 relative">
                  <input 
                    type="color" 
                    value={bgColor} 
                    onChange={(e) => setBgColor(e.target.value)} 
                    className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer bg-transparent scale-150" 
                  />
                </div>
                <Input 
                  type="text" 
                  value={bgColor} 
                  onChange={(e) => setBgColor(e.target.value)} 
                  maxLength={7}
                  className="font-mono rounded-xl border-white/10 bg-white/5 text-white h-10 text-sm focus-visible:ring-brand-pink" 
                />
                <input type="hidden" name="bg_color" value={bgColor} />
              </div>
            </div>

            {/* Text Color */}
            <div className="space-y-1.5">
              <span className="text-xs text-zinc-400">Text & Icon Color:</span>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl border border-white/10 overflow-hidden shrink-0 relative">
                  <input 
                    type="color" 
                    value={textColor} 
                    onChange={(e) => setTextColor(e.target.value)} 
                    className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer bg-transparent scale-150" 
                  />
                </div>
                <Input 
                  type="text" 
                  value={textColor} 
                  onChange={(e) => setTextColor(e.target.value)} 
                  maxLength={7}
                  className="font-mono rounded-xl border-white/10 bg-white/5 text-white h-10 text-sm focus-visible:ring-brand-pink" 
                />
                <input type="hidden" name="text_color" value={textColor} />
              </div>
            </div>

            {/* Background Opacity Slider */}
            <div className="sm:col-span-2 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-400">Button Opacity:</span>
                <span className="text-xs font-bold text-white font-mono">{bgOpacity}%</span>
              </div>
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={bgOpacity} 
                  onChange={(e) => setBgOpacity(parseInt(e.target.value, 10))} 
                  className="flex-1 accent-brand-pink h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
                <input type="hidden" name="bg_opacity" value={bgOpacity} />
              </div>
            </div>

            {/* Logo Color Mode Options */}
            {linkType === 'link' && (
              <div className="sm:col-span-2 space-y-1.5 pt-2 border-t border-white/5">
                <span className="text-xs text-zinc-400">Logo Color Mode:</span>
                <div className="flex bg-zinc-950 p-1 rounded-xl border border-white/10 w-fit">
                  <button
                    type="button"
                    onClick={() => setIconColorMode('original')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      iconColorMode === 'original'
                        ? 'bg-brand-pink text-white shadow'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Original
                  </button>
                  <button
                    type="button"
                    onClick={() => setIconColorMode('text')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      iconColorMode === 'text'
                        ? 'bg-brand-pink text-white shadow'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Same as Text
                  </button>
                  <button
                    type="button"
                    onClick={() => setIconColorMode('custom')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      iconColorMode === 'custom'
                        ? 'bg-brand-pink text-white shadow'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Custom Color
                  </button>
                </div>
                <input 
                  type="hidden" 
                  name="icon_color" 
                  value={iconColorMode === 'original' ? '' : iconColorMode === 'text' ? 'text' : iconColor} 
                />
              </div>
            )}

            {linkType === 'link' && iconColorMode === 'custom' && (
              <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                <span className="text-xs text-zinc-400">Custom Logo Color:</span>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl border border-white/10 overflow-hidden shrink-0 relative">
                    <input 
                      type="color" 
                      value={iconColor} 
                      onChange={(e) => setIconColor(e.target.value)} 
                      className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer bg-transparent scale-150" 
                    />
                  </div>
                  <Input 
                    type="text" 
                    value={iconColor} 
                    onChange={(e) => setIconColor(e.target.value)} 
                    maxLength={7}
                    className="font-mono rounded-xl border-white/10 bg-white/5 text-white h-10 text-sm focus-visible:ring-brand-pink w-32" 
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Thumbnail & Icon Position Config */}
        {linkType === 'link' && (
          <div className="pt-4 mt-2 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-white block">Custom Thumbnail URL</span>
              <Input 
                type="url" 
                name="thumbnail_url"
                value={thumbnailUrl} 
                onChange={(e) => setThumbnailUrl(e.target.value)} 
                placeholder="https://example.com/icon.png" 
                className="rounded-xl border-white/10 bg-white/5 text-white h-10 text-sm focus-visible:ring-brand-pink" 
              />
              <p className="text-[10px] text-zinc-400">Overrides the default platform logo if provided.</p>
            </div>
            
            <div className="space-y-2">
              <span className="text-xs font-bold text-white block">Icon Position</span>
              <select 
                name="icon_position"
                value={iconPosition}
                onChange={(e) => setIconPosition(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900 text-white h-10 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-pink"
              >
                <option value="left_far">Far Left</option>
                <option value="left_near">Near Left (Next to Text)</option>
                <option value="right_far">Far Right</option>
                <option value="right_near">Near Right (Next to Text)</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
