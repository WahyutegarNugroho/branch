'use client'

import React, { useEffect, useRef } from 'react'
import type { AnimationConfig } from '@/types'

export default function ConfettiBackground({ config = {} }: { config?: AnimationConfig | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const confettiCount = typeof config?.confettiCount === 'number' ? config.confettiCount : 150
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

    const confetti: {
      x: number; y: number; r: number; dx: number; dy: number
      color: string; tilt: number; tiltAngle: number; tiltAngleInc: number
    }[] = []
    const colors = ['#fce18a', '#ff726d', '#b48def', '#f4306d', '#00ffaa']

    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 6 + 2,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 10,
        tiltAngle: 0,
        tiltAngleInc: (Math.random() * 0.07) + 0.05
      })
    }

    let animationFrameId: number

    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, width, height)

      confetti.forEach((c) => {
        c.tiltAngle += c.tiltAngleInc * speed
        c.y += ((Math.cos(c.tiltAngle) + c.dy + c.r / 2) / 2) * speed
        c.x += Math.sin(c.tiltAngle) * 2 * speed

        if (c.y > height) {
          c.x = Math.random() * width
          c.y = -20
          c.tilt = Math.random() * 10 - 10
        }

        ctx.beginPath()
        ctx.lineWidth = c.r
        ctx.strokeStyle = c.color
        ctx.moveTo(c.x + c.tilt + c.r, c.y)
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r)
        ctx.stroke()
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
  }, [confettiCount, speed])

  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-60">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
