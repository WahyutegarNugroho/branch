'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { QRCodeCanvas } from 'qrcode.react'
import { toast } from 'sonner'
import { 
  Copy, 
  Check, 
  Download, 
  Share2, 
  X, 
  QrCode, 
  ExternalLink 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Profile } from '@/types'

export function ShareModal({ 
  profile, 
  isOpen, 
  onClose 
}: { 
  profile: Profile | null
  isOpen: boolean
  onClose: () => void 
}) {
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [shareUrl, setShareUrl] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && profile?.username) {
      setShareUrl(`${window.location.protocol}//${window.location.host}/${profile.username}`)
    }
  }, [profile?.username])

  if (!isOpen || !profile || !mounted) return null

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success('Tautan berhasil disalin ke clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Gagal menyalin tautan.')
    }
  }

  const handleDownloadQR = () => {
    const canvas = canvasRef.current?.querySelector('canvas')
    if (!canvas) {
      toast.error('Gagal mengunduh QR Code.')
      return
    }

    try {
      const pngUrl = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.href = pngUrl
      downloadLink.download = `branch_${profile.username}_qrcode.png`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
      toast.success('QR Code berhasil diunduh!')
    } catch (err) {
      toast.error('Terjadi kesalahan saat mengunduh QR Code.')
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Dialog container */}
      <div className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-3xl p-6 shadow-2xl animate-in scale-in duration-200 flex flex-col items-center">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1.5 rounded-full hover:bg-white/5 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Share Icon Header */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-pink to-brand-orange flex items-center justify-center shadow-lg shadow-brand-pink/20 mb-4">
          <Share2 className="w-6 h-6 text-white" />
        </div>

        <h3 className="text-lg font-extrabold text-white mb-1">
          Bagikan Branch Anda
        </h3>
        <p className="text-zinc-400 text-xs text-center mb-6 max-w-[300px]">
          Bagikan tautan Anda ke media sosial atau biarkan orang memindai kode QR unik Anda.
        </p>

        {/* Share Link Row */}
        <div className="w-full flex items-center gap-2 mb-6">
          <Input 
            readOnly 
            value={shareUrl}
            className="flex-1 bg-white/5 border-white/10 text-white rounded-xl h-11 text-xs font-semibold select-all"
          />
          <Button 
            onClick={handleCopy}
            className="rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold h-11 px-4 text-xs shrink-0 flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </Button>
        </div>

        {/* Separator */}
        <div className="w-full flex items-center gap-3 mb-6">
          <div className="h-[1px] flex-1 bg-white/5" />
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Atau scan QR</span>
          <div className="h-[1px] flex-1 bg-white/5" />
        </div>

        {/* QR Code Container with canvas ref */}
        <div 
          ref={canvasRef}
          className="p-4 bg-white rounded-2xl shadow-inner border border-white/20 mb-6 flex items-center justify-center"
        >
          <QRCodeCanvas 
            value={shareUrl}
            size={160}
            level="H"
            includeMargin={false}
            fgColor="#09090b" // Charcoal dark
            bgColor="#ffffff"
          />
        </div>

        {/* Actions Button Grid */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <Button 
            onClick={handleDownloadQR}
            className="rounded-xl bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-90 text-white border-0 font-bold h-11 text-xs shadow-lg flex items-center justify-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Download QR</span>
          </Button>
          <a 
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold h-11 text-xs flex items-center justify-center gap-1.5"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Buka Profil</span>
          </a>
        </div>
      </div>
    </div>,
    document.body
  )
}
