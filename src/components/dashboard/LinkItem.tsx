'use client'

import { useState } from 'react'
import { useEffect } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2, Edit2, Check, ExternalLink, Search, Link as LinkIcon, Images } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { updateLink, deleteLink, applyStylesToAllLinks } from '@/app/actions/link-actions'
import { toast } from 'sonner'
import { Card } from '@/components/ui/card'
import { PlatformPickerDialog } from './PlatformPickerDialog'
import { getPlatformByName, Platform } from '@/utils/platforms'
import { useRouter } from 'next/navigation'

// Helper to format ISO string to datetime-local format
const formatDateTimeLocal = (isoString?: string) => {
  if (!isoString) return ''
  const d = new Date(isoString)
  if (isNaN(d.getTime())) return ''
  // Adjust timezone offset to get local time components
  const offset = d.getTimezoneOffset()
  const localTime = new Date(d.getTime() - (offset * 60 * 1000))
  return localTime.toISOString().slice(0, 16)
}

export function LinkItem({ link }: { link: any }) {
  const router = useRouter()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: link.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
  }

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState(link.title || '')
  const [url, setUrl] = useState(link.url || '')
  const [iconPosition, setIconPosition] = useState(link.icon_position || 'left_far')
  const [isPlatformPickerOpen, setIsPlatformPickerOpen] = useState(false)
  const [customStyleEnabled, setCustomStyleEnabled] = useState(!!link.bg_color || !!link.text_color || link.bg_opacity !== null)
  const [bgColor, setBgColor] = useState(link.bg_color || '#ffffff')
  const [textColor, setTextColor] = useState(link.text_color || '#000000')
  const [bgOpacity, setBgOpacity] = useState(link.bg_opacity !== null ? link.bg_opacity : 100)
  const [isActive, setIsActive] = useState(link.is_active)
  const [showIcon, setShowIcon] = useState(link.show_icon !== false)
  const [iconColorMode, setIconColorMode] = useState<'original' | 'text' | 'custom'>(
    !link.icon_color ? 'original' : link.icon_color === 'text' ? 'text' : 'custom'
  )
  const [iconColor, setIconColor] = useState(
    link.icon_color && link.icon_color !== 'text' ? link.icon_color : '#ffffff'
  )
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [scheduleEnabled, setScheduleEnabled] = useState(!!link.valid_from || !!link.valid_until)
  const [validFrom, setValidFrom] = useState(link.valid_from ? formatDateTimeLocal(link.valid_from) : '')
  const [validUntil, setValidUntil] = useState(link.valid_until ? formatDateTimeLocal(link.valid_until) : '')
  const [isEmbed, setIsEmbed] = useState(!!link.is_embed)
  const [linkType, setLinkType] = useState(link.link_type || 'link')
  const [thumbnailUrl, setThumbnailUrl] = useState(link.thumbnail_url || '')
  const [isSpotlight, setIsSpotlight] = useState(!!link.is_spotlight)
  const [animation, setAnimation] = useState(link.animation || 'none')
  const [carouselImages, setCarouselImages] = useState<any[]>([])

  const getCarouselImages = async () => {
    const { getLinkImages } = require('@/app/actions/link-actions')
    return await getLinkImages(link.id)
  }

  useEffect(() => {
    if (linkType === 'carousel') {
      getCarouselImages().then(imgs => setCarouselImages(imgs))
    }
  }, [link.id, linkType])

  useEffect(() => {
    setTitle(link.title || '')
    setUrl(link.url || '')
    setIconPosition(link.icon_position || 'left_far')
    setCustomStyleEnabled(!!link.bg_color || !!link.text_color || link.bg_opacity !== null)
    setBgColor(link.bg_color || '#ffffff')
    setTextColor(link.text_color || '#000000')
    setBgOpacity(link.bg_opacity !== null ? link.bg_opacity : 100)
    setIsActive(link.is_active)
    setShowIcon(link.show_icon !== false)
    setIconColorMode(!link.icon_color ? 'original' : link.icon_color === 'text' ? 'text' : 'custom')
    setIconColor(link.icon_color && link.icon_color !== 'text' ? link.icon_color : '#ffffff')
    setScheduleEnabled(!!link.valid_from || !!link.valid_until)
    setValidFrom(link.valid_from ? formatDateTimeLocal(link.valid_from) : '')
    setValidUntil(link.valid_until ? formatDateTimeLocal(link.valid_until) : '')
    setIsEmbed(!!link.is_embed)
    setLinkType(link.link_type || 'link')
    setThumbnailUrl(link.thumbnail_url || '')
    setIsSpotlight(!!link.is_spotlight)
    setAnimation(link.animation || 'none')
  }, [link.title, link.url, link.icon_position, link.bg_color, link.text_color, link.bg_opacity, link.is_active, link.show_icon, link.icon_color, link.valid_from, link.valid_until, link.is_embed, link.link_type, link.thumbnail_url, link.is_spotlight, link.animation])

  // Dispatch real-time live preview updates
  useEffect(() => {
    if (!isEditing) return

    window.dispatchEvent(new CustomEvent('link-preview-update', {
      detail: {
        id: link.id,
        changes: {
          title,
          url: linkType === 'header' ? '' : url,
          icon_position: iconPosition,
          bg_color: customStyleEnabled ? bgColor : null,
          text_color: customStyleEnabled ? textColor : null,
          bg_opacity: customStyleEnabled ? bgOpacity : null,
          is_active: isActive,
          show_icon: showIcon,
          icon_color: customStyleEnabled
            ? iconColorMode === 'original'
              ? null
              : iconColorMode === 'text'
              ? 'text'
              : iconColor
            : null,
          valid_from: scheduleEnabled && validFrom ? new Date(validFrom).toISOString() : null,
          valid_until: scheduleEnabled && validUntil ? new Date(validUntil).toISOString() : null,
          is_embed: isEmbed,
          link_type: linkType,
          thumbnail_url: linkType === 'header' ? null : thumbnailUrl,
          is_spotlight: isSpotlight,
          animation: animation === 'none' ? null : animation,
          images: carouselImages,
        }
      }
    }))
  }, [title, url, iconPosition, customStyleEnabled, bgColor, textColor, bgOpacity, isActive, showIcon, iconColorMode, iconColor, scheduleEnabled, validFrom, validUntil, isEmbed, isEditing, link.id, linkType, thumbnailUrl, isSpotlight, animation, carouselImages])

  const matchedPlatform = getPlatformByName(title)
  const MatchedIcon = matchedPlatform?.icon
  
  const displayPlatform = getPlatformByName(link.title)
  const DisplayIcon = displayPlatform?.icon

  async function handleSave(formData: FormData) {
    setLoading(true)
    formData.append('is_active', formData.get('is_active') ? 'on' : '')
    formData.append('show_icon', formData.get('show_icon') ? 'on' : '')
    formData.append('is_spotlight', isSpotlight ? 'on' : 'off')
    formData.append('animation', animation)
    
    const result = await updateLink(link.id, formData)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Link updated')
      setIsEditing(false)
      router.refresh()
    }
    setLoading(false)
  }

  async function handleApplyToAll() {
    if (confirm('Apply this custom style (Background, Text Color, Opacity) to all links? This will overwrite individual styles.')) {
      setLoading(true)
      const result = await applyStylesToAllLinks(
        customStyleEnabled ? bgColor : null,
        customStyleEnabled ? textColor : null,
        customStyleEnabled ? bgOpacity : null,
        customStyleEnabled
          ? iconColorMode === 'original'
            ? null
            : iconColorMode === 'text'
            ? 'text'
            : iconColor
          : null
      )
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Style applied to all links!')
        router.refresh()
      }
      setLoading(false)
    }
  }

  function handleDelete() {
    setShowDeleteConfirm(true)
  }

  async function confirmDelete() {
    setLoading(true)
    const result = await deleteLink(link.id)
    if (result.error) {
      toast.error(result.error)
      setLoading(false)
    } else {
      toast.success('Link deleted')
      router.refresh()
    }
  }

  async function toggleActive(checked: boolean) {
    const formData = new FormData()
    formData.append('title', link.title)
    formData.append('url', link.url)
    if (checked) formData.append('is_active', 'on')
    
    const result = await updateLink(link.id, formData)
    if (result.error) {
      toast.error(result.error)
    } else {
      router.refresh()
    }
  }

  if (isEditing) {
    return (
      <Card ref={setNodeRef} style={style} className="p-5 mb-4 bg-zinc-900/60 border-white/10 shadow-2xl rounded-2xl backdrop-blur-xl relative">
        <form action={handleSave} className="space-y-4">
          <input type="hidden" name="link_type" value={linkType} />
          
          {linkType === 'header' ? (
            <div className="space-y-3">
              <span className="text-xs text-brand-pink font-bold uppercase tracking-wider block">Section Divider / Header</span>
              <Input name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Header Title (e.g., My Socials, Projects)" required className="font-bold rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-brand-pink h-12" />
              <input type="hidden" name="url" value="" />
            </div>
          ) : linkType === 'carousel' ? (
            <div className="space-y-4">
              <span className="text-xs text-brand-pink font-bold uppercase tracking-wider block">Image Carousel / Gallery</span>
              <div className="space-y-3">
                <Input name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Carousel Title (e.g., My Portfolio, Event Photos)" required className="font-bold rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-brand-pink h-12" />
                <input type="hidden" name="url" value="" />
              </div>
              
              {/* Carousel Image Manager */}
              <div className="p-4 bg-zinc-950/40 border border-white/5 rounded-2xl space-y-4">
                <span className="text-sm font-bold text-white block">🖼️ Kelola Gambar Carousel</span>
                <p className="text-[10px] text-zinc-400">
                  Masukkan URL gambar untuk ditambahkan ke galeri carousel profil Anda. Pengunjung dapat menggesernya secara horizontal.
                </p>
                
                {/* Add new Image input */}
                <div className="flex gap-2">
                  <Input 
                    type="url" 
                    placeholder="https://example.com/slide-image.png" 
                    id={`new_carousel_img_${link.id}`}
                    className="rounded-xl border-white/10 bg-white/5 text-white h-10 text-sm focus-visible:ring-brand-pink flex-1"
                  />
                  <Button 
                    type="button" 
                    onClick={async () => {
                      const input = document.getElementById(`new_carousel_img_${link.id}`) as HTMLInputElement;
                      if (!input || !input.value) return;
                      const imageUrl = input.value;
                      const { addLinkImage } = require('@/app/actions/link-actions');
                      const res = await addLinkImage(link.id, imageUrl);
                      if (res.error) {
                        toast.error(res.error);
                      } else {
                        toast.success('Gambar berhasil ditambahkan!');
                        input.value = '';
                        // Refresh router and fetch again
                        router.refresh();
                        const updatedImages = await getCarouselImages();
                        setCarouselImages(updatedImages);
                      }
                    }}
                    className="bg-brand-pink hover:bg-brand-pink/90 text-white rounded-xl font-bold px-4 h-10 shrink-0 cursor-pointer"
                  >
                    Tambah
                  </Button>
                </div>

                {/* List of images */}
                <div className="space-y-2 mt-3 max-h-[200px] overflow-y-auto no-scrollbar">
                  {carouselImages.length === 0 ? (
                    <p className="text-xs text-zinc-500 italic text-center py-2">Belum ada gambar. Tambahkan satu di atas!</p>
                  ) : (
                    carouselImages.map((img: any) => (
                      <div key={img.id} className="flex items-center justify-between p-2 bg-zinc-900/60 rounded-xl border border-white/5">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <img src={img.image_url} alt="" className="w-10 h-10 rounded-lg object-cover border border-white/10 shrink-0" />
                          <span className="text-[10px] text-zinc-400 truncate flex-1">{img.image_url}</span>
                        </div>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={async () => {
                            const { deleteLinkImage } = require('@/app/actions/link-actions');
                            const res = await deleteLinkImage(img.id);
                            if (res.error) {
                              toast.error(res.error);
                            } else {
                              toast.success('Gambar dihapus');
                              router.refresh();
                              const updatedImages = await getCarouselImages();
                              setCarouselImages(updatedImages);
                            }
                          }}
                          className="w-8 h-8 text-zinc-500 hover:text-red-500 hover:bg-white/5 rounded-lg transition-colors shrink-0"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPlatformPickerOpen(true)}
                className="w-14 h-14 shrink-0 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 p-0 flex items-center justify-center transition-all group shadow-inner mt-1"
              >
                {MatchedIcon ? (
                  <MatchedIcon size={28} color={matchedPlatform?.color} className="group-hover:scale-110 transition-transform" />
                ) : (
                  <Search size={24} className="text-zinc-400 group-hover:text-white transition-colors" />
                )}
              </Button>
              <div className="flex-1 space-y-3">
                <Input name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required className="font-bold rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-brand-pink h-12" />
                <Input name="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" required className="rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-brand-pink h-12" />
              </div>
            </div>
          )}

          {/* Embed Switch (Link only) */}
          {linkType === 'link' && (
            <div className="flex items-center justify-between p-4 bg-zinc-950/40 border border-white/5 rounded-2xl">
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  🖼️ Tampilkan sebagai Embed Media
                </span>
                <p className="text-[10px] text-zinc-400 max-w-[280px]">
                  Tampilkan langsung video YouTube, lagu Spotify, SoundCloud, atau TikTok di halaman profil Anda alih-alih sebagai tautan biasa.
                </p>
              </div>
              <Switch 
                id={`is_embed_${link.id}`} 
                checked={isEmbed} 
                onCheckedChange={setIsEmbed} 
                className="data-[state=checked]:bg-brand-pink"
              />
              <input type="hidden" name="is_embed" value={isEmbed ? 'on' : 'off'} />
            </div>
          )}

          {/* Thumbnail URL Input (Link only) */}
          {linkType === 'link' && (
            <div className="p-4 bg-zinc-950/40 border border-white/5 rounded-2xl space-y-2">
              <span className="text-sm font-bold text-white flex items-center gap-1.5">
                🖼️ Link Thumbnail
              </span>
              <p className="text-[10px] text-zinc-400 max-w-[400px]">
                Tambahkan gambar kecil di sebelah kiri tautan Anda. Masukkan URL gambar (PNG, JPG, atau GIF).
              </p>
              <div className="flex items-center gap-3">
                <Input 
                  name="thumbnail_url" 
                  value={thumbnailUrl} 
                  onChange={(e) => setThumbnailUrl(e.target.value)} 
                  placeholder="https://example.com/image.png (Optional)" 
                  className="rounded-xl border-white/10 bg-white/5 text-white h-10 text-sm focus-visible:ring-brand-pink flex-1" 
                />
                {thumbnailUrl && (
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10">
                    <img src={thumbnailUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Spotlight & Animation Effects (Link only) */}
          {linkType === 'link' && (
            <div className="p-4 bg-zinc-950/40 border border-white/5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    ⭐ Priority / Spotlight Link
                  </span>
                  <p className="text-[10px] text-zinc-400 max-w-[280px]">
                    Beri highlight bersinar khusus agar tautan ini menarik perhatian utama pengunjung.
                  </p>
                </div>
                <Switch 
                  id={`is_spotlight_${link.id}`} 
                  checked={isSpotlight} 
                  onCheckedChange={setIsSpotlight} 
                  className="data-[state=checked]:bg-brand-pink"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  ✨ Efek Animasi
                </span>
                <p className="text-[10px] text-zinc-400">
                  Pilih efek gerakan untuk menarik pandangan pengunjung secara halus.
                </p>
                <select
                  value={animation}
                  onChange={(e) => setAnimation(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-zinc-900 text-white h-10 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-pink"
                >
                  <option value="none">Tanpa Animasi</option>
                  <option value="pulse">Pulse (Denyut Perlahan)</option>
                  <option value="bounce">Bounce (Memantul)</option>
                  <option value="shake">Shake (Goyang Samping)</option>
                  <option value="wobble">Wobble (Bergetar)</option>
                  <option value="glow">Glow (Cahaya Bersinar)</option>
                </select>
              </div>
            </div>
          )}

          {/* Custom Theme Section */}
          <div className="bg-zinc-950/40 border border-white/5 p-4 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch 
                  id={`custom_style_${link.id}`} 
                  checked={customStyleEnabled} 
                  onCheckedChange={setCustomStyleEnabled} 
                  className="data-[state=checked]:bg-brand-pink"
                />
                <label htmlFor={`custom_style_${link.id}`} className="text-sm font-bold text-white cursor-pointer flex items-center gap-1.5">
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

                {/* Logo Color Mode Options (Link only) */}
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
                      value={
                        customStyleEnabled 
                          ? iconColorMode === 'original' 
                            ? '' 
                            : iconColorMode === 'text' 
                            ? 'text' 
                            : iconColor 
                          : ''
                      } 
                    />
                  </div>
                )}

                {/* Custom Logo Color Picker (Link only) */}
                {linkType === 'link' && iconColorMode === 'custom' && (
                  <div className="sm:col-span-2 space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
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
                        className="font-mono rounded-xl border-white/10 bg-white/5 text-white h-10 text-sm focus-visible:ring-brand-pink w-40" 
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {!customStyleEnabled && (
              <>
                <input type="hidden" name="bg_color" value="" />
                <input type="hidden" name="text_color" value="" />
                <input type="hidden" name="bg_opacity" value="" />
              </>
            )}
          </div>

          {/* Link Scheduling Section (Link only) */}
          {linkType === 'link' && (
            <div className="bg-zinc-950/40 border border-white/5 p-4 rounded-2xl space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id={`schedule_enabled_${link.id}`} 
                  checked={scheduleEnabled} 
                  onCheckedChange={setScheduleEnabled} 
                  className="data-[state=checked]:bg-brand-pink"
                />
                <label htmlFor={`schedule_enabled_${link.id}`} className="text-sm font-bold text-white cursor-pointer flex items-center gap-1.5">
                  ⏰ Jadwalkan Tautan (Schedule)
                </label>
              </div>

              {scheduleEnabled && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="space-y-1.5">
                    <span className="text-xs text-zinc-400">Tanggal Mulai (Valid From):</span>
                    <Input 
                      type="datetime-local" 
                      name="valid_from" 
                      value={validFrom} 
                      onChange={(e) => setValidFrom(e.target.value)}
                      className="rounded-xl border-white/10 bg-white/5 text-white h-10 text-xs focus-visible:ring-brand-pink w-full block [color-scheme:dark]" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-xs text-zinc-400">Tanggal Selesai (Valid Until):</span>
                    <Input 
                      type="datetime-local" 
                      name="valid_until" 
                      value={validUntil} 
                      onChange={(e) => setValidUntil(e.target.value)}
                      className="rounded-xl border-white/10 bg-white/5 text-white h-10 text-xs focus-visible:ring-brand-pink w-full block [color-scheme:dark]" 
                    />
                  </div>
                  <p className="sm:col-span-2 text-[10px] text-zinc-500 italic">
                    Tautan hanya akan muncul pada halaman publik Anda selama rentang waktu di atas. Kosongkan salah satu untuk tidak membatasinya.
                  </p>
                </div>
              )}

              {!scheduleEnabled && (
                <>
                  <input type="hidden" name="valid_from" value="" />
                  <input type="hidden" name="valid_until" value="" />
                </>
              )}
            </div>
          )}
          
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/5 mt-4">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-2">
                <Switch 
                  id={`is_active_${link.id}`} 
                  checked={isActive} 
                  onCheckedChange={setIsActive} 
                  className="data-[state=checked]:bg-brand-pink" 
                />
                <input type="hidden" name="is_active" value={isActive ? 'on' : ''} />
                <label htmlFor={`is_active_${link.id}`} className="text-sm text-zinc-400">Active</label>
              </div>

              {linkType === 'link' ? (
                <>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id={`show_icon_${link.id}`} 
                      checked={showIcon} 
                      onCheckedChange={setShowIcon} 
                      className="data-[state=checked]:bg-brand-pink" 
                    />
                    <input type="hidden" name="show_icon" value={showIcon ? 'on' : ''} />
                    <label htmlFor={`show_icon_${link.id}`} className="text-sm text-zinc-400">Show Logo</label>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <span className="text-sm text-zinc-400">Logo Position:</span>
                    <div className="flex bg-zinc-950 p-1 rounded-xl border border-white/10 w-fit">
                      <button
                        type="button"
                        onClick={() => setIconPosition('left_far')}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                          iconPosition === 'left_far' || iconPosition === 'left'
                            ? 'bg-brand-pink text-white shadow'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Left Far
                      </button>
                      <button
                        type="button"
                        onClick={() => setIconPosition('left_near')}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                          iconPosition === 'left_near'
                            ? 'bg-brand-pink text-white shadow'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Left
                      </button>
                      <button
                        type="button"
                        onClick={() => setIconPosition('right_near')}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                          iconPosition === 'right_near'
                            ? 'bg-brand-pink text-white shadow'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Right
                      </button>
                      <button
                        type="button"
                        onClick={() => setIconPosition('right_far')}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                          iconPosition === 'right_far' || iconPosition === 'right'
                            ? 'bg-brand-pink text-white shadow'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Right Far
                      </button>
                    </div>
                    <input type="hidden" name="icon_position" value={iconPosition} />
                  </div>
                </>
              ) : (
                <>
                  <input type="hidden" name="show_icon" value="" />
                  <input type="hidden" name="icon_position" value="" />
                </>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl" onClick={() => setIsEditing(false)} disabled={loading}>Cancel</Button>
              <Button type="submit" className="rounded-xl bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-90 transition-opacity text-white font-bold border-0 h-10 px-5" disabled={loading}>Save</Button>
            </div>
          </div>
        </form>

        <PlatformPickerDialog 
          isOpen={isPlatformPickerOpen} 
          onClose={() => setIsPlatformPickerOpen(false)}
          onSelectPlatform={(p: Platform) => {
            setTitle(p.name)
            if (!url || url === 'https://') {
              setUrl(p.urlPrefix || '')
            }
          }}
        />
      </Card>
    )
  }

  const pos = link.icon_position || 'left_far'
  const isLeftFar = pos === 'left' || pos === 'left_far'
  const isRightFar = pos === 'right' || pos === 'right_far'
  const isLeftNear = pos === 'left_near'
  const isRightNear = pos === 'right_near'
  const isHeader = link.link_type === 'header'
  const isCarousel = link.link_type === 'carousel'

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className={`p-4 mb-4 ${isHeader ? 'bg-zinc-900/80 border-brand-pink/20 border shadow-md' : isCarousel ? 'bg-zinc-900/80 border-brand-pink/20 border shadow-md' : 'bg-zinc-900/40 border-white/10 shadow-lg'} rounded-2xl backdrop-blur-md group hover:border-white/20 transition-all relative flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-2`}
    >
      {/* Left side: Drag Handle & Main Content */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {/* Drag Handle */}
        <div {...attributes} {...listeners} className="cursor-grab text-zinc-500 hover:text-white p-2 -ml-2 transition-colors shrink-0">
          <GripVertical size={18} />
        </div>

        {isHeader ? (
          /* Header Layout */
          <div className="flex items-center gap-3 min-w-0 flex-1 py-1">
            <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-brand-pink/10 border border-brand-pink/20">
              <span className="text-brand-pink font-bold text-sm">H</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-extrabold text-white text-base leading-snug tracking-tight">{link.title}</p>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-pink shrink-0" />
                Section Divider
              </p>
            </div>
          </div>
        ) : isCarousel ? (
          /* Carousel Layout */
          <div className="flex items-center gap-3 min-w-0 flex-1 py-1">
            <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-brand-pink/10 border border-brand-pink/20">
              <Images size={20} className="text-brand-pink" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-extrabold text-white text-base leading-snug tracking-tight">{link.title}</p>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-pink shrink-0" />
                Image Carousel / Gallery
              </p>
            </div>
          </div>
        ) : (
          /* Standard Link Layout */
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Render Left Far Icon */}
            {isLeftFar && (
              <div className="flex items-center justify-center w-11 h-11 shrink-0 rounded-xl bg-white/5 border border-white/10 shadow-inner overflow-hidden">
                {link.thumbnail_url ? (
                  <img src={link.thumbnail_url} alt="" className="w-full h-full object-cover animate-in fade-in duration-200" />
                ) : DisplayIcon && link.show_icon !== false ? (
                  <DisplayIcon size={22} color={displayPlatform?.color} />
                ) : (
                  <LinkIcon size={18} className="text-zinc-500" />
                )}
              </div>
            )}

            {/* Details */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                {isLeftNear && DisplayIcon && link.show_icon !== false && (
                  <DisplayIcon size={18} color={displayPlatform?.color} className="shrink-0" />
                )}
                <p className="font-bold text-white truncate text-base leading-snug">{link.title}</p>
                {isRightNear && DisplayIcon && link.show_icon !== false && (
                  <DisplayIcon size={18} color={displayPlatform?.color} className="shrink-0" />
                )}
              </div>
              
              <p className="text-xs text-zinc-400 flex items-center gap-1.5 truncate mt-1">
                <ExternalLink size={10} className="text-zinc-500 shrink-0" /> 
                <span className="truncate hover:text-brand-pink transition-colors">{link.url}</span>
              </p>
              
              {(link.valid_from || link.valid_until) && (
                <p className="text-[10px] text-brand-pink flex items-center gap-1 mt-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-pink animate-pulse" />
                  Scheduled: {link.valid_from ? new Date(link.valid_from).toLocaleDateString() : 'Always'} - {link.valid_until ? new Date(link.valid_until).toLocaleDateString() : 'Always'}
                </p>
              )}
            </div>

            {/* Render Right Far Icon */}
            {isRightFar && (
              <div className="flex items-center justify-center w-11 h-11 shrink-0 rounded-xl bg-white/5 border border-white/10 shadow-inner overflow-hidden">
                {link.thumbnail_url ? (
                  <img src={link.thumbnail_url} alt="" className="w-full h-full object-cover animate-in fade-in duration-200" />
                ) : DisplayIcon && link.show_icon !== false ? (
                  <DisplayIcon size={22} color={displayPlatform?.color} />
                ) : (
                  <LinkIcon size={18} className="text-zinc-500" />
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right side: Switch & Actions */}
      <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5 sm:ml-4 shrink-0">
        {/* Toggle Switch */}
        <div className="flex items-center gap-2">
          <Switch 
            checked={link.is_active} 
            onCheckedChange={toggleActive} 
            aria-label="Toggle link active state" 
            className="data-[state=checked]:bg-brand-pink" 
          />
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block sm:hidden">Active</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1.5">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsEditing(true)} 
            className="w-9 h-9 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
          >
            <Edit2 size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleDelete} 
            className="w-9 h-9 text-zinc-400 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      {/* Premium Deletion Confirmation Overlay */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 z-30 bg-zinc-950/98 backdrop-blur-md rounded-2xl flex items-center justify-between px-5 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 shrink-0">
              <Trash2 className="w-5 h-5 text-red-500" />
            </div>
            <div className="min-w-0 text-left">
              <h4 className="text-white font-bold text-sm leading-snug">{isHeader ? 'Hapus Header?' : 'Hapus Tautan?'}</h4>
              <p className="text-zinc-400 text-xs truncate max-w-[200px] sm:max-w-md mt-0.5">
                Hapus <span className="text-red-400 font-semibold">"{link.title}"</span> secara permanen?
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowDeleteConfirm(false)}
              className="rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 text-xs font-semibold h-9 px-4 transition-colors"
              disabled={loading}
            >
              Batal
            </Button>
            <Button
              type="button"
              onClick={confirmDelete}
              className="rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold h-9 px-4 border-0 shadow-lg shadow-red-500/20 transition-all active:scale-95"
              disabled={loading}
            >
              Hapus
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
