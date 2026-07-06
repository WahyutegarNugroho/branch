"use client"

import React, { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface ImageCropDialogProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  onCropComplete: (croppedBlob: Blob) => Promise<void>
  cropShape?: 'rect' | 'circle'
}

export function ImageCropDialog({
  isOpen,
  onClose,
  imageUrl,
  onCropComplete,
  cropShape = 'rect'
}: ImageCropDialogProps) {
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [, setImageSize] = useState({ width: 0, height: 0 })
  const [baseSize, setBaseSize] = useState({ width: 0, height: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(false)

  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLCanvasElement>(null)

  const isCircle = cropShape === 'circle'
  const frameWidth = 280
  const frameHeight = isCircle ? 280 : 576

  const previewWidth = isCircle ? 80 : 58
  const previewHeight = isCircle ? 80 : 120

  // Render live crop preview thumbnail
  useEffect(() => {
    const preview = previewRef.current
    const img = imgRef.current
    if (!preview || !img || !baseSize.width) return

    preview.width = previewWidth
    preview.height = previewHeight

    const ctx = preview.getContext('2d')
    if (!ctx) return

    const currentWidth = baseSize.width * zoom
    const currentHeight = baseSize.height * zoom
    const centerX = frameWidth / 2 + position.x
    const centerY = frameHeight / 2 + position.y
    const left = centerX - currentWidth / 2
    const top = centerY - currentHeight / 2
    const R = previewWidth / frameWidth

    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, previewWidth, previewHeight)
    ctx.drawImage(img, left * R, top * R, currentWidth * R, currentHeight * R)

    if (isCircle) {
      ctx.globalCompositeOperation = 'destination-in'
      ctx.beginPath()
      ctx.arc(previewWidth / 2, previewHeight / 2, previewWidth / 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [zoom, position, baseSize, isCircle, previewWidth, previewHeight, frameHeight])

  // Reset states on open/close
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setZoom(1)
       
      setPosition({ x: 0, y: 0 })
       
      setIsLoading(false)
    }
  }, [isOpen])

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    const naturalWidth = img.naturalWidth
    const naturalHeight = img.naturalHeight
    setImageSize({ width: naturalWidth, height: naturalHeight })

    const scaleX = frameWidth / naturalWidth
    const scaleY = frameHeight / naturalHeight
    const coverScale = Math.max(scaleX, scaleY)

    setBaseSize({
      width: naturalWidth * coverScale,
      height: naturalHeight * coverScale
    })
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !baseSize.width) return
    e.preventDefault()

    // Calculate maximum drag range to prevent revealing edges
    const maxDragX = Math.max(0, (baseSize.width * zoom - frameWidth) / 2)
    const maxDragY = Math.max(0, (baseSize.height * zoom - frameHeight) / 2)

    // Clamp the new X and Y positions
    const newX = Math.min(Math.max(e.clientX - dragStart.x, -maxDragX), maxDragX)
    const newY = Math.min(Math.max(e.clientY - dragStart.y, -maxDragY), maxDragY)

    setPosition({ x: newX, y: newY })
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  const handleApply = async () => {
    if (!imgRef.current || !baseSize.width) return
    setIsLoading(true)

    // Create Canvas for high-res output crop
    const canvas = document.createElement("canvas")
    const targetWidth = isCircle ? 500 : 640
    const targetHeight = isCircle ? 500 : 1318
    canvas.width = targetWidth
    canvas.height = targetHeight

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      setIsLoading(false)
      return
    }

    const currentWidth = baseSize.width * zoom
    const currentHeight = baseSize.height * zoom

    const centerX = frameWidth / 2 + position.x
    const centerY = frameHeight / 2 + position.y

    const left = centerX - currentWidth / 2
    const top = centerY - currentHeight / 2

    // Project coordinates from preview scale to high-res canvas scale
    const R = targetWidth / frameWidth

    const canvasLeft = left * R
    const canvasTop = top * R
    const canvasWidth = currentWidth * R
    const canvasHeight = currentHeight * R

    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, targetWidth, targetHeight)

    ctx.drawImage(imgRef.current, canvasLeft, canvasTop, canvasWidth, canvasHeight)

    canvas.toBlob(
      async (blob) => {
        if (blob) {
          try {
            await onCropComplete(blob)
          } catch (err) {
            console.error("Failed to crop image:", err)
          }
        }
        setIsLoading(false)
      },
      "image/jpeg",
      0.85
    )
  }

  // Effect to automatically clamp position if zoom changes (so it doesn't show background)
  useEffect(() => {
    if (!baseSize.width) return

    const maxDragX = Math.max(0, (baseSize.width * zoom - frameWidth) / 2)
    const maxDragY = Math.max(0, (baseSize.height * zoom - frameHeight) / 2)

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPosition((prev) => ({
      x: Math.min(Math.max(prev.x, -maxDragX), maxDragX),
      y: Math.min(Math.max(prev.y, -maxDragY), maxDragY)
    }))
  }, [zoom, baseSize, frameHeight])

  return (
    <Dialog open={isOpen} onOpenChange={() => !isLoading && onClose()}>
      <DialogContent className="max-w-[450px] max-h-[95dvh] overflow-y-auto no-scrollbar bg-[#222] border border-white/10 text-white rounded-2xl shadow-2xl p-6 font-sans select-none font-sans-theme">
        <DialogHeader>
          <DialogTitle className="text-lg font-display-theme font-black text-center text-white mb-2">
            {isCircle ? "Adjust Profile Photo" : "Adjust Background Image"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 mt-2">
          {/* Helper instructions */}
          <p className="text-xs text-zinc-400 text-center px-4">
            Drag the photo inside the frame to adjust the position, and use the slider below to zoom.
          </p>

          {/* Draggable Viewport Frame */}
          <div
            ref={containerRef}
            className="rounded-2xl border-2 border-white/20 bg-zinc-950 overflow-hidden relative shadow-inner cursor-move touch-none"
            style={{
              width: `${frameWidth}px`,
              height: `${frameHeight}px`,
              borderRadius: isCircle ? "9999px" : "1rem"
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* Checkerboard transparent preview background */}
            <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADFJREFUOE9jZGBgEGHAA8CH/zMwMDKgCxijizMwMDAwMCGbgFE1jGoIRgwQo2E4EAQAcbMT8G9Vn7QAAAAASUVORK5CYII=')] bg-repeat opacity-20" />

            {/* Uploaded Image element */}
            {imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                ref={imgRef}
                src={imageUrl}
                alt="Upload preview"
                onLoad={handleImageLoad}
                className="pointer-events-none absolute"
                style={{
                  width: `${baseSize.width || 0}px`,
                  height: `${baseSize.height || 0}px`,
                  transform: `translate(calc(-50% + 140px + ${position.x}px), calc(-50% + ${isCircle ? '140' : '288'}px + ${position.y}px)) scale(${zoom})`,
                  transformOrigin: "center",
                  maxWidth: "none",
                }}
              />
            )}

            {/* Smart Frame Bounding Guides (Photoshop Camera Bounds) */}
            <div className={`absolute inset-0 border border-white/10 pointer-events-none ${isCircle ? 'rounded-full' : 'rounded-xl'}`} />
            <div className="absolute inset-y-0 left-1/2 w-[1px] border-l border-dashed border-white/20 pointer-events-none" />
            <div className="absolute inset-x-0 top-1/2 h-[1px] border-t border-dashed border-white/20 pointer-events-none" />
          </div>

          {/* Live crop preview thumbnail */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Preview</span>
            <canvas
              ref={previewRef}
              className={`border border-white/10 shadow-lg ${isCircle ? 'rounded-full' : 'rounded-lg'}`}
              style={{ width: `${previewWidth}px`, height: `${previewHeight}px` }}
            />
          </div>

          {/* Controls Panel */}
          <div className="w-full flex flex-col gap-4 px-4">
            {/* Zoom Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <span>Image Zoom</span>
                <span className="font-semibold text-white">{Math.round(zoom * 100)}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="3"
                step="0.01"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-white focus:outline-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-2">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                onClick={handleApply}
                disabled={isLoading || !baseSize.width}
                className="flex-1 bg-white hover:bg-zinc-200 text-black font-semibold shadow-lg relative cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Apply"
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
