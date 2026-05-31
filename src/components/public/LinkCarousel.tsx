'use client'

import Image from 'next/image'
import type { LinkImage } from '@/types'

interface LinkCarouselProps {
  title?: string
  images: LinkImage[]
}

export function LinkCarousel({ title, images }: LinkCarouselProps) {
  return (
    <div className="w-full space-y-3 py-2">
      {title && (
        <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider px-2 flex items-center gap-2">
          <span>🖼️</span> {title}
        </h3>
      )}
      <div className="flex gap-4 overflow-x-auto pb-3 pt-1 px-2 no-scrollbar scroll-smooth snap-x snap-mandatory">
        {images.length === 0 ? (
          <div className="w-full py-8 text-center text-zinc-500 bg-zinc-900/30 border border-white/5 rounded-2xl border-dashed">
            No images in this gallery yet
          </div>
        ) : (
          images.map((img) => (
            <div 
              key={img.id} 
              className="w-[200px] h-[130px] rounded-2xl overflow-hidden border border-white/10 shadow-lg shrink-0 snap-center relative group/img cursor-pointer transition-transform hover:scale-[1.03]"
              onClick={() => window.open(img.image_url, '_blank')}
            >
              <Image 
                src={img.image_url} 
                alt="" 
                fill
                className="object-cover" 
                sizes="200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-2.5">
                <span className="text-[9px] text-white/90 truncate font-semibold">Buka Gambar Penuh ↗</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
