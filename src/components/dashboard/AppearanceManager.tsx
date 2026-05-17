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
import { Loader2 } from 'lucide-react'
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
import { ColorPickerDialog } from './ColorPickerDialog'
import { GradientPickerDialog } from './GradientPickerDialog'
import { ImageCropDialog } from './ImageCropDialog'
import { createClient } from '@/utils/supabase/client'
import { useRef } from 'react'

import { Profile } from '@/types'

export function AppearanceManager({ profile }: { profile: Profile | null }) {
  const router = useRouter()
  const [infoLoading, setInfoLoading] = useState(false)
  const [appLoading, setAppLoading] = useState(false)
  const [opacity, setOpacity] = useState([profile?.bg_overlay_opacity || 0])
  const [buttonShape, setButtonShape] = useState(profile?.button_shape || 'rounded-2xl')
  const [buttonStyle, setButtonStyle] = useState(profile?.button_style || 'soft')
  const [fontFamily, setFontFamily] = useState(profile?.font_family || 'font-sans-theme')
  const [bgColor, setBgColor] = useState(profile?.bg_color || '#09090b')
  const [bgType, setBgType] = useState(profile?.bg_type || 'solid')
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
  const [cropType, setCropType] = useState<'avatar' | 'bg'>('bg')
  const [username, setUsername] = useState(profile?.username ?? '')
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'invalid'>('idle')

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

    const blacklist = ['admin', 'api', 'dashboard', 'login', 'register', 'auth', 'settings', 'appearance', 'analytics']
    if (blacklist.includes(username.toLowerCase())) {
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
        font_family: theme.font_family
      }
    }))
    
    toast.success(`Tema "${theme.name}" diterapkan di preview! Klik "Save Appearance" di bagian bawah untuk menyimpan ke profil publik Anda.`)
  }

  async function onBrandingSubmit(e: React.FormEvent) {
    e.preventDefault()
    setBrandingLoading(true)
    const result = await updateBranding(showBranding)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Pengaturan branding berhasil diperbarui!')
      router.refresh()
    }
    setBrandingLoading(false)
  }
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const avatarInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'bg' = 'bg') => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Ukuran gambar maksimal adalah 5MB!')
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
        toast.error('Anda harus login terlebih dahulu!')
        return
      }

      const isAvatar = cropType === 'avatar'
      const prefix = isAvatar ? 'avatar' : 'bg'
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
        toast.success('Foto profil berhasil dipotong!')

        // Sync immediately to virtual smartphone preview
        window.dispatchEvent(new CustomEvent('profile-update', {
          detail: {
            avatar_url: publicUrl
          }
        }))
      } else {
        setBgImageUrl(publicUrl)
        setBgType('image')
        setIsCropOpen(false)
        toast.success('Gambar latar belakang berhasil dipotong!')

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
      toast.error(`Gagal mengunggah gambar: ${err.message}`)
    }
  }

  // Sync background customization to live preview in real time
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('profile-update', {
      detail: {
        bg_color: bgColor,
        bg_type: bgType,
        bg_image_url: bgImageUrl,
        bg_overlay_opacity: opacity[0]
      }
    }))
  }, [bgColor, bgType, bgImageUrl, opacity])

  // Sync profile text inputs to live preview in real time
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('profile-update', {
      detail: {
        full_name: fullName,
        bio: bio,
        avatar_url: avatarUrl
      }
    }))
  }, [fullName, bio, avatarUrl])

  // Sync social links to live preview in real time
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('profile-update', {
      detail: {
        social_links: socialLinks
      }
    }))
  }, [socialLinks])

  // Sync button shape, style & font family to live preview in real time
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('profile-update', {
      detail: {
        button_shape: buttonShape,
        button_style: buttonStyle,
        font_family: fontFamily
      }
    }))
  }, [buttonShape, buttonStyle, fontFamily])

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
      toast.error('Username sudah digunakan oleh orang lain!')
      setInfoLoading(false)
      return
    }
    if (usernameStatus === 'invalid') {
      toast.error('Username tidak valid!')
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
      toast.success('Informasi profil berhasil diperbarui!')
      if (username !== profile?.username) {
        toast.info('Username Anda diubah, menyinkronkan dashboard...')
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
                    <img src={avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
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
            <div className="space-y-2 border-b border-white/5 pb-6 mb-6">
              <Label htmlFor="username" className="text-zinc-300 font-semibold">Custom Profile URL</Label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-zinc-500 font-bold select-none text-sm tracking-wide">
                  {hostPrefix}
                </span>
                <Input
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                  placeholder="username"
                  required
                  className="rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-brand-pink h-12 pl-[145px] pr-28 text-sm font-semibold tracking-wide"
                />
                
                {/* Real-time Status Badge inside input */}
                <div className="absolute right-3 flex items-center gap-1.5 pointer-events-none">
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
              <p className="text-[11px] text-zinc-500 font-medium">
                Tautan unik profil publik Anda. Hanya boleh diisi huruf kecil, angka, underscore (_), atau strip (-).
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
          <CardTitle className="text-xl text-white font-bold flex items-center gap-2">
            🎨 Preset Themes Gallery
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Pilih dari tema premium yang dirancang secara profesional untuk mempercantik profil Anda secara instan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {themes.length === 0 ? (
            <div className="flex items-center justify-center py-6 text-zinc-500 text-sm font-medium animate-pulse">
              Memuat galeri tema...
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
            <div className="grid grid-cols-3 gap-4">
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
                    { val: 'shadow', label: 'Shadow' }
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
          <CardTitle className="text-xl text-white font-bold flex items-center gap-2">
            🏷️ White-label Branding
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Sembunyikan branding "Powered by Branch" dari halaman profil Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onBrandingSubmit} className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-zinc-950/40 border border-white/5 rounded-2xl">
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  Tampilkan Branding Branch
                </span>
                <p className="text-[11px] text-zinc-400 max-w-sm">
                  Matikan opsi ini untuk menyembunyikan branding Branch di bagian bawah profil publik Anda.
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
