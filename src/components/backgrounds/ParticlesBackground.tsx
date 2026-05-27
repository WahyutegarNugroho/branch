'use client'

import React, { useEffect, useRef } from 'react'

export default function ParticlesBackground({ config = {} }: { config?: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const density = typeof config?.density === 'number' ? config.density : 10000
  const linkDistance = typeof config?.linkDistance === 'number' ? config.linkDistance : 120
  const speed = typeof config?.speed === 'number' ? config.speed : 1

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    const particles: any[] = []
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

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [density, linkDistance, speed])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen"
    />
  )
}
