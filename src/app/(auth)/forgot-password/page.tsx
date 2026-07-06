'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { forgotPassword } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AuthCard } from '@/components/shared/AuthCard'
import { Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react'

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
    <AuthCard 
      title="Reset Password" 
      description={sent ? 'Check your email for the reset link' : "Enter your email and we'll send you a reset link"}
    >
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
                className="rounded-xl border-white/5 bg-white/[0.03] text-white focus-visible:ring-white/50 placeholder:text-zinc-600 h-12 transition-all duration-300 focus:bg-white/[0.05] hover:bg-white/[0.04]"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-white hover:bg-zinc-200 text-black font-extrabold text-base shadow-lg shadow-white/5 hover:shadow-white/10 hover:scale-[1.01] active:scale-[0.99] transition-all border-0 mt-4 cursor-pointer"
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

      <CardFooter className="flex flex-col items-center border-t border-white/5 bg-black/20 pt-4 pb-8">
        <Link href="/login" className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-medium">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to login
        </Link>
      </CardFooter>
    </AuthCard>
  )
}
