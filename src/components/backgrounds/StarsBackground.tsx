'use client'

import React, { useEffect, useRef } from 'react'
import type { AnimationConfig } from '@/types'

export default function StarsBackground({ config = {} }: { config?: AnimationConfig | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const numStars = typeof config?.starCount === 'number' ? config.starCount : 200
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

    const stars: { x: number; y: number; r: number; dx: number; dy: number; alpha: number; deltaAlpha: number }[] = []

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5,
        dx: (Math.random() - 0.5) * 0.2 * speed,
        dy: ((Math.random() - 0.5) * 0.2 + 0.1) * speed,
        alpha: Math.random(),
        deltaAlpha: (Math.random() - 0.5) * 0.02
      })
    }

    let animationFrameId: number

    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, width, height)

      stars.forEach(star => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(Math.sin(star.alpha))})`
        ctx.fill()

        star.x += star.dx
        star.y += star.dy
        star.alpha += star.deltaAlpha

        if (star.x < 0) star.x = width
        if (star.x > width) star.x = 0
        if (star.y < 0) star.y = height
        if (star.y > height) star.y = 0
      })

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
  }, [numStars, speed])

  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-80">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
