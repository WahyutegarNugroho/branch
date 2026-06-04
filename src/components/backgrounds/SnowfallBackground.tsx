'use client'

import React, { useEffect, useRef } from 'react'
import type { AnimationConfig } from '@/types'

export default function SnowfallBackground({ config = {} }: { config?: AnimationConfig | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const flakeCount = typeof config?.flakeCount === 'number' ? config.flakeCount : 100
  const speed = typeof config?.speed === 'number' ? config.speed : 1
  const wind = config?.wind || 'right'

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    let width = rect.width || canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth
    let height = rect.height || canvas.clientHeight || canvas.parentElement?.clientHeight || window.innerHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const flakes: { x: number; y: number; r: number; d: number; vx: number; vy: number }[] = []

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

      angle += 0.01 * speed
      for (let i = 0; i < flakeCount; i++) {
        const f = flakes[i]
        f.y += (Math.cos(angle + f.d) + 1 + f.r / 2) * speed

        let windFactor = Math.sin(angle) * 2
        if (wind === 'left') windFactor = -Math.abs(windFactor) - 1
        if (wind === 'right') windFactor = Math.abs(windFactor) + 1
        if (wind === 'none') windFactor = 0

        f.x += windFactor * speed

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
      const rect = canvas.getBoundingClientRect()
      width = rect.width || canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth
      height = rect.height || canvas.clientHeight || canvas.parentElement?.clientHeight || window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [flakeCount, speed, wind])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-60"
    />
  )
}
