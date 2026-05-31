'use client'

import type { FormEvent } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Loader2, Lock } from 'lucide-react'

interface BrandingSectionProps {
  plan: string | null | undefined
  showBranding: boolean
  setShowBranding: (val: boolean) => void
  brandingLoading: boolean
  onBrandingSubmit: (e: FormEvent) => Promise<void>
}

export function BrandingSection({
  plan,
  showBranding,
  setShowBranding,
  brandingLoading,
  onBrandingSubmit,
}: BrandingSectionProps) {
  return (
    <Card className="rounded-2xl shadow-sm border-white/10 bg-zinc-900/50 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
      <CardHeader>
        <CardTitle className="text-xl text-white font-display-theme font-black flex items-center gap-2">
          🏷️ White-label Branding
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Hide the &quot;Powered by Branch&quot; branding from your profile page.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onBrandingSubmit} className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-zinc-950/40 border border-white/5 rounded-2xl">
            <div className="space-y-0.5">
              <span className="text-sm font-bold text-white flex items-center gap-1.5">
                {plan !== 'premium' && <Lock className="h-3.5 w-3.5 text-zinc-500" />}
                Show Branch Branding
              </span>
              <p className="text-[11px] text-zinc-400 max-w-sm">
                {plan === 'premium'
                  ? 'Turn off this option to hide the Branch branding at the bottom of your public profile.'
                  : 'Upgrade to premium to hide the Branch branding from your profile.'}
              </p>
            </div>
            <Switch
              id="show_branding"
              checked={showBranding}
              onCheckedChange={setShowBranding}
              disabled={plan !== 'premium'}
              className="data-[state=checked]:bg-brand-pink"
            />
          </div>
          <Button type="submit" disabled={brandingLoading} className="rounded-xl bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-90 text-white border-0 font-semibold h-11 px-6 shadow-lg">
            {brandingLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Branding'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
