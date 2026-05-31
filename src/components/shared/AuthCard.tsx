'use client'

import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

interface AuthCardProps {
  title: string
  description: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 bg-zinc-900/60 backdrop-blur-2xl rounded-3xl overflow-hidden relative">
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-brand-pink via-brand-orange to-brand-pink bg-[length:200%_auto] animate-pulse" />

        <CardHeader className="space-y-2 pb-6 pt-8 text-center">
          <div className="mx-auto w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-pink to-brand-orange flex items-center justify-center shadow-lg shadow-brand-pink/20 mb-3">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-3xl font-display-theme font-black tracking-tight text-white">{title}</CardTitle>
          <CardDescription className="text-zinc-400 text-sm font-medium">{description}</CardDescription>
        </CardHeader>

        {children}

        {footer && (
          <div className="border-t border-white/5 bg-black/20 pt-4 pb-8 px-6 text-center">
            {footer}
          </div>
        )}
      </Card>
    </motion.div>
  )
}
