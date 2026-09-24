import { LivePreview } from '@/components/dashboard/LivePreview'
import type { Profile, Link } from '@/types'

export default function LivePreviewWrapper({ profile, links = [] }: { profile: Profile | null; links?: Link[] }) {
  return <LivePreview profile={profile} links={links} />
}
