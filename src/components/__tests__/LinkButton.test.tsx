import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LinkButton } from '../public/LinkButton'

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { fill, ...rest } = props
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...rest} data-fill={fill ? 'true' : undefined} />
  },
}))

vi.mock('@/utils/platforms', () => ({
  getPlatformByName: () => undefined,
}))

describe('LinkButton', () => {
  const baseLink = {
    id: 'link-1',
    profile_id: 'profile-1',
    title: 'My Website',
    url: 'https://example.com',
    is_active: true,
    sort_order: 0,
    is_embed: false,
    valid_from: null,
    valid_until: null,
    created_at: '2024-01-01',
    show_icon: false,
    icon_position: 'left_far' as const,
    link_type: 'link' as const,
    is_spotlight: false,
    is_sticky_cta: false,
  }

  const baseProfile = {
    id: 'profile-1',
    username: 'testuser',
    full_name: 'Test User',
    bio: null,
    avatar_url: null,
    bg_type: 'solid' as const,
    bg_color: '#09090b',
    bg_image_url: null,
    bg_overlay_opacity: 0,
    role: 'user' as const,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    theme_lock: false,
    glass_blur: 10,
    glass_opacity: 20,
  }

  it('renders a regular link', () => {
    render(<LinkButton link={baseLink} profileId="profile-1" profile={baseProfile} />)
    expect(screen.getByText('My Website')).toBeDefined()
  })

  it('renders a header link', () => {
    render(
      <LinkButton
        link={{ ...baseLink, link_type: 'header' }}
        profileId="profile-1"
        profile={baseProfile}
      />
    )
    expect(screen.getByText('My Website')).toBeDefined()
  })

  it('renders an embed link', () => {
    render(
      <LinkButton
        link={{
          ...baseLink,
          is_embed: true,
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        }}
        profileId="profile-1"
        profile={baseProfile}
      />
    )
    const iframe = document.querySelector('iframe')
    expect(iframe).not.toBeNull()
  })

  it('does not call fetch when isPreview is true', () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    render(
      <LinkButton
        link={baseLink}
        profileId="profile-1"
        profile={baseProfile}
        isPreview
      />
    )
    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })
})
