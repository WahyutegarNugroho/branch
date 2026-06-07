'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { resetPassword } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AuthCard } from '@/components/shared/AuthCard'
import { Loader2, Eye, EyeOff } from 'lucide-react'

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function onSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await resetPassword(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <AuthCard title="New Password" description="Enter your new password below">
      <CardContent>
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
            <Label htmlFor="password" className="text-zinc-300 text-xs font-bold uppercase tracking-wider">New Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                placeholder="Min. 6 characters"
                className="rounded-xl border-white/5 bg-white/[0.03] text-white focus-visible:ring-brand-pink/50 h-12 pr-12 transition-all duration-300 focus:bg-white/[0.05] hover:bg-white/[0.04]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-95 text-white font-extrabold text-base shadow-lg shadow-brand-pink/10 hover:shadow-brand-pink/20 hover:scale-[1.01] active:scale-[0.99] transition-all border-0 mt-4 cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Resetting...</span>
              </div>
            ) : (
              'Reset Password'
            )}
          </Button>
        </form>
      </CardContent>
    </AuthCard>
  )
}
