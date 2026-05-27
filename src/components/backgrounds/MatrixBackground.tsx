'use client'

import React, { useEffect, useRef } from 'react'

export default function MatrixBackground({ config = {} }: { config?: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const matrixColor = config?.color || '#0F0'
  const fontSize = typeof config?.fontSize === 'number' ? config.fontSize : 14
  const speed = typeof config?.speed === 'number' ? config.speed : 1

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*'.split('')
    const columns = width / fontSize
    const drops: number[] = []

    for (let x = 0; x < columns; x++) {
      drops[x] = 1
    }

    let animationFrameId: number
    let lastDrawTime = 0

    function draw(time: number) {
      animationFrameId = requestAnimationFrame(draw)

      const throttleTime = 50 / speed
      if (time - lastDrawTime < throttleTime) return 
      lastDrawTime = time

      if (!ctx || !canvas) return

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = matrixColor
      ctx.font = fontSize + 'px monospace'

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    animationFrameId = requestAnimationFrame(draw)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      const newColumns = width / fontSize
      for (let x = drops.length; x < newColumns; x++) {
        drops[x] = Math.random() * -100 // Stagger initial drop
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [matrixColor, fontSize, speed])

  return (
    <div className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-50">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
