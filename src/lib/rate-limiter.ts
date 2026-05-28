interface RateLimitEntry {
  count: number
  resetAt: number
}

interface RateLimiterOptions {
  maxRequests: number
  windowMs: number
}

const store = new Map<string, RateLimitEntry>()

function cleanup() {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) {
      store.delete(key)
    }
  }
}

setInterval(cleanup, 60_000)
cleanup()

export function checkRateLimit(key: string, options: RateLimiterOptions): { allowed: boolean; retryAfter?: number; remaining: number } {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + options.windowMs })
    return { allowed: true, remaining: options.maxRequests - 1 }
  }

  if (entry.count >= options.maxRequests) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
    return { allowed: false, retryAfter, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: options.maxRequests - entry.count }
}
