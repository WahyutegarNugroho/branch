import { AppearanceManager } from '@/components/dashboard/AppearanceManager'
import { getProfile } from '@/app/actions/profile-actions'
import { redirect } from 'next/navigation'

export default async function AppearancePage() {
  const profile = await getProfile()
  if (!profile) redirect('/login')

  return (
    <div className="space-y-6 font-sans-theme">
      <div>
        <h1 className="text-3xl font-display-theme font-black tracking-tight text-white">Appearance</h1>
        <p className="text-zinc-400 text-base mt-1">Manage your profile information and page appearance.</p>
      </div>
      <AppearanceManager profile={profile} />
    </div>
  )
}
