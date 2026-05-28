import { describe, it, expect } from 'vitest'
import { hexToRgba, hexToRgb, rgbToHex, rgbToHsb, rgbToCmyk, hsbToRgb, hsbToHex } from '../color-utils'

describe('hexToRgba', () => {
  it('converts full hex to rgba', () => {
    expect(hexToRgba('#ff0000', 50)).toBe('rgba(255, 0, 0, 0.5)')
  })

  it('converts shorthand hex to rgba', () => {
    expect(hexToRgba('#f00', 100)).toBe('rgba(255, 0, 0, 1)')
  })

  it('returns fallback for invalid hex', () => {
    expect(hexToRgba('invalid', 50)).toBe('rgba(255, 255, 255, 0.05)')
  })

  it('works without hash prefix', () => {
    expect(hexToRgba('00ff00', 50)).toBe('rgba(0, 255, 0, 0.5)')
  })

  it('handles zero opacity', () => {
    expect(hexToRgba('#0000ff', 0)).toBe('rgba(0, 0, 255, 0)')
  })
})

describe('hexToRgb', () => {
  it('converts hex to rgb object', () => {
    expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 })
  })

  it('converts shorthand hex', () => {
    expect(hexToRgb('#0f0')).toEqual({ r: 0, g: 255, b: 0 })
  })

  it('returns fallback for invalid hex', () => {
    expect(hexToRgb('zzz')).toEqual({ r: 9, g: 9, b: 11 })
  })
})

describe('rgbToHex', () => {
  it('converts rgb to hex', () => {
    expect(rgbToHex(255, 0, 0)).toBe('#FF0000')
  })

  it('pads single digit hex values', () => {
    expect(rgbToHex(0, 0, 0)).toBe('#000000')
  })

  it('handles white', () => {
    expect(rgbToHex(255, 255, 255)).toBe('#FFFFFF')
  })
})

describe('rgbToHsb', () => {
  it('converts red to hsb', () => {
    const result = rgbToHsb(255, 0, 0)
    expect(result.h).toBe(0)
    expect(result.s).toBe(100)
    expect(result.b).toBe(100)
  })

  it('converts black to hsb', () => {
    const result = rgbToHsb(0, 0, 0)
    expect(result.h).toBe(0)
    expect(result.s).toBe(0)
    expect(result.b).toBe(0)
  })

  it('converts white to hsb', () => {
    const result = rgbToHsb(255, 255, 255)
    expect(result.s).toBe(0)
    expect(result.b).toBe(100)
  })
})

describe('rgbToCmyk', () => {
  it('converts red to cmyk', () => {
    expect(rgbToCmyk(255, 0, 0)).toEqual({ c: 0, m: 100, y: 100, k: 0 })
  })

  it('converts black to cmyk', () => {
    expect(rgbToCmyk(0, 0, 0)).toEqual({ c: 0, m: 0, y: 0, k: 100 })
  })

  it('converts white to cmyk', () => {
    expect(rgbToCmyk(255, 255, 255)).toEqual({ c: 0, m: 0, y: 0, k: 0 })
  })
})

describe('hsbToRgb', () => {
  it('converts red hsb to rgb', () => {
    expect(hsbToRgb(0, 100, 100)).toEqual({ r: 255, g: 0, b: 0 })
  })

  it('converts black hsb to rgb', () => {
    expect(hsbToRgb(0, 0, 0)).toEqual({ r: 0, g: 0, b: 0 })
  })
})

describe('hsbToHex', () => {
  it('converts hsb to hex', () => {
    expect(hsbToHex(0, 100, 100)).toBe('#FF0000')
  })
})
