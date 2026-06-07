'use client'

import React, { useEffect, useRef } from 'react'
import type { AnimationConfig } from '@/types'

const colorSets = [
  [
    'rgba(0, 255, 180, 0.7)',
    'rgba(0, 150, 255, 0.7)',
    'rgba(180, 0, 255, 0.7)',
    'rgba(0, 255, 100, 0.7)',
    'rgba(255, 50, 150, 0.7)'
  ],
  [
    'rgba(100, 0, 255, 0.7)',
    'rgba(0, 200, 255, 0.7)',
    'rgba(50, 255, 200, 0.7)',
    'rgba(255, 0, 150, 0.7)',
    'rgba(0, 100, 255, 0.7)'
  ],
  [
    'rgba(0, 255, 200, 0.7)',
    'rgba(150, 0, 255, 0.7)',
    'rgba(255, 100, 0, 0.7)',
    'rgba(0, 255, 50, 0.7)',
    'rgba(200, 0, 255, 0.7)'
  ]
]

export default function AuroraBackground({ config = {} }: { config?: AnimationConfig | null }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const themeIndex = typeof config?.theme === 'number' ? config.theme : 0
  const speed = typeof config?.speed === 'number' ? config.speed : 1

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    let currentColorSet = themeIndex % colorSets.length
    const auroras: HTMLDivElement[] = []
    const animationFrames: number[] = []


    for (let i = 0; i < 5; i++) {
      const aurora = document.createElement('div')
      aurora.className = 'absolute opacity-0 rounded-full w-full h-full'
      aurora.style.filter = 'blur(60px)'
      aurora.style.willChange = 'transform, opacity'
      aurora.style.transition = 'opacity 8s ease-in-out'
      aurora.style.background = colorSets[currentColorSet][i]
      aurora.style.top = '0'
      aurora.style.left = '0'
      container.appendChild(aurora)
      auroras.push(aurora)

      setTimeout(() => {
        if (aurora) aurora.style.opacity = '0.7'
      }, i * 300)

      animateAurora(aurora, i)
    }

    function animateAurora(element: HTMLDivElement, index: number) {
      let x = Math.random() * 100
      let y = Math.random() * 100
      let xSpeed = (Math.random() - 0.5) * 0.1 * speed
      let ySpeed = (Math.random() - 0.5) * 0.1 * speed

      function update() {
        x += xSpeed
        y += ySpeed

        if (Math.random() < 0.005 * speed) {
          xSpeed = (Math.random() - 0.5) * 0.1 * speed
          ySpeed = (Math.random() - 0.5) * 0.1 * speed
        }

        if (x > 120) x = -20
        if (x < -20) x = 120
        if (y > 120) y = -20
        if (y < -20) y = 120

        const parallaxFactor = 0.5 + (index * 0.1)
        element.style.transform = `translate(${x * parallaxFactor}%, ${y * parallaxFactor}%) scale(${1 + Math.sin(Date.now() * 0.001 * speed * (index + 1)) * 0.2})`

        const frame = requestAnimationFrame(update)
        animationFrames[index] = frame
      }
      update()
    }

    const intervalId = setInterval(() => {
      currentColorSet = (currentColorSet + 1) % colorSets.length
      auroras.forEach(aurora => {
        if (aurora) aurora.style.opacity = '0'
      })

      setTimeout(() => {
        auroras.forEach((aurora, index) => {
          if (aurora) {
            aurora.style.background = colorSets[currentColorSet][index]
            aurora.style.opacity = '0.7'
          }
        })
      }, 800)
    }, 15000 / speed)

    return () => {
      clearInterval(intervalId)
      animationFrames.forEach(frame => cancelAnimationFrame(frame))
      if (container) container.innerHTML = ''
    }
  }, [speed, themeIndex])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-80 mix-blend-screen"
    />
  )
}
