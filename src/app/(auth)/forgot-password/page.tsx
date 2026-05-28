'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { forgotPassword } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Zap, ArrowLeft, CheckCircle2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function onSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await forgotPassword(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else if (result?.success) {
      setSent(true)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-50 relative overflow-hidden font-sans-theme">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <div className="absolute top-[-25%] left-[-15%] w-[60%] h-[60%] rounded-full bg-brand-pink/15 blur-[130px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[-25%] right-[-15%] w-[60%] h-[60%] rounded-full bg-brand-orange/15 blur-[130px] animate-pulse" style={{ animationDuration: '14s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md px-4 z-10"
      >
        <Card className="w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 bg-zinc-900/60 backdrop-blur-2xl rounded-3xl overflow-hidden relative">
          {/* Card Top Border Glow Accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-brand-pink via-brand-orange to-brand-pink bg-[length:200%_auto] animate-pulse" />

          <CardHeader className="space-y-2 pb-6 pt-8 text-center">
            <div className="mx-auto w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-pink to-brand-orange flex items-center justify-center shadow-lg shadow-brand-pink/20 mb-3">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-3xl font-display-theme font-black tracking-tight text-white">Reset Password</CardTitle>
            <CardDescription className="text-zinc-400 text-sm font-medium">
              {sent ? 'Check your email for the reset link' : "Enter your email and we'll send you a reset link"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-6"
              >
                <CheckCircle2 className="w-16 h-16 text-emerald-400" />
                <p className="text-sm text-zinc-300 text-center max-w-xs">
                  If an account with that email exists, you will receive a password reset link shortly.
                </p>
              </motion.div>
            ) : (
              <form action={onSubmit} className="space-y-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400 rounded-xl">
                      <AlertDescription className="text-xs font-semibold">{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-zinc-300 text-xs font-bold uppercase tracking-wider">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="rounded-xl border-white/5 bg-white/[0.03] text-white focus-visible:ring-brand-pink/50 placeholder:text-zinc-600 h-12 transition-all duration-300 focus:bg-white/[0.05] hover:bg-white/[0.04]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-95 text-white font-extrabold text-base shadow-lg shadow-brand-pink/10 hover:shadow-brand-pink/20 hover:scale-[1.01] active:scale-[0.99] transition-all border-0 mt-4 cursor-pointer"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </form>
            )}
          </CardContent>

          <CardFooter className="flex flex-col items-center pt-4 pb-8 border-t border-white/5 bg-black/20">
            <Link href="/login" className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-medium">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to login
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
