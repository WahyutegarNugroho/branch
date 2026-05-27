import { z } from 'zod'

export const hexColor = z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid hex color').nullable().optional()

export const bgTypeEnum = z.enum(['solid', 'gradient', 'image', 'video'])

export const buttonShapeEnum = z.enum(['rounded-none', 'rounded-xl', 'rounded-3xl', 'rounded-full', 'rounded-2xl', 'cut-corners', 'leaf', 'hexagon'])

export const buttonStyleEnum = z.enum(['fill', 'outline', 'soft', 'shadow', 'neumorphism', 'glassmorphism', 'neon', 'brutalism', 'claymorphism'])

export const fontFamilyEnum = z.enum(['font-sans-theme', 'font-display-theme', 'font-serif-theme', 'font-mono-theme', 'font-handwriting', 'font-comic', 'font-elegant', 'font-pixel'])

export const iconPositionEnum = z.enum(['left', 'left_far', 'right', 'right_far', 'left_near', 'right_near'])

export const socialStyleEnum = z.enum(['circle', 'outline', 'square', 'minimal'])

export const profileAlignEnum = z.enum(['center', 'left', 'right'])

export const avatarShapeEnum = z.enum(['circle', 'rounded', 'hexagon'])

export const linkSpacingEnum = z.enum(['compact', 'normal', 'relaxed'])

export const avatarSizeEnum = z.enum(['small', 'medium', 'large'])

export const layoutTypeEnum = z.enum(['list', 'grid'])

export const linkTypeEnum = z.enum(['link', 'header', 'carousel'])

export const animationEnum = z.enum(['none', 'pulse', 'bounce', 'shake', 'wobble', 'glow'])

const usernameRegex = /^[a-z0-9_-]+$/
export const usernameBlacklist = ['admin', 'api', 'dashboard', 'login', 'register', 'auth', 'settings', 'appearance', 'analytics', 'static', 'assets', 'cdn', 'www', 'support', 'help', 'test']

export const createLinkSchema = z.object({
  linkType: z.enum(['link', 'header', 'carousel']).default('link'),
})

export const updateLinkSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  url: z.string().max(2048, 'URL too long').default(''),
  is_active: z.boolean().default(true),
  icon_position: iconPositionEnum.default('left_far'),
  is_embed: z.boolean().default(false),
  show_icon: z.boolean().default(true),
  bg_color: z.string().nullable().optional(),
  text_color: z.string().nullable().optional(),
  bg_opacity: z.number().int().min(0).max(100).nullable().optional(),
  icon_color: z.string().max(50).nullable().optional(),
  thumbnail_url: z.string().max(2048).nullable().optional(),
  link_type: linkTypeEnum.optional(),
  embed_type: z.string().max(50).nullable().optional(),
  is_spotlight: z.boolean().default(false),
  spotlight_color: z.string().nullable().optional(),
  animation: z.string().nullable().optional(),
  valid_from: z.string().nullable().optional(),
  valid_until: z.string().nullable().optional(),
  is_sticky_cta: z.boolean().default(false),
})

export const updateAppearanceSchema = z.object({
  bg_type: bgTypeEnum,
  bg_color: z.string().min(1).max(500).default('#09090b'),
  bg_image_url: z.string().max(2048).nullable().optional(),
  bg_overlay_opacity: z.coerce.number().int().min(0).max(100).default(0),
  button_shape: buttonShapeEnum.default('rounded-2xl'),
  button_style: buttonStyleEnum.default('soft'),
  font_family: fontFamilyEnum.default('font-sans-theme'),
  text_color: z.string().default('#ffffff'),
  social_style: socialStyleEnum.default('circle'),
  profile_align: profileAlignEnum.default('center'),
  avatar_shape: avatarShapeEnum.default('circle'),
  banner_url: z.string().max(2048).nullable().optional(),
  link_spacing: linkSpacingEnum.default('normal'),
  avatar_size: avatarSizeEnum.default('medium'),
  bg_video_url: z.string().max(2048).nullable().optional(),
  layout_type: layoutTypeEnum.default('list'),
  glass_blur: z.coerce.number().int().min(0).max(50).default(10).optional(),
  glass_opacity: z.coerce.number().int().min(0).max(100).default(20).optional(),
})

export const updateProfileInfoSchema = z.object({
  full_name: z.string().max(100, 'Name too long').nullable().optional(),
  bio: z.string().max(500, 'Bio too long').nullable().optional(),
  avatar_url: z.string().max(2048).nullable().optional(),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username too long (max 30)')
    .regex(usernameRegex, 'Only lowercase letters, numbers, underscores, and hyphens allowed')
    .refine(u => !usernameBlacklist.includes(u.toLowerCase()), 'This username is protected'),
})

export const updateSocialLinksSchema = z.record(z.string(), z.string().max(2048))

export const updateSettingsSchema = z.object({
  seo_title: z.string().max(255).nullable().optional(),
  seo_description: z.string().max(500).nullable().optional(),
  meta_pixel_id: z.string().max(100).nullable().optional(),
  tiktok_pixel_id: z.string().max(100).nullable().optional(),
  ga_measurement_id: z.string().max(100).nullable().optional(),
  custom_domain: z.string().max(255).nullable().optional(),
})
