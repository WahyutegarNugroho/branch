'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { updateAppearance, updateProfileInfo, updateSocialLinks, updateBranding } from '@/app/actions/profile-actions'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { Loader2, AlignLeft, AlignCenter, Palette, LayoutGrid, Image as ImageIcon, Video, Sparkles, Sliders } from 'lucide-react'
import { 
  FaInstagram, 
  FaYoutube, 
  FaGithub, 
  FaLinkedin, 
  FaWhatsapp, 
  FaTiktok, 
  FaEnvelope 
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const socialsList: Record<string, { label: string, icon: any, placeholder: string }> = {
  instagram: { label: 'Instagram', icon: FaInstagram, placeholder: 'https://instagram.com/username' },
  twitter: { label: 'Twitter / X', icon: FaXTwitter, placeholder: 'https://twitter.com/username' },
  tiktok: { label: 'TikTok', icon: FaTiktok, placeholder: 'https://tiktok.com/@username' },
  youtube: { label: 'YouTube', icon: FaYoutube, placeholder: 'https://youtube.com/@channel' },
  github: { label: 'GitHub', icon: FaGithub, placeholder: 'https://github.com/username' },
  linkedin: { label: 'LinkedIn', icon: FaLinkedin, placeholder: 'https://linkedin.com/in/username' },
  whatsapp: { label: 'WhatsApp', icon: FaWhatsapp, placeholder: 'https://wa.me/628...' },
  email: { label: 'Email', icon: FaEnvelope, placeholder: 'mailto:email@example.com' },
}
import Image from 'next/image'
import { ColorPickerDialog } from './ColorPickerDialog'
import { GradientPickerDialog } from './GradientPickerDialog'
import { ImageCropDialog } from './ImageCropDialog'
import { createClient } from '@/utils/supabase/client'
import { useRef } from 'react'

import { Profile } from '@/types'
import { usernameBlacklist } from '@/lib/validations'

export function AppearanceManager({ profile }: { profile: Profile | null }) {
  const router = useRouter()
  const [infoLoading, setInfoLoading] = useState(false)
  const [appLoading, setAppLoading] = useState(false)
  const [opacity, setOpacity] = useState([profile?.bg_overlay_opacity || 0])
  const [buttonShape, setButtonShape] = useState(profile?.button_shape || 'rounded-2xl')
  const [buttonStyle, setButtonStyle] = useState(profile?.button_style || 'soft')
  const [fontFamily, setFontFamily] = useState(profile?.font_family || 'font-sans-theme')
  const [bgColor, setBgColor] = useState(profile?.bg_color || '#09090b')
  const [bgType, setBgType] = useState<'solid' | 'gradient' | 'image' | 'video'>(profile?.bg_type || 'solid')
  const [fullName, setFullName] = useState(profile?.full_name ?? '')
  const [bio, setBio] = useState(profile?.bio ?? '')
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  const [isGradientPickerOpen, setIsGradientPickerOpen] = useState(false)
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>(
    profile?.social_links && typeof profile.social_links === 'object' 
      ? profile.social_links 
      : {}
  )
  const [socialLoading, setSocialLoading] = useState(false)

  // Image Upload and Crop States
  const [bgImageUrl, setBgImageUrl] = useState(profile?.bg_image_url || '')
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isCropOpen, setIsCropOpen] = useState(false)
  const [cropType, setCropType] = useState<'avatar' | 'bg' | 'banner'>('bg')
  const [username, setUsername] = useState(profile?.username ?? '')
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'invalid'>('idle')

  const [textColor, setTextColor] = useState(profile?.text_color || '#ffffff')
  const [socialStyle, setSocialStyle] = useState(profile?.social_style || 'circle')
  const [profileAlign, setProfileAlign] = useState(profile?.profile_align || 'center')
  const [avatarShape, setAvatarShape] = useState(profile?.avatar_shape || 'circle')
  const [bannerUrl, setBannerUrl] = useState(profile?.banner_url || '')
  const [linkSpacing, setLinkSpacing] = useState(profile?.link_spacing || 'normal')
  const [avatarSize, setAvatarSize] = useState(profile?.avatar_size || 'medium')
  const [bgVideoUrl, setBgVideoUrl] = useState(profile?.bg_video_url || '')
  const [isTextColorPickerOpen, setIsTextColorPickerOpen] = useState(false)
  const [themeStyle, setThemeStyle] = useState(profile?.theme_style || 'solid')
  const [buttonHoverEffect, setButtonHoverEffect] = useState(profile?.button_hover_effect || 'none')
  const [layoutType, setLayoutType] = useState(profile?.layout_type || 'list')
  const [bgAnimation, setBgAnimation] = useState(profile?.bg_animation || 'none')
  const [avatarFrame, setAvatarFrame] = useState(profile?.avatar_frame || 'none')
  const [socialPlacement, setSocialPlacement] = useState(profile?.social_placement || 'top')
  const [themeLock, setThemeLock] = useState(profile?.theme_lock || false)

  const bannerInputRef = useRef<HTMLInputElement>(null)

  const [hostPrefix, setHostPrefix] = useState('branch.app/')
  const [themes, setThemes] = useState<any[]>([])
  const [showBranding, setShowBranding] = useState(profile?.show_branding !== false)
  const [brandingLoading, setBrandingLoading] = useState(false)

  useEffect(() => {
    setHostPrefix(`${window.location.host}/`)
  }, [])

  useEffect(() => {
    if (!username || username === profile?.username) {
      setUsernameStatus('idle')
      return
    }

    const usernameRegex = /^[a-z0-9_-]+$/
    if (!usernameRegex.test(username) || username.length < 3 || username.length > 30) {
      setUsernameStatus('invalid')
      return
    }

    if (usernameBlacklist.includes(username.toLowerCase())) {
      setUsernameStatus('taken')
      return
    }

    setUsernameStatus('checking')
    const delayDebounce = setTimeout(async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('profiles')
          .select('id')
          .eq('username', username.toLowerCase())
          .maybeSingle()

        if (error) throw error

        if (data) {
          setUsernameStatus('taken')
        } else {
          setUsernameStatus('available')
        }
      } catch (e) {
        console.error('Error checking username:', e)
        setUsernameStatus('idle')
      }
    }, 400)

    return () => clearTimeout(delayDebounce)
  }, [username, profile?.username])

  // Load themes from Supabase dynamically
  useEffect(() => {
    async function fetchThemes() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('themes')
          .select('*')
          .order('name', { ascending: true })
        if (error) throw error
        if (data) setThemes(data)
      } catch (err) {
        console.error('Error fetching themes:', err)
      }
    }
    fetchThemes()
  }, [])

  const handleSelectTheme = (theme: any) => {
    setBgType(theme.bg_type)
    setBgColor(theme.bg_color)
    setBgImageUrl(theme.bg_image_url || '')
    setButtonShape(theme.button_shape)
    setButtonStyle(theme.button_style)
    setFontFamily(theme.font_family)
    
    // Live update dispatch to preview
    window.dispatchEvent(new CustomEvent('profile-update', {
      detail: {
        bg_type: theme.bg_type,
        bg_color: theme.bg_color,
        bg_image_url: theme.bg_image_url || '',
        button_shape: theme.button_shape,
        button_style: theme.button_style,
        font_family: theme.font_family,
        theme_style: themeStyle,
        button_hover_effect: buttonHoverEffect,
        layout_type: layoutType,
        bg_animation: bgAnimation,
        avatar_frame: avatarFrame,
        social_placement: socialPlacement,
        theme_lock: themeLock
      }
    }))
    
    toast.success(`Theme "${theme.name}" applied to preview! Click "Save Appearance" below to save it to your public profile.`)
  }

  async function onBrandingSubmit(e: React.FormEvent) {
    e.preventDefault()
    setBrandingLoading(true)
    const result = await updateBranding(showBranding)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Branding settings updated successfully!')
      router.refresh()
    }
    setBrandingLoading(false)
  }
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const avatarInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'bg' | 'banner' = 'bg') => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Maximum image size is 5MB!')
      return
    }

    setCropType(type)

    const reader = new FileReader()
    reader.onload = () => {
      setSelectedImage(reader.result as string)
      setIsCropOpen(true)
    }
    reader.readAsDataURL(file)
    e.target.value = '' // Reset input
  }

  const handleCropComplete = async (croppedBlob: Blob) => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast.error('You must be logged in first!')
        return
      }

      const isAvatar = cropType === 'avatar'
      const isBanner = cropType === 'banner'
      const prefix = isAvatar ? 'avatar' : isBanner ? 'banner' : 'bg'
      const fileName = `${user.id}/${prefix}_${Date.now()}.jpg`
      const file = new File([croppedBlob], `${prefix}_${Date.now()}.jpg`, { type: 'image/jpeg' })
      const bucketName = isAvatar ? 'avatars' : 'backgrounds'

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file)

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName)

      if (isAvatar) {
        setAvatarUrl(publicUrl)
        setIsCropOpen(false)
        toast.success('Profile photo cropped successfully!')

        // Sync immediately to virtual smartphone preview
        window.dispatchEvent(new CustomEvent('profile-update', {
          detail: {
            avatar_url: publicUrl
          }
        }))
      } else if (isBanner) {
        setBannerUrl(publicUrl)
        setIsCropOpen(false)
        toast.success('Hero banner cropped successfully!')

        // Sync immediately to virtual smartphone preview
        window.dispatchEvent(new CustomEvent('profile-update', {
          detail: {
            banner_url: publicUrl
          }
        }))
      } else {
        setBgImageUrl(publicUrl)
        setBgType('image')
        setIsCropOpen(false)
        toast.success('Background image cropped successfully!')

        // Sync immediately to virtual smartphone preview
        window.dispatchEvent(new CustomEvent('profile-update', {
          detail: {
            bg_type: 'image',
            bg_image_url: publicUrl,
            bg_overlay_opacity: opacity[0]
          }
        }))
      }
    } catch (err: any) {
      console.error('Error uploading image:', err)
      toast.error(`Failed to upload image: ${err.message}`)
    }
  }

  // Sync background customization to live preview in real time
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('profile-update', {
        detail: {
          bg_color: bgColor,
          bg_type: bgType,
          bg_image_url: bgImageUrl,
          bg_overlay_opacity: opacity[0],
          bg_video_url: bgVideoUrl
        }
      }))
    }, 50)
    return () => clearTimeout(timer)
  }, [bgColor, bgType, bgImageUrl, opacity, bgVideoUrl])

  // Sync profile text inputs to live preview in real time
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('profile-update', {
        detail: {
          full_name: fullName,
          bio: bio,
          avatar_url: avatarUrl
        }
      }))
    }, 50)
    return () => clearTimeout(timer)
  }, [fullName, bio, avatarUrl])

  // Sync social links to live preview in real time
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('profile-update', {
        detail: {
          social_links: socialLinks
        }
      }))
    }, 50)
    return () => clearTimeout(timer)
  }, [socialLinks])

  // Sync button shape, style & font family to live preview in real time
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('profile-update', {
        detail: {
          button_shape: buttonShape,
          button_style: buttonStyle,
          font_family: fontFamily,
          text_color: textColor,
          social_style: socialStyle,
          profile_align: profileAlign,
          avatar_shape: avatarShape,
          banner_url: bannerUrl,
          link_spacing: linkSpacing,
          avatar_size: avatarSize,
          theme_style: themeStyle,
          button_hover_effect: buttonHoverEffect,
          layout_type: layoutType,
          bg_animation: bgAnimation,
          avatar_frame: avatarFrame,
          social_placement: socialPlacement,
          theme_lock: themeLock
        }
      }))
    }, 50)
    return () => clearTimeout(timer)
  }, [buttonShape, buttonStyle, fontFamily, textColor, socialStyle, profileAlign, avatarShape, bannerUrl, linkSpacing, avatarSize, themeStyle, buttonHoverEffect, layoutType, bgAnimation, avatarFrame, socialPlacement, themeLock])

  const handleSocialChange = (key: string, val: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [key]: val
    }))
  }

  async function onSocialSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSocialLoading(true)
    const result = await updateSocialLinks(socialLinks)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Social icons updated successfully')
      router.refresh()
    }
    setSocialLoading(false)
  }

  async function onInfoSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setInfoLoading(true)

    if (usernameStatus === 'taken') {
      toast.error('Username is already taken by someone else!')
      setInfoLoading(false)
      return
    }
    if (usernameStatus === 'invalid') {
      toast.error('Invalid username!')
      setInfoLoading(false)
      return
    }

    const formData = new FormData(e.currentTarget)
    formData.append('avatar_url', avatarUrl)
    formData.append('username', username)

    const result = await updateProfileInfo(formData)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Profile information updated successfully!')
      if (username !== profile?.username) {
        toast.info('Your username was changed, syncing dashboard...')
        router.push('/dashboard')
      } else {
        router.refresh()
      }
    }
    setInfoLoading(false)
  }

  async function onAppSubmit(formData: FormData) {
    setAppLoading(true)
    const opacityValue = opacity?.[0] ?? profile?.bg_overlay_opacity ?? 0
    formData.append('bg_overlay_opacity', opacityValue.toString())
    formData.set('bg_color', bgColor) // Ensure latest bgColor state is used
    formData.set('bg_type', bgType)   // Force latest controlled bgType state to be used
    formData.set('bg_image_url', bgImageUrl) // Ensure latest uploaded image URL is used
    
    // Phase 4 additions
    formData.set('text_color', textColor)
    formData.set('social_style', socialStyle)
    formData.set('profile_align', profileAlign)
    formData.set('avatar_shape', avatarShape)
    formData.set('banner_url', bannerUrl)
    formData.set('link_spacing', linkSpacing)
    formData.set('avatar_size', avatarSize)
    formData.set('bg_video_url', bgVideoUrl)
    formData.set('theme_style', themeStyle)
    formData.set('button_hover_effect', buttonHoverEffect)
    formData.set('layout_type', layoutType)
    formData.set('bg_animation', bgAnimation)
    formData.set('avatar_frame', avatarFrame)
    formData.set('social_placement', socialPlacement)
    formData.set('theme_lock', themeLock ? 'true' : 'false')

    const result = await updateAppearance(formData)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Appearance updated successfully')
      router.refresh() // Refresh server layout data
    }
    setAppLoading(false)
  }

  return (
    <div className="space-y-8">
      {/* Profile Information */}
      <Card className="rounded-2xl shadow-sm border-white/10 bg-zinc-900/50 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-xl text-white font-bold">Profile</CardTitle>
          <CardDescription className="text-zinc-400">Update your personal details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form key={`info-${profile?.updated_at || 'initial'}`} onSubmit={onInfoSubmit} className="space-y-6">
            {/* Avatar Upload Container */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/5 mb-6">
              <div className="relative group cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-brand-pink transition-all relative shadow-lg">
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
                        window.dispatchEvent(new CustomEvent('profile-update', {
                          detail: { avatar_url: '' }
                        }))
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

            {/* Username / Custom Link Edit */}
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
                    className="rounded-r-xl rounded-l-none border-white/10 bg-white/5 text-white focus-visible:ring-brand-pink h-12 pl-3 pr-28 text-sm font-semibold tracking-wide w-full focus-visible:ring-offset-0 focus:border-brand-pink"
                  />
                  
                  {/* Real-time Status Badge inside input */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none font-sans-theme">
                    {usernameStatus === 'checking' && (
                      <span className="text-[10px] bg-zinc-800 text-zinc-400 font-bold px-2 py-1 rounded-md animate-pulse">
                        Checking...
                      </span>
                    )}
                    {usernameStatus === 'available' && (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold px-2 py-1 rounded-md flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                        Available
                      </span>
                    )}
                    {usernameStatus === 'taken' && (
                      <span className="text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold px-2 py-1 rounded-md">
                        Taken
                      </span>
                    )}
                    {usernameStatus === 'invalid' && (
                      <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold px-2 py-1 rounded-md">
                        Invalid
                      </span>
                    )}
                  </div>
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
                className="rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-brand-pink h-12"
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
                className="rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-brand-pink min-h-[100px]"
              />
            </div>
            <Button type="submit" disabled={infoLoading} className="rounded-xl bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-90 text-white border-0 font-semibold h-11 px-6 shadow-lg">
              {infoLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Social Links Card */}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(socialsList).map((key) => {
                const item = socialsList[key]
                const Icon = item.icon
                return (
                  <div key={key} className="space-y-1.5">
                    <Label htmlFor={`social_${key}`} className="text-zinc-300 flex items-center gap-1.5 text-xs font-semibold">
                      <Icon size={14} className="text-zinc-400" />
                      {item.label}
                    </Label>
                    <Input
                      id={`social_${key}`}
                      value={socialLinks[key] || ''}
                      onChange={(e) => handleSocialChange(key, e.target.value)}
                      placeholder={item.placeholder}
                      className="rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-brand-pink h-10 text-xs"
                    />
                  </div>
                )
              })}
            </div>
            <Button type="submit" disabled={socialLoading} className="rounded-xl bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-90 text-white border-0 font-semibold h-11 px-6 shadow-lg mt-4">
              {socialLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Social Icons'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Preset Themes Gallery */}
      <Card className="rounded-2xl shadow-sm border-white/10 bg-zinc-900/50 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-white font-display-theme font-black flex items-center gap-2">
            🎨 Preset Themes Gallery
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Choose from professionally designed premium themes to instantly beautify your profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {themes.length === 0 ? (
            <div className="flex items-center justify-center py-6 text-zinc-500 text-sm font-medium animate-pulse">
              Loading themes gallery...
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {themes.map((theme) => {
                let previewBg = theme.bg_color
                const isActive = 
                  bgType === theme.bg_type &&
                  bgColor === theme.bg_color &&
                  buttonShape === theme.button_shape &&
                  buttonStyle === theme.button_style &&
                  fontFamily === theme.font_family

                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => handleSelectTheme(theme)}
                    className={`group relative flex flex-col items-center p-3 rounded-2xl border-2 transition-all text-left overflow-hidden h-36 ${
                      isActive 
                        ? 'border-brand-pink bg-brand-pink/5 shadow-[0_0_20px_rgba(236,72,153,0.15)] scale-[1.02]' 
                        : 'border-white/10 bg-zinc-950/40 hover:border-white/20 hover:scale-[1.01]'
                    }`}
                  >
                    {/* Visual Card Preview mimicking page appearance */}
                    <div 
                      className="w-full flex-1 rounded-xl relative overflow-hidden flex flex-col items-center justify-center p-2 gap-1.5 border border-white/5"
                      style={{ 
                        background: theme.bg_type === 'image' ? undefined : previewBg,
                        backgroundImage: theme.bg_type === 'image' ? `url(${theme.bg_image_url})` : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      {/* Fake Avatar */}
                      <div className="w-5 h-5 rounded-full bg-white/25 border border-white/15" />
                      
                      {/* Fake Buttons based on theme parameters */}
                      <div 
                        className={`w-14 h-2.5 border border-white/10 flex items-center justify-center ${
                          theme.button_shape === 'rounded-full' ? 'rounded-full' :
                          theme.button_shape === 'rounded-xl' ? 'rounded-md' :
                          theme.button_shape === 'rounded-3xl' ? 'rounded-[10px]' : 'rounded-none'
                        } ${
                          theme.button_style === 'fill' ? 'bg-white/20' :
                          theme.button_style === 'soft' ? 'bg-white/10' :
                          theme.button_style === 'outline' ? 'bg-transparent border-white/30' : 'bg-white/20 shadow-md'
                        }`}
                      />
                      <div 
                        className={`w-10 h-2.5 border border-white/10 flex items-center justify-center ${
                          theme.button_shape === 'rounded-full' ? 'rounded-full' :
                          theme.button_shape === 'rounded-xl' ? 'rounded-md' :
                          theme.button_shape === 'rounded-3xl' ? 'rounded-[10px]' : 'rounded-none'
                        } ${
                          theme.button_style === 'fill' ? 'bg-white/20' :
                          theme.button_style === 'soft' ? 'bg-white/10' :
                          theme.button_style === 'outline' ? 'bg-transparent border-white/30' : 'bg-white/20 shadow-md'
                        }`}
                      />
                    </div>
                    <div className="w-full mt-2 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-white group-hover:text-brand-pink transition-colors truncate">
                        {theme.name}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-pink shrink-0" />
                      )}
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="cursor-pointer" onClick={() => { setBgType('solid'); setIsColorPickerOpen(true); }}>
                <input type="radio" name="bg_type" value="solid" checked={bgType === 'solid'} onChange={() => setBgType('solid')} id="bg_type_solid" className="peer sr-only" />
                <div className={`h-24 rounded-2xl border-2 ${bgType === 'solid' ? 'border-brand-pink' : 'border-white/10'} flex flex-col items-center justify-center bg-white/5 transition-all relative overflow-hidden`}>
                  <span className="font-semibold text-zinc-300 relative z-10">Solid</span>
                  <div className="w-5 h-5 rounded-full border border-white/20 mt-2 relative z-10 shadow-sm" style={{ backgroundColor: bgType === 'solid' ? bgColor : '#09090b' }} />
                </div>
              </div>
              <div className="cursor-pointer" onClick={() => { setBgType('gradient'); setIsGradientPickerOpen(true); }}>
                <input type="radio" name="bg_type" value="gradient" checked={bgType === 'gradient'} onChange={() => setBgType('gradient')} id="bg_type_gradient" className="peer sr-only" />
                <div 
                  className={`h-24 rounded-2xl border-2 ${bgType === 'gradient' ? 'border-brand-pink' : 'border-white/10'} flex flex-col items-center justify-center transition-all relative overflow-hidden`}
                  style={{ background: bgColor.includes('gradient') ? bgColor : 'linear-gradient(to bottom, var(--color-brand-pink), var(--color-brand-orange))' }}
                >
                  <span className="font-semibold text-white drop-shadow-md relative z-10">Gradient</span>
                </div>
              </div>
              <div className="cursor-pointer" onClick={() => { setBgType('image'); fileInputRef.current?.click(); }}>
                <input type="radio" name="bg_type" value="image" checked={bgType === 'image'} onChange={() => setBgType('image')} id="bg_type_image" className="peer sr-only" />
                <div 
                  className={`h-24 rounded-2xl border-2 ${bgType === 'image' ? 'border-brand-pink' : 'border-white/10'} flex items-center justify-center bg-cover bg-center transition-all relative overflow-hidden`}
                  style={{ backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : `url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=300&auto=format&fit=crop')` }}
                >
                  {/* Subtle dark overlay to ensure "Image" label is highly legible */}
                  <div className="absolute inset-0 bg-black/40" />
                  <span className="font-semibold text-white drop-shadow-md relative z-10">Image</span>
                </div>
              </div>
              <div className="cursor-pointer" onClick={() => { setBgType('video'); }}>
                <input type="radio" name="bg_type" value="video" checked={bgType === 'video'} onChange={() => setBgType('video')} id="bg_type_video" className="peer sr-only" />
                <div className={`h-24 rounded-2xl border-2 ${bgType === 'video' ? 'border-brand-pink' : 'border-white/10'} flex flex-col items-center justify-center bg-white/5 transition-all relative overflow-hidden`}>
                  <Video className="w-5 h-5 text-zinc-400 mb-1 relative z-10" />
                  <span className="font-semibold text-zinc-300 relative z-10">Video</span>
                </div>
              </div>
            </div>

            {/* Hidden image file uploader input */}
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
                className="rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-brand-pink h-12"
              />
            </div>

            {bgType === 'video' && (
              <div className="space-y-2 animate-in fade-in duration-200">
                <Label htmlFor="bg_video_url" className="text-zinc-300 flex items-center gap-2">
                  <Video className="w-4 h-4 text-brand-pink" /> Background Video URL (MP4, YouTube, etc.)
                </Label>
                <Input
                  id="bg_video_url"
                  name="bg_video_url"
                  value={bgVideoUrl}
                  onChange={(e) => setBgVideoUrl(e.target.value)}
                  placeholder="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4"
                  className="rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-brand-pink h-12 text-sm"
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
                className="w-full [&_[role=slider]]:bg-brand-pink"
              />
              <p className="text-sm text-zinc-400">Useful to make text readable on bright custom images.</p>
            </div>

            {/* Live Background Animation */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <Label className="text-zinc-300 font-bold text-sm">Background Animation</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { val: 'none', label: 'None' },
                  { val: 'aurora', label: 'Aurora Waves' },
                  { val: 'particles', label: 'Particles' },
                  { val: 'snowfall', label: 'Snowfall' }
                ].map((anim) => (
                  <div 
                    key={anim.val} 
                    onClick={() => setBgAnimation(anim.val)} 
                    className={`h-12 flex items-center justify-center rounded-xl border-2 cursor-pointer transition-all ${bgAnimation === anim.val ? 'border-brand-pink bg-brand-pink/10 text-white font-bold' : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'}`}
                  >
                    <span className="text-xs">{anim.label}</span>
                  </div>
                ))}
                <input type="hidden" name="bg_animation" value={bgAnimation} />
              </div>
            </div>

            {/* Button Shapes & Styles Theme */}
            <div className="space-y-6 pt-6 border-t border-white/5">
              <div className="space-y-3">
                <Label className="text-zinc-300 font-bold text-sm">Button Shapes</Label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { val: 'rounded-none', label: 'Square' },
                    { val: 'rounded-xl', label: 'Rounded' },
                    { val: 'rounded-3xl', label: 'Curve' },
                    { val: 'rounded-full', label: 'Pill' }
                  ].map((shape) => (
                    <div 
                      key={shape.val} 
                      onClick={() => setButtonShape(shape.val)} 
                      className={`h-12 flex items-center justify-center rounded-xl border-2 cursor-pointer transition-all ${buttonShape === shape.val ? 'border-brand-pink bg-brand-pink/10 text-white font-bold' : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'}`}
                    >
                      <span className="text-xs">{shape.label}</span>
                    </div>
                  ))}
                  <input type="hidden" name="button_shape" value={buttonShape} />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-zinc-300 font-bold text-sm">Button Styles</Label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { val: 'fill', label: 'Filled' },
                    { val: 'outline', label: 'Outline' },
                    { val: 'soft', label: 'Soft' },
                    { val: 'shadow', label: 'Shadow' },
                    { val: 'neumorphism', label: 'Neumorphism' },
                    { val: 'glassmorphism', label: 'Glassmorphism' },
                    { val: 'neon', label: 'Neon Glow' }
                  ].map((style) => (
                    <div 
                      key={style.val} 
                      onClick={() => setButtonStyle(style.val)} 
                      className={`h-12 flex items-center justify-center rounded-xl border-2 cursor-pointer transition-all ${buttonStyle === style.val ? 'border-brand-pink bg-brand-pink/10 text-white font-bold' : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'}`}
                    >
                      <span className="text-xs">{style.label}</span>
                    </div>
                  ))}
                  <input type="hidden" name="button_style" value={buttonStyle} />
                </div>
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
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { val: 'none', label: 'None' },
                    { val: 'scale', label: 'Scale Up' },
                    { val: 'lift', label: 'Lift & Shadow' },
                    { val: 'glow', label: 'Glow' }
                  ].map((effect) => (
                    <div 
                      key={effect.val} 
                      onClick={() => setButtonHoverEffect(effect.val)} 
                      className={`h-12 flex items-center justify-center rounded-xl border-2 cursor-pointer transition-all ${buttonHoverEffect === effect.val ? 'border-brand-pink bg-brand-pink/10 text-white font-bold' : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'}`}
                    >
                      <span className="text-xs">{effect.label}</span>
                    </div>
                  ))}
                  <input type="hidden" name="button_hover_effect" value={buttonHoverEffect} />
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/5">
                <Label className="text-zinc-300 font-bold text-sm">Font Styles</Label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { val: 'font-sans-theme', label: 'Classic Sans', preview: 'Abc' },
                    { val: 'font-display-theme', label: 'Jakarta Display', preview: 'Abc' },
                    { val: 'font-serif-theme', label: 'Georgia Serif', preview: 'Abc' },
                    { val: 'font-mono-theme', label: 'Space Mono', preview: 'Abc' }
                  ].map((font) => (
                    <div 
                      key={font.val} 
                      onClick={() => setFontFamily(font.val)} 
                      className={`h-16 flex flex-col items-center justify-center rounded-xl border-2 cursor-pointer transition-all ${fontFamily === font.val ? 'border-brand-pink bg-brand-pink/10 text-white font-bold' : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'}`}
                    >
                      <span className={`text-base font-bold ${font.val}`}>{font.preview}</span>
                      <span className="text-[10px] text-zinc-500 mt-1 font-sans">{font.label}</span>
                    </div>
                  ))}
                  <input type="hidden" name="font_family" value={fontFamily} />
                </div>
              </div>

              {/* === PHASE 4: ENHANCED APPEARANCE CONTROLS === */}

              {/* 1. Header Banner & Alignment */}
              <div className="space-y-4 pt-6 border-t border-white/5 animate-in fade-in duration-300">
                <h3 className="text-sm font-bold text-zinc-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-pink" /> Layout & Hero Banner
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Banner Image Uploader */}
                  <div className="space-y-2">
                    <Label className="text-zinc-400 text-xs">Hero Banner Image (Rasio 3:1)</Label>
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        onClick={() => {
                          setCropType('banner');
                          bannerInputRef.current?.click();
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
                            setBannerUrl('');
                            window.dispatchEvent(new CustomEvent('profile-update', {
                              detail: { banner_url: '' }
                            }));
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

                  {/* Profile alignment */}
                  <div className="space-y-2">
                    <Label className="text-zinc-400 text-xs">Content Alignment</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { val: 'center', label: 'Center', icon: AlignCenter },
                        { val: 'left', label: 'Left Align', icon: AlignLeft }
                      ].map((item) => {
                        const Icon = item.icon
                        return (
                          <div
                            key={item.val}
                            onClick={() => setProfileAlign(item.val)}
                            className={`h-12 flex items-center justify-center gap-2 rounded-xl border-2 cursor-pointer transition-all ${
                              profileAlign === item.val
                                ? 'border-brand-pink bg-brand-pink/10 text-white font-bold'
                                : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
                            }`}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="text-xs">{item.label}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Layout Type */}
                  <div className="space-y-2">
                    <Label className="text-zinc-400 text-xs">Link Layout Type</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { val: 'list', label: 'List View', icon: AlignCenter },
                        { val: 'grid', label: 'Grid 2-Column', icon: LayoutGrid }
                      ].map((item) => {
                        const Icon = item.icon
                        return (
                          <div
                            key={item.val}
                            onClick={() => setLayoutType(item.val)}
                            className={`h-12 flex items-center justify-center gap-2 rounded-xl border-2 cursor-pointer transition-all ${
                              layoutType === item.val
                                ? 'border-brand-pink bg-brand-pink/10 text-white font-bold'
                                : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
                            }`}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="text-xs">{item.label}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Avatar & Spacing Controls */}
              <div className="space-y-4 pt-6 border-t border-white/5 animate-in fade-in duration-300">
                <h3 className="text-sm font-bold text-zinc-300 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-brand-orange" /> Spacing & Custom Elements
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Avatar Shape */}
                  <div className="space-y-2">
                    <Label className="text-zinc-400 text-xs">Avatar Shape</Label>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { val: 'circle', label: 'Circle' },
                        { val: 'rounded', label: 'Square' },
                        { val: 'hexagon', label: 'Hexagon' }
                      ].map((item) => (
                        <div
                          key={item.val}
                          onClick={() => setAvatarShape(item.val)}
                          className={`h-10 flex items-center justify-center rounded-xl border-2 cursor-pointer transition-all ${
                            avatarShape === item.val
                              ? 'border-brand-pink bg-brand-pink/10 text-white font-semibold'
                              : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-[11px]">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Avatar Frame */}
                  <div className="space-y-2">
                    <Label className="text-zinc-400 text-xs">Avatar Frame</Label>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { val: 'none', label: 'None' },
                        { val: 'gradient-ring', label: 'Gradient' },
                        { val: 'neon-glow', label: 'Neon' }
                      ].map((item) => (
                        <div
                          key={item.val}
                          onClick={() => setAvatarFrame(item.val)}
                          className={`h-10 flex items-center justify-center rounded-xl border-2 cursor-pointer transition-all ${
                            avatarFrame === item.val
                              ? 'border-brand-pink bg-brand-pink/10 text-white font-semibold'
                              : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-[11px]">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Avatar Size */}
                  <div className="space-y-2">
                    <Label className="text-zinc-400 text-xs">Avatar Size</Label>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { val: 'small', label: 'Small' },
                        { val: 'medium', label: 'Medium' },
                        { val: 'large', label: 'Large' }
                      ].map((item) => (
                        <div
                          key={item.val}
                          onClick={() => setAvatarSize(item.val)}
                          className={`h-10 flex items-center justify-center rounded-xl border-2 cursor-pointer transition-all ${
                            avatarSize === item.val
                              ? 'border-brand-pink bg-brand-pink/10 text-white font-semibold'
                              : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-[11px]">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Link Spacing */}
                  <div className="space-y-2">
                    <Label className="text-zinc-400 text-xs">Link Spacing</Label>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { val: 'compact', label: 'Compact' },
                        { val: 'normal', label: 'Normal' },
                        { val: 'relaxed', label: 'Relaxed' }
                      ].map((item) => (
                        <div
                          key={item.val}
                          onClick={() => setLinkSpacing(item.val)}
                          className={`h-10 flex items-center justify-center rounded-xl border-2 cursor-pointer transition-all ${
                            linkSpacing === item.val
                              ? 'border-brand-pink bg-brand-pink/10 text-white font-semibold'
                              : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-[11px]">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Global Color & Social Icons Style */}
              <div className="space-y-4 pt-6 border-t border-white/5 animate-in fade-in duration-300">
                <h3 className="text-sm font-bold text-zinc-300 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-brand-pink" /> Global Colors & Icon Styles
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Global Text Color Picker */}
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
                        className="rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-brand-pink h-12"
                      />
                    </div>
                  </div>

                  {/* Background Animation */}
                  <div className="space-y-2">
                    <Label className="text-zinc-400 text-xs">Background Animation</Label>
                    <div className="grid grid-cols-4 gap-1">
                      {[
                        { val: 'none', label: 'None' },
                        { val: 'aurora', label: 'Aurora' },
                        { val: 'particles', label: 'Particles' },
                        { val: 'snowfall', label: 'Snowfall' }
                      ].map((item) => (
                        <div
                          key={item.val}
                          onClick={() => setBgAnimation(item.val)}
                          className={`h-10 flex items-center justify-center rounded-xl border-2 cursor-pointer transition-all ${
                            bgAnimation === item.val
                              ? 'border-brand-pink bg-brand-pink/10 text-white font-semibold'
                              : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-[11px]">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social Placement */}
                  <div className="space-y-2">
                    <Label className="text-zinc-400 text-xs">Social Placement</Label>
                    <div className="grid grid-cols-2 gap-1">
                      {[
                        { val: 'top', label: 'Top (Default)' },
                        { val: 'bottom', label: 'Bottom' }
                      ].map((item) => (
                        <div
                          key={item.val}
                          onClick={() => setSocialPlacement(item.val)}
                          className={`h-10 flex items-center justify-center rounded-xl border-2 cursor-pointer transition-all ${
                            socialPlacement === item.val
                              ? 'border-brand-pink bg-brand-pink/10 text-white font-semibold'
                              : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-[11px]">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Theme Lock */}
                  <div className="space-y-2">
                    <Label className="text-zinc-400 text-xs">Global Options</Label>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Switch checked={themeLock} onCheckedChange={setThemeLock} />
                        <span className="text-xs text-zinc-300">Lock Theme (Hide Visitor Theme Toggle)</span>
                      </div>
                    </div>
                  </div>

                  {/* Social Icons Style */}
                  <div className="space-y-2">
                    <Label className="text-zinc-400 text-xs">Social Icon Border Style</Label>
                    <div className="grid grid-cols-4 gap-1">
                      {[
                        { val: 'circle', label: 'Circle' },
                        { val: 'outline', label: 'Outline' },
                        { val: 'square', label: 'Square' },
                        { val: 'none', label: 'No Border' }
                      ].map((item) => (
                        <div
                          key={item.val}
                          onClick={() => setSocialStyle(item.val)}
                          className={`h-10 flex items-center justify-center rounded-xl border-2 cursor-pointer transition-all ${
                            socialStyle === item.val
                              ? 'border-brand-pink bg-brand-pink/10 text-white font-semibold'
                              : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-[11px]">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social Placement */}
                  <div className="space-y-2">
                    <Label className="text-zinc-400 text-xs">Social Links Placement</Label>
                    <div className="grid grid-cols-2 gap-1">
                      {[
                        { val: 'top', label: 'Top (Under Bio)' },
                        { val: 'bottom', label: 'Bottom (Footer)' }
                      ].map((item) => (
                        <div
                          key={item.val}
                          onClick={() => setSocialPlacement(item.val)}
                          className={`h-10 flex items-center justify-center rounded-xl border-2 cursor-pointer transition-all ${
                            socialPlacement === item.val
                              ? 'border-brand-pink bg-brand-pink/10 text-white font-semibold'
                              : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-[11px]">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" disabled={appLoading} className="rounded-xl bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-90 text-white border-0 font-semibold h-11 px-6 shadow-lg">
              {appLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Appearance'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Branding Settings (White-label) */}
      <Card className="rounded-2xl shadow-sm border-white/10 bg-zinc-900/50 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-white font-display-theme font-black flex items-center gap-2">
            🏷️ White-label Branding
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Hide the "Powered by Branch" branding from your profile page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onBrandingSubmit} className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-zinc-950/40 border border-white/5 rounded-2xl">
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  Show Branch Branding
                </span>
                <p className="text-[11px] text-zinc-400 max-w-sm">
                  Turn off this option to hide the Branch branding at the bottom of your public profile.
                </p>
              </div>
              <Switch 
                id="show_branding"
                checked={showBranding}
                onCheckedChange={setShowBranding}
                className="data-[state=checked]:bg-brand-pink"
              />
            </div>
            <Button type="submit" disabled={brandingLoading} className="rounded-xl bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-90 text-white border-0 font-semibold h-11 px-6 shadow-lg">
              {brandingLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Branding'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <ColorPickerDialog
        isOpen={isColorPickerOpen}
        onClose={() => setIsColorPickerOpen(false)}
        initialColor={bgColor}
        onSelectColor={(color) => {
          setBgColor(color)
          setBgType('solid')
        }}
      />

      <GradientPickerDialog
        isOpen={isGradientPickerOpen}
        onClose={() => setIsGradientPickerOpen(false)}
        initialGradient={bgColor}
        onSelectGradient={(gradient) => {
          setBgColor(gradient)
          setBgType('gradient')
        }}
      />

      <ColorPickerDialog
        isOpen={isTextColorPickerOpen}
        onClose={() => setIsTextColorPickerOpen(false)}
        initialColor={textColor}
        onSelectColor={(color) => {
          setTextColor(color)
        }}
      />

      {selectedImage && (
        <ImageCropDialog
          isOpen={isCropOpen}
          onClose={() => setIsCropOpen(false)}
          imageUrl={selectedImage}
          onCropComplete={handleCropComplete}
          cropShape={cropType === 'avatar' ? 'circle' : 'rect'}
        />
      )}
    </div>
  )
}
