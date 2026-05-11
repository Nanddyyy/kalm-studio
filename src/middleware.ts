import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /login, /dashboard)
  const path = request.nextUrl.pathname

  // Jika di lokal development, kita bisa bebaskan proteksi sementara demi kelancaran testing
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next()
  }

  // For production, we'll let the client-side handle authentication
  // This avoids server-side cookie issues
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
