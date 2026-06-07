'use client'

import { useState } from 'react'
import { updateSettings } from '@/app/actions/profile-actions'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { 
  Globe, 
  Search, 
  LineChart, 
  Save, 
  Loader2, 
  Server, 
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react'
import { toast } from 'sonner'

import type { Profile } from '@/types'

export function SettingsForm({ profile }: { profile: Profile | null }) {
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [customDomain, setCustomDomain] = useState(profile.custom_domain || '')
  const [domainVerified, setDomainVerified] = useState(profile.domain_verified || false)

  const handleVerify = async () => {
    if (!customDomain.trim()) return
    setVerifying(true)
    try {
      const res = await fetch('/api/verify-domain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: customDomain.toLowerCase().trim() }),
      })
      const data = await res.json()
      if (data.error) {
        toast.error(`Verification failed: ${data.error}`)
      } else if (data.verified) {
        setDomainVerified(true)
        toast.success('Domain verified successfully!')
      } else {
        setDomainVerified(false)
        toast.error('TXT record not found. Make sure you added the correct record and DNS has propagated.')
      }
    } catch {
      toast.error('Failed to verify domain')
    } finally {
      setVerifying(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await updateSettings(formData)
      if (res?.error) {
        toast.error(`Failed to save: ${res.error}`)
      } else {
        toast.success('Settings successfully saved!')
      }
    } catch {
      toast.error('A server connection error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-[800px] font-sans-theme">
      
      {/* 1. Custom SEO Settings */}
      <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-display-theme font-black text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-brand-pink" />
            Custom SEO & Meta Tags
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Improve your Google search visibility with custom title and metadata description.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300">SEO Page Title (Title Tag)</label>
            <Input 
              name="seo_title"
              placeholder={profile.full_name || `@${profile.username}`}
              defaultValue={profile.seo_title || ''}
              className="bg-zinc-950 border-white/10 rounded-xl text-white focus-visible:ring-brand-pink"
            />
            <p className="text-[10px] text-zinc-500">Recommended under 60 characters for best Google search results.</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300">SEO Page Description (Meta Description)</label>
            <Textarea 
              name="seo_description"
              placeholder={profile.bio || "Connect and view all important links in one place."}
              defaultValue={profile.seo_description || ''}
              className="bg-zinc-950 border-white/10 rounded-xl text-white min-h-[80px] focus-visible:ring-brand-pink"
            />
            <p className="text-[10px] text-zinc-500">Recommended under 160 characters to provide a clear summary in search engine results.</p>
          </div>
        </CardContent>
      </Card>

      {/* 2. Retargeting & Tracking Pixels */}
      <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-display-theme font-black text-white flex items-center gap-2">
            <LineChart className="w-5 h-5 text-brand-orange" />
            Pixel & Web Tracking Integration
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Link your marketing ad accounts to record visitor behavior instantly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Meta Pixel (Facebook Pixel ID)
            </label>
            <Input 
              name="meta_pixel_id"
              placeholder="Example: 123456789012345"
              defaultValue={profile.meta_pixel_id || ''}
              className="bg-zinc-950 border-white/10 rounded-xl text-white focus-visible:ring-blue-500"
            />
            <p className="text-[10px] text-zinc-500">Record visits from Facebook & Instagram platforms to optimize ad delivery.</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              TikTok Pixel ID
            </label>
            <Input 
              name="tiktok_pixel_id"
              placeholder="Example: C52A6F18B3E49"
              defaultValue={profile.tiktok_pixel_id || ''}
              className="bg-zinc-950 border-white/10 rounded-xl text-white focus-visible:ring-red-500"
            />
            <p className="text-[10px] text-zinc-500">Track promotional campaign conversions and target audiences on TikTok.</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Google Analytics Measurement ID
            </label>
            <Input 
              name="ga_measurement_id"
              placeholder="Example: G-A1B2C3D4E5"
              defaultValue={profile.ga_measurement_id || ''}
              className="bg-zinc-950 border-white/10 rounded-xl text-white focus-visible:ring-emerald-500"
            />
            <p className="text-[10px] text-zinc-500">Connect Google Analytics (GA4) properties to monitor demographics & detailed visitor analysis.</p>
          </div>
        </CardContent>
      </Card>

      {/* 3. Custom Domain Configuration */}
      <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-display-theme font-black text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />
            Custom Domain Integration
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Access your premium bio page using your own personal domain name (example: bio.yourname.com).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300">Your Custom Domain Name</label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input 
                  name="custom_domain"
                  placeholder="bio.yourname.com"
                  value={customDomain}
                  onChange={(e) => {
                    setCustomDomain(e.target.value)
                    setDomainVerified(false)
                  }}
                  className="bg-zinc-950 border-white/10 rounded-xl text-white focus-visible:ring-blue-400 pr-10"
                />
                {domainVerified && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleVerify}
                disabled={verifying || !customDomain.trim()}
                className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white rounded-xl h-10 text-xs shrink-0"
              >
                {verifying ? (
                  <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />Verifying</>
                ) : (
                  <><ShieldCheck className="w-3.5 h-3.5 mr-1.5" />Verify</>
                )}
              </Button>
            </div>
            {customDomain.trim() && (
              <p className="text-xs text-emerald-400 flex items-center gap-1.5 mt-1">
                {domainVerified ? (
                  <><ShieldCheck className="w-3.5 h-3.5 shrink-0" /><span className="font-bold">Verified</span><span> — page accessible at:</span><span className="font-bold underline">https://{customDomain.toLowerCase().trim()}</span></>
                ) : (
                  <><CheckCircle className="w-3.5 h-3.5 shrink-0" /><span>Page will be ready to access at:</span><span className="font-bold underline">https://{customDomain.toLowerCase().trim()}</span></>
                )}
              </p>
            )}
          </div>

          {/* DNS Instructions Panel */}
          <div className="bg-zinc-950/60 p-4 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-300">
              <Server className="w-4 h-4 text-blue-400" />
              DNS Server Configuration Guide:
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Open your domain registrar (e.g., Niagahoster, GoDaddy, Cloudflare) and add the following DNS records:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] font-mono text-zinc-300">
                <thead>
                  <tr className="border-b border-white/5 text-zinc-500 font-bold">
                    <th className="pb-1.5">Type</th>
                    <th className="pb-1.5">Name (Host/Name)</th>
                    <th className="pb-1.5">Value/Target</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-zinc-200">
                    <td className="py-2 font-bold text-blue-400">CNAME</td>
                    <td className="py-2">@ or subdomain (e.g., bio)</td>
                    <td className="py-2">cname.branch.bio</td>
                  </tr>
                  <tr className="text-zinc-200 border-t border-white/5">
                    <td className="py-2 font-bold text-emerald-400">TXT</td>
                    <td className="py-2">@ or your subdomain</td>
                    <td className="py-2 text-emerald-300 font-mono">{'branch-verification='}{profile.id || 'YOUR_USER_ID'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-brand-orange/10 rounded-lg border border-brand-orange/20 flex gap-2.5">
              <AlertTriangle className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
              <p className="text-[10px] text-brand-orange/90 leading-relaxed">
                <strong>Important Note:</strong> DNS changes require an internet propagation time of 1 - 24 hours before your custom domain can be accessed worldwide. Click &ldquo;Verify&rdquo; after you have added the TXT record.
              </p>
            </div>
            {domainVerified && (
              <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20 flex gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-[10px] text-emerald-300/90 leading-relaxed">
                  <strong>Domain verified!</strong> Your custom domain is active and pointing to your profile.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Form Submission Button */}
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={loading}
          className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-6 py-2.5 rounded-full transition-all duration-200 shadow-lg shadow-white/5 active:scale-95 flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </Button>
      </div>

    </form>
  )
}
