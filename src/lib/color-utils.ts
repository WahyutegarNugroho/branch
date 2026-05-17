export function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b)
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 9, g: 9, b: 11 }
}

export function rgbToHex(r: number, g: number, b: number) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
}

export function rgbToHsb(r: number, g: number, b: number) {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min
  let h = 0
  let s = max === 0 ? 0 : delta / max
  let v = max

  if (delta !== 0) {
    switch (max) {
      case r: h = (g - b) / delta + (g < b ? 6 : 0); break
      case g: h = (b - r) / delta + 2; break
      case b: h = (r - g) / delta + 4; break
    }
    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    b: Math.round(v * 100)
  }
}

export function rgbToCmyk(r: number, g: number, b: number) {
  let c = 1 - (r / 255)
  let m = 1 - (g / 255)
  let y = 1 - (b / 255)
  let k = Math.min(c, Math.min(m, y))

  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 }
  }

  c = Math.round(((c - k) / (1 - k)) * 100)
  m = Math.round(((m - k) / (1 - k)) * 100)
  y = Math.round(((y - k) / (1 - k)) * 100)
  k = Math.round(k * 100)

  return { c, m, y, k }
}

export function hsbToRgb(h: number, s: number, v: number) {
  h = h / 360;
  s = s / 100;
  v = v / 100;
  let r = 0, g = 0, b = 0;
  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

export function hsbToHex(h: number, s: number, b: number) {
  const rgb = hsbToRgb(h, s, b)
  return rgbToHex(rgb.r, rgb.g, rgb.b)
}

