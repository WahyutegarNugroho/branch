import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const RESERVED_PATHS = ['/_next', '/api', '/login', '/register', '/dashboard', '/favicon.ico']

function isReservedPath(pathname: string): boolean {
  return RESERVED_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'))
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value }) =>
            supabaseResponse.cookies.set(name, value)
          )
        },
      },
    }
  )

  // Custom domain routing: check if host matches a registered custom domain
  const host = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname

  if (!isReservedPath(pathname) && host && !host.startsWith('localhost') && !host.startsWith('127.0.0.1')) {
    const hostWithoutPort = host.split(':')[0]
    const { data: profile } = await supabase
      .from('profiles')
      .select('username')
      .eq('custom_domain', hostWithoutPort)
      .maybeSingle()

    if (profile?.username) {
      const url = request.nextUrl.clone()
      url.pathname = pathname === '/' ? `/${profile.username}` : `/${profile.username}${pathname}`
      return NextResponse.rewrite(url)
    }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register')
  const isDashboard = pathname.startsWith('/dashboard')

  if (!user && isDashboard) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (user && isAuthPage) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
