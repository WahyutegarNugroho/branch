'use client'

import React, { useEffect, useRef } from 'react'

export default function SnowfallBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    const flakes: any[] = []
    const flakeCount = 100

    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 3 + 1,
        d: Math.random() * flakeCount,
        vx: Math.random() * 1 - 0.5,
        vy: Math.random() * 2 + 1
      })
    }

    let angle = 0
    let animationFrameId: number

    function update() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.beginPath()

      for (let i = 0; i < flakeCount; i++) {
        const f = flakes[i]
        ctx.moveTo(f.x, f.y)
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true)
      }
      ctx.fill()

      angle += 0.01
      for (let i = 0; i < flakeCount; i++) {
        const f = flakes[i]
        f.y += Math.cos(angle + f.d) + 1 + f.r / 2
        f.x += Math.sin(angle) * 2

        if (f.x > width + 5 || f.x < -5 || f.y > height) {
          if (i % 3 > 0) {
            flakes[i] = { x: Math.random() * width, y: -10, r: f.r, d: f.d, vx: f.vx, vy: f.vy }
          } else {
            if (Math.sin(angle) > 0) {
              flakes[i] = { x: -5, y: Math.random() * height, r: f.r, d: f.d, vx: f.vx, vy: f.vy }
            } else {
              flakes[i] = { x: width + 5, y: Math.random() * height, r: f.r, d: f.d, vx: f.vx, vy: f.vy }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(update)
    }

    update()

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0 opacity-60"
    />
  )
}
