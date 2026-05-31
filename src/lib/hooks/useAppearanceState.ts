'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { usePreviewStore } from '@/lib/preview-store'
import { updateAppearance, updateProfileInfo, updateSocialLinks, updateBranding } from '@/app/actions/profile-actions'
import { compressImage } from '@/lib/image-utils'
import { usernameBlacklist } from '@/lib/validations'
import { toast } from 'sonner'
import type { Profile, AnimationConfig, AvatarFrameConfig } from '@/types'

export function useAppearanceState(profile: Profile | null) {
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
      ? profile.social_links as Record<string, string>
      : {}
  )
  const [socialLoading, setSocialLoading] = useState(false)
  const [socialSearch, setSocialSearch] = useState('')
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
  const [bgAnimationConfig, setBgAnimationConfig] = useState<AnimationConfig>(profile?.bg_animation_config || {})
  const [avatarFrame, setAvatarFrame] = useState(profile?.avatar_frame || 'none')
  const [avatarFrameConfig, setAvatarFrameConfig] = useState<AvatarFrameConfig>(profile?.avatar_frame_config || {})
  const [socialPlacement, setSocialPlacement] = useState(profile?.social_placement || 'top')
  const [themeLock, setThemeLock] = useState(profile?.theme_lock || false)
  const [glassBlur, setGlassBlur] = useState<number[]>([profile?.glass_blur ?? 10])
  const [glassOpacity, setGlassOpacity] = useState<number[]>([profile?.glass_opacity ?? 20])

  const bannerInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const avatarInputRef = useRef<HTMLInputElement>(null)
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
        setUsernameStatus(data ? 'taken' : 'available')
      } catch (e) {
        console.error('Error checking username:', e)
        setUsernameStatus('idle')
      }
    }, 400)
    return () => clearTimeout(delayDebounce)
  }, [username, profile?.username])

  const updateBgConfig = useCallback((key: string, value: unknown) => {
    setBgAnimationConfig((prev: AnimationConfig) => {
      const next = { ...prev, [key]: value }
      usePreviewStore.getState().updateProfile({
        bg_type: bgType, bg_color: bgColor, bg_image_url: bgImageUrl,
        button_shape: buttonShape, button_style: buttonStyle, font_family: fontFamily,
        theme_style: themeStyle, button_hover_effect: buttonHoverEffect, layout_type: layoutType,
        bg_animation: bgAnimation, bg_animation_config: next,
        avatar_frame: avatarFrame, avatar_frame_config: avatarFrameConfig,
        social_placement: socialPlacement, theme_lock: themeLock,
        glass_blur: glassBlur[0], glass_opacity: glassOpacity[0],
      })
      return next
    })
  }, [bgType, bgColor, bgImageUrl, buttonShape, buttonStyle, fontFamily, themeStyle, buttonHoverEffect, layoutType, bgAnimation, avatarFrame, avatarFrameConfig, socialPlacement, themeLock, glassBlur, glassOpacity])

  useEffect(() => {
    async function fetchThemes() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase.from('themes').select('*').order('name', { ascending: true })
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
     usePreviewStore.getState().updateProfile({
      bg_type: theme.bg_type, bg_color: theme.bg_color, bg_image_url: theme.bg_image_url || '',
      button_shape: theme.button_shape, button_style: theme.button_style, font_family: theme.font_family,
      theme_style: themeStyle, button_hover_effect: buttonHoverEffect, layout_type: layoutType,
      bg_animation: bgAnimation, bg_animation_config: bgAnimationConfig,
      avatar_frame: avatarFrame, avatar_frame_config: avatarFrameConfig,
      social_placement: socialPlacement, theme_lock: themeLock,
      glass_blur: glassBlur[0], glass_opacity: glassOpacity[0],
    })
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'bg' | 'banner' = 'bg') => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Maximum image size is 5MB!')
      return
    }
    setCropType(type)
    try {
      toast.loading('Compressing image...')
      const compressed = await compressImage(file)
      toast.dismiss()
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage(reader.result as string)
        setIsCropOpen(true)
      }
      reader.readAsDataURL(new File([compressed], file.name, { type: 'image/jpeg' }))
    } catch (err) {
      toast.dismiss()
      toast.error('Failed to compress image, using original')
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage(reader.result as string)
        setIsCropOpen(true)
      }
      reader.readAsDataURL(file)
    }
    e.target.value = ''
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
      const { data, error } = await supabase.storage.from(bucketName).upload(fileName, file)
      if (error) throw error
      const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(fileName)

      if (isAvatar) {
        setAvatarUrl(publicUrl); setIsCropOpen(false)
        toast.success('Profile photo cropped successfully!')
        usePreviewStore.getState().updateProfile({ avatar_url: publicUrl })
      } else if (isBanner) {
        setBannerUrl(publicUrl); setIsCropOpen(false)
        toast.success('Hero banner cropped successfully!')
        usePreviewStore.getState().updateProfile({ banner_url: publicUrl })
      } else {
        setBgImageUrl(publicUrl); setBgType('image'); setIsCropOpen(false)
        toast.success('Background image cropped successfully!')
        usePreviewStore.getState().updateProfile({ bg_type: 'image', bg_image_url: publicUrl, bg_overlay_opacity: opacity[0] })
      }
    } catch (err: any) {
      console.error('Error uploading image:', err)
      toast.error(`Failed to upload image: ${err.message}`)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      usePreviewStore.getState().updateProfile({
        bg_color: bgColor, bg_type: bgType, bg_image_url: bgImageUrl,
        bg_overlay_opacity: opacity[0], bg_video_url: bgVideoUrl,
        full_name: fullName, bio, avatar_url: avatarUrl,
        text_color: textColor, font_family: fontFamily,
        button_shape: buttonShape, button_style: buttonStyle,
        theme_style: themeStyle, button_hover_effect: buttonHoverEffect, layout_type: layoutType,
      })
    }, 100)
    return () => clearTimeout(timer)
  }, [bgColor, bgType, bgImageUrl, opacity, bgVideoUrl, fullName, bio, avatarUrl, textColor, fontFamily, buttonShape, buttonStyle, themeStyle, buttonHoverEffect, layoutType])

  useEffect(() => {
    const timer = setTimeout(() => {
      usePreviewStore.getState().updateProfile({
        social_links: socialLinks, social_style: socialStyle,
        profile_align: profileAlign, avatar_shape: avatarShape,
        banner_url: bannerUrl, link_spacing: linkSpacing,
        avatar_size: avatarSize, social_placement: socialPlacement,
      })
    }, 150)
    return () => clearTimeout(timer)
  }, [socialLinks, socialStyle, profileAlign, avatarShape, bannerUrl, linkSpacing, avatarSize, socialPlacement])

  useEffect(() => {
    const timer = setTimeout(() => {
      usePreviewStore.getState().updateProfile({
        bg_animation: bgAnimation, bg_animation_config: bgAnimationConfig,
        avatar_frame: avatarFrame, avatar_frame_config: avatarFrameConfig,
        theme_lock: themeLock, glass_blur: glassBlur[0], glass_opacity: glassOpacity[0],
      })
    }, 200)
    return () => clearTimeout(timer)
  }, [bgAnimation, bgAnimationConfig, avatarFrame, avatarFrameConfig, themeLock, glassBlur, glassOpacity])

  const handleSocialChange = (key: string, val: string) => {
    setSocialLinks(prev => ({ ...prev, [key]: val }))
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
      setInfoLoading(false); return
    }
    if (usernameStatus === 'invalid') {
      toast.error('Invalid username!')
      setInfoLoading(false); return
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
    formData.append('bg_overlay_opacity', (opacity?.[0] ?? profile?.bg_overlay_opacity ?? 0).toString())
    formData.set('bg_color', bgColor)
    formData.set('bg_type', bgType)
    formData.set('bg_image_url', bgImageUrl)
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
    formData.set('bg_animation_config', JSON.stringify(bgAnimationConfig))
    formData.set('avatar_frame', avatarFrame)
    formData.set('avatar_frame_config', JSON.stringify(avatarFrameConfig))
    formData.set('social_placement', socialPlacement)
    formData.set('theme_lock', themeLock ? 'true' : 'false')
    formData.set('glass_blur', glassBlur[0].toString())
    formData.set('glass_opacity', glassOpacity[0].toString())
    const result = await updateAppearance(formData)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Appearance updated successfully')
      router.refresh()
    }
    setAppLoading(false)
  }

  return {
    router,
    infoLoading, setInfoLoading, appLoading, setAppLoading,
    opacity, setOpacity,
    buttonShape, setButtonShape, buttonStyle, setButtonStyle,
    fontFamily, setFontFamily, bgColor, setBgColor, bgType, setBgType,
    fullName, setFullName, bio, setBio,
    isColorPickerOpen, setIsColorPickerOpen, isGradientPickerOpen, setIsGradientPickerOpen,
    socialLinks, setSocialLinks, socialLoading, setSocialLoading, socialSearch, setSocialSearch,
    bgImageUrl, setBgImageUrl, avatarUrl, setAvatarUrl,
    selectedImage, setSelectedImage, isCropOpen, setIsCropOpen, cropType, setCropType,
    username, setUsername, usernameStatus, setUsernameStatus,
    textColor, setTextColor, socialStyle, setSocialStyle,
    profileAlign, setProfileAlign, avatarShape, setAvatarShape,
    bannerUrl, setBannerUrl, linkSpacing, setLinkSpacing,
    avatarSize, setAvatarSize, bgVideoUrl, setBgVideoUrl,
    isTextColorPickerOpen, setIsTextColorPickerOpen,
    themeStyle, setThemeStyle, buttonHoverEffect, setButtonHoverEffect,
    layoutType, setLayoutType, bgAnimation, setBgAnimation,
    bgAnimationConfig, setBgAnimationConfig,
    avatarFrame, setAvatarFrame, avatarFrameConfig, setAvatarFrameConfig,
    socialPlacement, setSocialPlacement, themeLock, setThemeLock,
    glassBlur, setGlassBlur, glassOpacity, setGlassOpacity,
    bannerInputRef, fileInputRef, avatarInputRef,
    hostPrefix, themes, showBranding, setShowBranding, brandingLoading,
    updateBgConfig, handleSelectTheme, onBrandingSubmit,
    handleFileChange, handleCropComplete,
    handleSocialChange, onSocialSubmit, onInfoSubmit, onAppSubmit,
  }
}
