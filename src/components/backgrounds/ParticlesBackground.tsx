'use client'

import React, { useEffect, useRef } from 'react'
import type { AnimationConfig } from '@/types'

export default function ParticlesBackground({ config = {} }: { config?: AnimationConfig | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const density = typeof config?.density === 'number' ? config.density : 10000
  const linkDistance = typeof config?.linkDistance === 'number' ? config.linkDistance : 120
  const speed = typeof config?.speed === 'number' ? config.speed : 1

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = 1
    const rect = canvas.getBoundingClientRect()
    let width = rect.width || canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth
    let height = rect.height || canvas.clientHeight || canvas.parentElement?.clientHeight || window.innerHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = []
    const particleCount = Math.floor((width * height) / density)

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1 * speed,
        vy: (Math.random() - 0.5) * 1 * speed,
        radius: Math.random() * 2 + 1
      })
    }

    let animationFrameId: number

    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx = -p.vx
        if (p.y < 0 || p.y > height) p.vy = -p.vy

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < linkDistance) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - distance / (linkDistance * 5)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: w, height: h } = entry.contentRect
        if (w === 0 || h === 0) continue
        width = w
        height = h
        canvas.width = w * dpr
        canvas.height = h * dpr
        ctx.scale(dpr, dpr)
      }
    })
    resizeObserver.observe(canvas)

    return () => {
      resizeObserver.disconnect()
      cancelAnimationFrame(animationFrameId)
    }
  }, [density, linkDistance, speed])

  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
