'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { signup } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AuthCard } from '@/components/shared/AuthCard'
import { Loader2, Eye, EyeOff } from 'lucide-react'

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPasswordMatch(password === confirmPassword || confirmPassword === '')
  }, [password, confirmPassword])

  async function onSubmit(formData: FormData) {
    const password = formData.get('password') as string
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    setError(null)
    const result = await signup(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <AuthCard title="Create an Account" description="Join Branch to power your digital presence">
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

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-zinc-300 text-xs font-bold uppercase tracking-wider">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword" className="text-zinc-300 text-xs font-bold uppercase tracking-wider">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className={`rounded-xl border-white/5 bg-white/[0.03] text-white focus-visible:ring-brand-pink/50 h-12 transition-all duration-300 focus:bg-white/[0.05] hover:bg-white/[0.04] ${!passwordMatch ? 'border-red-500' : ''}`}
            />
            {!passwordMatch && (
              <p className="text-red-400 text-xs font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                Passwords do not match
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-95 text-white font-extrabold text-base shadow-lg shadow-brand-pink/10 hover:shadow-brand-pink/20 hover:scale-[1.01] active:scale-[0.99] transition-all border-0 mt-4 cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Creating account...</span>
              </div>
            ) : (
              'Sign up'
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col items-center border-t border-white/5 bg-black/20 pt-4 pb-8">
        <div className="text-xs text-zinc-400 font-medium">
          Already have an account?{' '}
          <Link href="/login" className="text-brand-pink hover:text-brand-orange transition-colors font-bold">
            Log in
          </Link>
        </div>
      </CardFooter>
    </AuthCard>
  )
}
