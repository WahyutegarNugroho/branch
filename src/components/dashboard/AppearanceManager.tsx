'use client'

import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { ColorPickerDialog } from './ColorPickerDialog'
import { GradientPickerDialog } from './GradientPickerDialog'
import { ImageCropDialog } from './ImageCropDialog'
import { BackgroundConfigSection } from './BackgroundConfigSection'
import { AnimationConfigSection } from './AnimationConfigSection'
import { ButtonFontSection } from './ButtonFontSection'
import { AdvancedAppearanceSection } from './AdvancedAppearanceSection'
import { useAppearanceState } from '@/lib/hooks/useAppearanceState'
import { Loader2, Search, Lock, Undo2, Redo2 } from 'lucide-react'
import { PLATFORMS } from '@/utils/platforms'
import { usePreviewStore } from '@/lib/preview-store'
import type { Profile } from '@/types'

export function AppearanceManager({ profile }: { profile: Profile | null }) {
  const {
    infoLoading, appLoading, opacity, setOpacity,
    buttonShape, setButtonShape, buttonStyle, setButtonStyle,
    fontFamily, setFontFamily, bgColor, setBgColor, bgType, setBgType,
    fullName, setFullName, bio, setBio,
    isColorPickerOpen, setIsColorPickerOpen,
    isGradientPickerOpen, setIsGradientPickerOpen,
    socialLinks, socialLoading, socialSearch, setSocialSearch,
    bgImageUrl, avatarUrl, setAvatarUrl,
    selectedImage, isCropOpen, setIsCropOpen, cropType, setCropType,
    username, setUsername, usernameStatus,
    textColor, setTextColor, socialStyle, setSocialStyle,
    profileAlign, setProfileAlign, avatarShape, setAvatarShape,
    bannerUrl, setBannerUrl, linkSpacing, setLinkSpacing,
    avatarSize, setAvatarSize, bgVideoUrl, setBgVideoUrl,
    isTextColorPickerOpen, setIsTextColorPickerOpen,
    themeStyle, setThemeStyle, buttonHoverEffect, setButtonHoverEffect,
    layoutType, setLayoutType, bgAnimation, setBgAnimation,
    bgAnimationConfig,
    avatarFrame, setAvatarFrame, avatarFrameConfig, setAvatarFrameConfig,
    socialPlacement, setSocialPlacement, themeLock, setThemeLock,
    glassBlur, setGlassBlur, glassOpacity, setGlassOpacity,
    bannerInputRef, fileInputRef, avatarInputRef,
    hostPrefix, themes, showBranding, setShowBranding, brandingLoading,
    updateBgConfig, handleSelectTheme, onBrandingSubmit,
    handleFileChange, handleCropComplete,
    handleSocialChange, onSocialSubmit, onInfoSubmit, onAppSubmit,
  } = useAppearanceState(profile)

  const undo = usePreviewStore((s) => s.undo)
  const redo = usePreviewStore((s) => s.redo)
  const historyIndex = usePreviewStore((s) => s.historyIndex)
  const history = usePreviewStore((s) => s.history)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-end gap-1">
        <button
          type="button"
          onClick={undo}
          disabled={historyIndex < 0}
          title="Undo"
          className="p-2 rounded-xl text-zinc-500 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={redo}
          disabled={historyIndex >= history.length - 1}
          title="Redo"
          className="p-2 rounded-xl text-zinc-500 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <Redo2 className="w-4 h-4" />
        </button>
      </div>
      {/* Profile Information */}
      <Card className="rounded-2xl shadow-sm border-white/10 bg-zinc-900/50 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-xl text-white font-bold">Profile</CardTitle>
          <CardDescription className="text-zinc-400">Update your personal details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form key={`info-${profile?.updated_at || 'initial'}`} onSubmit={onInfoSubmit} className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/5 mb-6">
              <div className="relative group cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-white transition-all relative shadow-lg">
                  {avatarUrl ? (
                    <Image src={avatarUrl} alt="Avatar Preview" fill className="object-cover" sizes="96px" />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center text-zinc-500 font-semibold text-xs uppercase">No Photo</div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Change</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left space-y-2">
                <span className="text-sm font-semibold text-white block">Profile Picture</span>
                <p className="text-xs text-zinc-400 max-w-sm">Click the avatar or button below to upload your photo.</p>
                <div className="flex gap-2 justify-center sm:justify-start">
                  <Button type="button" variant="outline" onClick={() => avatarInputRef.current?.click()} className="rounded-xl border-white/10 bg-white/5 text-zinc-300 hover:text-white h-9 text-xs">Upload Photo</Button>
                  {avatarUrl && (
                    <Button type="button" variant="ghost" onClick={() => { setAvatarUrl(''); usePreviewStore.getState().updateProfile({ avatar_url: '' }) }} className="rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 h-9 text-xs">Remove</Button>
                  )}
                </div>
                <input type="file" ref={avatarInputRef} accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'avatar')} />
              </div>
            </div>

            {/* Username */}
            <div className="space-y-2 border-b border-white/5 pb-6 mb-6 font-sans-theme">
              <Label htmlFor="username" className="text-zinc-300 font-semibold">Custom Profile URL</Label>
              <div className="flex items-stretch shadow-sm rounded-xl overflow-hidden">
                <span className="bg-zinc-900/80 border border-white/10 border-r-0 rounded-l-xl px-4 flex items-center text-zinc-500 font-bold text-sm tracking-wide shrink-0 select-none font-display-theme">{hostPrefix}</span>
                <div className="relative flex-1">
                  <Input id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))} placeholder="username" required
                    className="rounded-r-xl rounded-l-none border-white/10 bg-white/5 text-white focus-visible:ring-white h-12 pl-3 pr-28 text-sm font-semibold tracking-wide w-full focus-visible:ring-offset-0 focus:border-white" />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none font-sans-theme">
                    {usernameStatus === 'checking' && <span className="text-[10px] bg-zinc-800 text-zinc-400 font-bold px-2 py-1 rounded-md animate-pulse">Checking...</span>}
                    {usernameStatus === 'available' && <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold px-2 py-1 rounded-md flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />Available</span>}
                    {usernameStatus === 'taken' && <span className="text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold px-2 py-1 rounded-md">Taken</span>}
                    {usernameStatus === 'invalid' && <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold px-2 py-1 rounded-md">Invalid</span>}
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-zinc-500 font-medium">Your unique public profile link. Only lowercase letters, numbers, underscores (_), or hyphens (-).</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-zinc-300">Full Name</Label>
              <Input id="full_name" name="full_name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jane Doe" className="rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-white h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-zinc-300">Bio</Label>
              <Textarea id="bio" name="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Write a short bio..." className="rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-white min-h-[100px]" />
            </div>
            <Button type="submit" disabled={infoLoading} className="rounded-xl bg-white hover:bg-zinc-200 text-black border-0 font-semibold h-11 px-6 shadow-lg">
              {infoLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card className="rounded-2xl shadow-sm border-white/10 bg-zinc-900/50 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-xl text-white font-bold flex items-center gap-2">🔗 Social Icons</CardTitle>
          <CardDescription className="text-zinc-400">Display beautiful social icon shortcuts horizontally below your bio.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSocialSubmit} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input type="text" placeholder="Search platforms..." value={socialSearch} onChange={(e) => setSocialSearch(e.target.value)} className="rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-white h-10 text-xs pl-9" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(() => {
                const filtered = PLATFORMS.filter(p => !socialSearch || p.name.toLowerCase().includes(socialSearch.toLowerCase()) || p.id.includes(socialSearch))
                const sorted = [...filtered].sort((a, b) => {
                  const aHas = !!socialLinks[a.id]; const bHas = !!socialLinks[b.id]
                  return aHas && !bHas ? -1 : !aHas && bHas ? 1 : a.name.localeCompare(b.name)
                })
                return sorted.map((platform) => {
                  const Icon = platform.icon
                  return (
                    <div key={platform.id} className="space-y-1.5">
                      <Label htmlFor={`social_${platform.id}`} className="text-zinc-300 flex items-center gap-1.5 text-xs font-semibold"><Icon size={14} style={{ color: platform.color }} />{platform.name}</Label>
                      <Input id={`social_${platform.id}`} value={socialLinks[platform.id] || ''} onChange={(e) => handleSocialChange(platform.id, e.target.value)} placeholder={platform.urlPrefix || `https://${platform.id}.com/`} className="rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-white h-10 text-xs" />
                    </div>
                  )
                })
              })()}
            </div>
            <Button type="submit" disabled={socialLoading} className="rounded-xl bg-white hover:bg-zinc-200 text-black border-0 font-semibold h-11 px-6 shadow-lg mt-4">
              {socialLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Social Icons'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Preset Themes Gallery */}
      <Card className="rounded-2xl shadow-sm border-white/10 bg-zinc-900/50 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-white font-display-theme font-black flex items-center gap-2">🎨 Preset Themes Gallery</CardTitle>
          <CardDescription className="text-zinc-400">Choose from professionally designed premium themes to instantly beautify your profile.</CardDescription>
        </CardHeader>
        <CardContent>
          {themes.length === 0 ? (
            <div className="flex items-center justify-center py-6 text-zinc-500 text-sm font-medium animate-pulse">Loading themes gallery...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {themes.map((theme) => {
                const isActive = bgType === theme.bg_type && bgColor === theme.bg_color && buttonShape === theme.button_shape && buttonStyle === theme.button_style && fontFamily === theme.font_family
                return (
                  <button key={theme.id} type="button" onClick={() => handleSelectTheme(theme)}
                    className={`group relative flex flex-col items-center p-3 rounded-2xl border-2 transition-all text-left overflow-hidden h-36 ${isActive ? 'border-white bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-[1.02]' : 'border-white/10 bg-zinc-950/40 hover:border-white/20 hover:scale-[1.01]'}`}>
                    <div className="w-full flex-1 rounded-xl relative overflow-hidden flex flex-col items-center justify-center p-2 gap-1.5 border border-white/5"
                      style={{ background: theme.bg_type === 'image' ? undefined : theme.bg_color, backgroundImage: theme.bg_type === 'image' ? `url(${theme.bg_image_url})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      <div className="w-5 h-5 rounded-full bg-white/25 border border-white/15" />
                      <div className={`w-14 h-2.5 border border-white/10 flex items-center justify-center ${theme.button_shape === 'rounded-full' ? 'rounded-full' : theme.button_shape === 'rounded-xl' ? 'rounded-md' : theme.button_shape === 'rounded-3xl' ? 'rounded-[10px]' : 'rounded-none'} ${theme.button_style === 'fill' ? 'bg-white/20' : theme.button_style === 'soft' ? 'bg-white/10' : theme.button_style === 'outline' ? 'bg-transparent border-white/30' : 'bg-white/20 shadow-md'}`} />
                      <div className={`w-10 h-2.5 border border-white/10 flex items-center justify-center ${theme.button_shape === 'rounded-full' ? 'rounded-full' : theme.button_shape === 'rounded-xl' ? 'rounded-md' : theme.button_shape === 'rounded-3xl' ? 'rounded-[10px]' : 'rounded-none'} ${theme.button_style === 'fill' ? 'bg-white/20' : theme.button_style === 'soft' ? 'bg-white/10' : theme.button_style === 'outline' ? 'bg-transparent border-white/30' : 'bg-white/20 shadow-md'}`} />
                    </div>
                    <div className="w-full mt-2 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-white group-hover:text-zinc-300 transition-colors truncate">{theme.name}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Appearance Configuration */}
      <Card className="rounded-2xl shadow-sm border-white/10 bg-zinc-900/50 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-xl text-white font-bold">Backgrounds</CardTitle>
          <CardDescription className="text-zinc-400">Customize the background of your Branch.</CardDescription>
        </CardHeader>
        <CardContent>
          <form key={`app-${profile?.updated_at || 'initial'}`} action={onAppSubmit} className="space-y-6">
            <BackgroundConfigSection
              bgType={bgType} setBgType={setBgType} bgColor={bgColor} setBgColor={setBgColor}
              bgImageUrl={bgImageUrl} bgVideoUrl={bgVideoUrl} setBgVideoUrl={setBgVideoUrl}
              opacity={opacity} setOpacity={setOpacity} fileInputRef={fileInputRef}
              handleFileChange={handleFileChange} setIsColorPickerOpen={setIsColorPickerOpen}
              setIsGradientPickerOpen={setIsGradientPickerOpen}
            />
            <AnimationConfigSection
              bgAnimation={bgAnimation} setBgAnimation={setBgAnimation}
              bgAnimationConfig={bgAnimationConfig} updateBgConfig={updateBgConfig}
            />
            <ButtonFontSection
              buttonShape={buttonShape} setButtonShape={setButtonShape}
              buttonStyle={buttonStyle} setButtonStyle={setButtonStyle}
              themeStyle={themeStyle} setThemeStyle={setThemeStyle}
              themeLock={themeLock} setThemeLock={setThemeLock}
              buttonHoverEffect={buttonHoverEffect} setButtonHoverEffect={setButtonHoverEffect}
              fontFamily={fontFamily} setFontFamily={setFontFamily}
              glassBlur={glassBlur} setGlassBlur={setGlassBlur}
              glassOpacity={glassOpacity} setGlassOpacity={setGlassOpacity}
            />
            <AdvancedAppearanceSection
              bannerUrl={bannerUrl} setBannerUrl={setBannerUrl}
              bannerInputRef={bannerInputRef} handleFileChange={handleFileChange}
              setCropType={setCropType} profileAlign={profileAlign} setProfileAlign={setProfileAlign}
              layoutType={layoutType} setLayoutType={setLayoutType}
              avatarShape={avatarShape} setAvatarShape={setAvatarShape}
              avatarFrame={avatarFrame} setAvatarFrame={setAvatarFrame}
              avatarFrameConfig={avatarFrameConfig as Record<string, string | undefined>}
              setAvatarFrameConfig={setAvatarFrameConfig as (val: Record<string, string | undefined>) => void}
              avatarSize={avatarSize} setAvatarSize={setAvatarSize}
              linkSpacing={linkSpacing} setLinkSpacing={setLinkSpacing}
              textColor={textColor} setTextColor={setTextColor}
              setIsTextColorPickerOpen={setIsTextColorPickerOpen}
              socialStyle={socialStyle} setSocialStyle={setSocialStyle}
              socialPlacement={socialPlacement} setSocialPlacement={setSocialPlacement}
            />
            <Button type="submit" disabled={appLoading} className="rounded-xl bg-white hover:bg-zinc-200 text-black border-0 font-semibold h-11 px-6 shadow-lg">
              {appLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Appearance'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Branding Settings */}
      <Card className="rounded-2xl shadow-sm border-white/10 bg-zinc-900/50 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-white font-display-theme font-black flex items-center gap-2">🏷️ White-label Branding</CardTitle>
          <CardDescription className="text-zinc-400">Hide the &quot;Powered by Branch&quot; branding from your profile page.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onBrandingSubmit} className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-zinc-950/40 border border-white/5 rounded-2xl">
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  {profile?.plan !== 'premium' && <Lock className="h-3.5 w-3.5 text-zinc-500" />}
                  Show Branch Branding
                </span>
                <p className="text-[11px] text-zinc-400 max-w-sm">
                  {profile?.plan === 'premium' ? 'Turn off this option to hide the Branch branding.' : 'Upgrade to premium to hide the Branch branding.'}
                </p>
              </div>
              <Switch id="show_branding" checked={showBranding} onCheckedChange={setShowBranding} disabled={profile?.plan !== 'premium'} className="data-[state=checked]:bg-white" />
            </div>
            <Button type="submit" disabled={brandingLoading} className="rounded-xl bg-white hover:bg-zinc-200 text-black border-0 font-semibold h-11 px-6 shadow-lg">
              {brandingLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Branding'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <ColorPickerDialog isOpen={isColorPickerOpen} onClose={() => setIsColorPickerOpen(false)} initialColor={bgColor}
        onSelectColor={(color) => { setBgColor(color); setBgType('solid') }} />
      <GradientPickerDialog isOpen={isGradientPickerOpen} onClose={() => setIsGradientPickerOpen(false)} initialGradient={bgColor}
        onSelectGradient={(gradient) => { setBgColor(gradient); setBgType('gradient') }} />
      <ColorPickerDialog isOpen={isTextColorPickerOpen} onClose={() => setIsTextColorPickerOpen(false)} initialColor={textColor}
        onSelectColor={(color) => setTextColor(color)} />
      {selectedImage && (
        <ImageCropDialog isOpen={isCropOpen} onClose={() => setIsCropOpen(false)} imageUrl={selectedImage}
          onCropComplete={handleCropComplete} cropShape={cropType === 'avatar' ? 'circle' : 'rect'} />
      )}
    </div>
  )
}
