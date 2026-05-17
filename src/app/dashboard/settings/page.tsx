import { getProfile } from '@/app/actions/profile-actions'
import { redirect } from 'next/navigation'
import { SettingsForm } from '@/components/dashboard/SettingsForm'

export const revalidate = 0 // Real-time values

export default async function SettingsPage() {
  const profile = await getProfile()

  if (!profile) {
    redirect('/login')
  }

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Settings</h1>
        <p className="text-zinc-400 text-base mt-1">Configure your custom SEO tags, web tracking pixels, and custom domains.</p>
      </div>

      <SettingsForm profile={profile} />
    </div>
  )
}
