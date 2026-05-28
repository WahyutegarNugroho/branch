import { describe, it, expect } from 'vitest'
import {
  updateLinkSchema,
  updateAppearanceSchema,
  updateProfileInfoSchema,
  updateSocialLinksSchema,
  updateSettingsSchema,
  createLinkSchema,
} from '../validations'

describe('updateLinkSchema', () => {
  it('accepts valid input', () => {
    const result = updateLinkSchema.safeParse({
      title: 'My Link',
      url: 'https://example.com',
      is_active: true,
    })
    expect(result.success).toBe(true)
  })

  it('rejects empty title', () => {
    const result = updateLinkSchema.safeParse({
      title: '',
      url: 'https://example.com',
    })
    expect(result.success).toBe(false)
  })

  it('rejects title over 100 chars', () => {
    const result = updateLinkSchema.safeParse({
      title: 'x'.repeat(101),
      url: 'https://example.com',
    })
    expect(result.success).toBe(false)
  })

  it('applies defaults for missing fields', () => {
    const result = updateLinkSchema.safeParse({ title: 'Test', url: 'https://example.com' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.is_active).toBe(true)
      expect(result.data.is_embed).toBe(false)
      expect(result.data.show_icon).toBe(true)
      expect(result.data.is_spotlight).toBe(false)
      expect(result.data.is_sticky_cta).toBe(false)
    }
  })

  it('accepts boolean string values via coerce', () => {
    const result = updateLinkSchema.safeParse({
      title: 'Test',
      url: 'https://example.com',
      is_active: 'on',
    })
    // is_active is z.boolean(), which won't coerce 'on'
    // Only success if 'on' is truthy for z.boolean - it's not
    // z.boolean() only accepts true/false
    expect(result.success).toBe(false)
  })

  it('accepts optional color fields as null', () => {
    const result = updateLinkSchema.safeParse({
      title: 'Test',
      url: 'https://example.com',
      bg_color: null,
      text_color: null,
    })
    expect(result.success).toBe(true)
  })

  it('accepts numeric bg_opacity', () => {
    const result = updateLinkSchema.safeParse({
      title: 'Test',
      url: 'https://example.com',
      bg_opacity: 50,
    })
    expect(result.success).toBe(true)
  })

  it('rejects bg_opacity out of range', () => {
    const result = updateLinkSchema.safeParse({
      title: 'Test',
      url: 'https://example.com',
      bg_opacity: 150,
    })
    expect(result.success).toBe(false)
  })

  it('accepts valid icon_position', () => {
    const result = updateLinkSchema.safeParse({
      title: 'Test',
      url: 'https://example.com',
      icon_position: 'left',
    })
    expect(result.success).toBe(true)
  })

  it('rejects invalid icon_position', () => {
    const result = updateLinkSchema.safeParse({
      title: 'Test',
      url: 'https://example.com',
      icon_position: 'invalid',
    })
    expect(result.success).toBe(false)
  })
})

describe('updateAppearanceSchema', () => {
  const validInput = {
    bg_type: 'solid',
    bg_color: '#09090b',
    bg_overlay_opacity: 0,
    button_shape: 'rounded-2xl',
    button_style: 'soft',
    font_family: 'font-sans-theme',
    text_color: '#ffffff',
    social_style: 'circle',
    profile_align: 'center',
    avatar_shape: 'circle',
    link_spacing: 'normal',
    avatar_size: 'medium',
    layout_type: 'list',
  }

  it('accepts valid input', () => {
    const result = updateAppearanceSchema.safeParse(validInput)
    expect(result.success).toBe(true)
  })

  it('rejects invalid bg_type', () => {
    const result = updateAppearanceSchema.safeParse({ ...validInput, bg_type: 'invalid' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid button_shape', () => {
    const result = updateAppearanceSchema.safeParse({ ...validInput, button_shape: 'round' })
    expect(result.success).toBe(false)
  })

  it('coerces numeric string values', () => {
    const result = updateAppearanceSchema.safeParse({
      ...validInput,
      bg_overlay_opacity: '50',
      glass_blur: '15',
      glass_opacity: '30',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.bg_overlay_opacity).toBe(50)
      expect(result.data.glass_blur).toBe(15)
      expect(result.data.glass_opacity).toBe(30)
    }
  })

  it('accepts optional config fields', () => {
    const result = updateAppearanceSchema.safeParse({
      ...validInput,
      bg_animation: 'snow',
      bg_animation_config: { speed: 1, flakeCount: 50 },
      avatar_frame: 'none',
      avatar_frame_config: { color1: '#ff0000' },
    })
    expect(result.success).toBe(true)
  })

  it('accepts theme_lock boolean', () => {
    const result = updateAppearanceSchema.safeParse({ ...validInput, theme_lock: true })
    expect(result.success).toBe(true)
  })
})

describe('createLinkSchema', () => {
  it('defaults to link type', () => {
    const result = createLinkSchema.safeParse({})
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.linkType).toBe('link')
    }
  })

  it('accepts header type', () => {
    const result = createLinkSchema.safeParse({ linkType: 'header' })
    expect(result.success).toBe(true)
  })
})

describe('updateProfileInfoSchema', () => {
  it('accepts valid username', () => {
    const result = updateProfileInfoSchema.safeParse({ username: 'johndoe' })
    expect(result.success).toBe(true)
  })

  it('rejects short username', () => {
    const result = updateProfileInfoSchema.safeParse({ username: 'ab' })
    expect(result.success).toBe(false)
  })

  it('rejects username with uppercase', () => {
    const result = updateProfileInfoSchema.safeParse({ username: 'JohnDoe' })
    expect(result.success).toBe(false)
  })

  it('rejects blacklisted username', () => {
    const result = updateProfileInfoSchema.safeParse({ username: 'admin' })
    expect(result.success).toBe(false)
  })

  it('accepts bio up to 500 chars', () => {
    const result = updateProfileInfoSchema.safeParse({ username: 'testuser', bio: 'a'.repeat(500) })
    expect(result.success).toBe(true)
  })

  it('rejects bio over 500 chars', () => {
    const result = updateProfileInfoSchema.safeParse({ username: 'testuser', bio: 'a'.repeat(501) })
    expect(result.success).toBe(false)
  })
})

describe('updateSocialLinksSchema', () => {
  it('accepts record of URL strings', () => {
    const result = updateSocialLinksSchema.safeParse({
      github: 'https://github.com/user',
      twitter: 'https://twitter.com/user',
    })
    expect(result.success).toBe(true)
  })

  it('rejects non-string values', () => {
    const result = updateSocialLinksSchema.safeParse({ github: 123 })
    expect(result.success).toBe(false)
  })
})

describe('updateSettingsSchema', () => {
  it('accepts valid settings', () => {
    const result = updateSettingsSchema.safeParse({
      seo_title: 'My Page',
      seo_description: 'A cool page',
    })
    expect(result.success).toBe(true)
  })

  it('rejects overlong seo_title', () => {
    const result = updateSettingsSchema.safeParse({ seo_title: 'x'.repeat(256) })
    expect(result.success).toBe(false)
  })
})
