'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { addLinkImage, deleteLinkImage } from '@/app/actions/link-actions'
import { EmptyState } from '@/components/ui/empty-state'

export function LinkCarouselManager({
  linkId,
  carouselImages,
  setCarouselImages,
  router,
  getCarouselImages
}: {
  linkId: string
  carouselImages: any[]
  setCarouselImages: (images: any[]) => void
  router: any
  getCarouselImages: () => Promise<any[]>
}) {
  const [newUrl, setNewUrl] = useState('')
  const [pending, setPending] = useState<string | null>(null)

  const handleAdd = async () => {
    if (!newUrl || pending) return
    setPending('add')
    const res = await addLinkImage(linkId, newUrl)
    if (res.error) {
      toast.error(res.error)
    } else {
      toast.success('Image successfully added!')
      setNewUrl('')
      router.refresh()
      const updatedImages = await getCarouselImages()
      setCarouselImages(updatedImages)
    }
    setPending(null)
  }

  const handleDelete = async (imgId: string) => {
    if (pending) return
    setPending(`delete-${imgId}`)
    const res = await deleteLinkImage(imgId)
    if (res.error) {
      toast.error(res.error)
    } else {
      toast.success('Image deleted')
      router.refresh()
      const updatedImages = await getCarouselImages()
      setCarouselImages(updatedImages)
    }
    setPending(null)
  }

  return (
    <div className="p-4 bg-zinc-950/40 border border-white/5 rounded-2xl space-y-4">
      <span className="text-sm font-bold text-white block">🖼️ Manage Carousel Images</span>
      <p className="text-[10px] text-zinc-400">
        Enter image URLs to add to your profile's carousel gallery. Visitors can swipe them horizontally.
      </p>
      
      {/* Add new Image input */}
      <div className="flex gap-2">
        <Input 
          type="url" 
          placeholder="https://example.com/slide-image.png" 
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          className="rounded-xl border-white/10 bg-white/5 text-white h-10 text-sm focus-visible:ring-brand-pink flex-1"
        />
        <Button 
          type="button" 
          onClick={handleAdd}
          disabled={pending === 'add'}
          className="bg-brand-pink hover:bg-brand-pink/90 text-white rounded-xl font-bold px-4 h-10 shrink-0 cursor-pointer"
        >
          {pending === 'add' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add'}
        </Button>
      </div>

      {/* List of images */}
      <div className="space-y-2 mt-3 max-h-[200px] overflow-y-auto no-scrollbar">
        {carouselImages.length === 0 ? (
          <EmptyState title="No images yet" description="Add one above!" className="py-6" />
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
                onClick={() => handleDelete(img.id)}
                disabled={pending === `delete-${img.id}`}
                className="w-8 h-8 text-zinc-500 hover:text-red-500 hover:bg-white/5 rounded-lg transition-colors shrink-0"
              >
                {pending === `delete-${img.id}` ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
