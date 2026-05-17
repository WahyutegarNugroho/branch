'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signup } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Eye, EyeOff } from 'lucide-react'

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function onSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await signup(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-50 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-pink/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-orange/20 blur-[120px]" />
      </div>

      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-white/10 bg-zinc-900/80 backdrop-blur-xl z-10">
        <CardHeader className="space-y-1 pb-8">
          <CardTitle className="text-3xl font-extrabold tracking-tight text-center text-white">Create an account</CardTitle>
          <CardDescription className="text-center text-zinc-400 text-base">
            Enter your email and password to sign up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={onSubmit} className="space-y-5">
            {error && (
              <Alert variant="destructive" className="bg-red-500/10 border-red-500/50 text-red-400">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                className="rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-brand-pink placeholder:text-zinc-600 h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="rounded-xl border-white/10 bg-white/5 text-white focus-visible:ring-brand-pink h-12 pr-12"
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
            <Button type="submit" className="w-full h-12 rounded-xl bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-90 transition-opacity text-white font-bold text-lg border-0 mt-4" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Sign up'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center pt-6 pb-2">
          <div className="text-sm text-zinc-400">
            Already have an account?{' '}
            <Link href="/login" className="text-brand-pink hover:text-brand-orange transition-colors font-semibold">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
