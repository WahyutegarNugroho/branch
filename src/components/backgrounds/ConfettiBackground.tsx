'use client'

import React, { useEffect, useRef } from 'react'

export default function ConfettiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    const confettiCount = 150
    const confetti: any[] = []
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
        c.tiltAngle += c.tiltAngleInc
        c.y += (Math.cos(c.tiltAngle) + c.dy + c.r / 2) / 2
        c.x += Math.sin(c.tiltAngle) * 2

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
