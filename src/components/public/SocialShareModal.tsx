'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Check, Copy, Share2, QrCode } from 'lucide-react'
import { FaXTwitter, FaFacebook, FaWhatsapp } from 'react-icons/fa6'
import { FaTelegramPlane } from 'react-icons/fa'
import { QRCodeSVG } from 'qrcode.react'

interface SocialShareModalProps {
  isOpen: boolean
  onClose: () => void
  url: string
  title: string
  description?: string
}

const sharePlatforms = [
  {
    name: 'Twitter / X',
    icon: FaXTwitter,
    color: '#1DA1F2',
    getHref: (url: string, text: string) => `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
  },
  {
    name: 'WhatsApp',
    icon: FaWhatsapp,
    color: '#25D366',
    getHref: (url: string, text: string) => `https://wa.me/?text=${text}%20${url}`,
  },
  {
    name: 'Telegram',
    icon: FaTelegramPlane,
    color: '#0088cc',
    getHref: (url: string, text: string) => `https://t.me/share/url?url=${url}&text=${text}`,
  },
  {
    name: 'Facebook',
    icon: FaFacebook,
    color: '#1877F2',
    getHref: (url: string) => `https://facebook.com/sharer/sharer.php?u=${url}`,
  },
]

export function SocialShareModal({ isOpen, onClose, url, title, description }: SocialShareModalProps) {
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(`${title}${description ? ` - ${description}` : ''}`)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success('Link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy link')
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description || '', url })
      } catch {}
    } else {
      handleCopy()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-[400px] bg-[#222] border border-white/10 text-white rounded-2xl shadow-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-white text-center">Share Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* URL preview */}
          <div className="bg-zinc-900/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-400 truncate">
            {url}
          </div>

          {/* Social share buttons */}
          <div className="grid grid-cols-4 gap-3">
            {sharePlatforms.map((platform) => {
              const Icon = platform.icon
              return (
                <a
                  key={platform.name}
                  href={platform.getHref(encodedUrl, encodedText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-white/10 bg-zinc-900/30 hover:bg-white/5 transition-colors group"
                >
                  <Icon className="w-5 h-5 transition-colors" style={{ color: platform.color }} />
                  <span className="text-[9px] text-zinc-500 font-semibold">{platform.name}</span>
                </a>
              )
            })}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCopy}
              className="flex-1 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white rounded-xl h-10 text-xs"
            >
              {copied ? (
                <><Check className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />Copied</>
              ) : (
                <><Copy className="w-3.5 h-3.5 mr-1.5" />Copy Link</>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleNativeShare}
              className="flex-1 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white rounded-xl h-10 text-xs"
            >
              <Share2 className="w-3.5 h-3.5 mr-1.5" />
              Share
            </Button>
          </div>

          {/* QR Code toggle */}
          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => setShowQR(!showQR)}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <QrCode className="w-3.5 h-3.5" />
              {showQR ? 'Hide QR Code' : 'Show QR Code'}
            </button>
            {showQR && (
              <div className="bg-white p-3 rounded-xl">
                <QRCodeSVG value={url} size={140} />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
