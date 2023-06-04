import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface IUserSession {
  _id: string;
  username: string;
  email: string;
  picture: string;
  role: string;
}

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const url = req.nextUrl;

  if (url.pathname === '/profile') {
    if (!session && !url.search
    ) return NextResponse.redirect(new URL('/auth/sign_in', req.nextUrl));
    return NextResponse.next();
  }

  if (!session) {
    if (url.pathname.startsWith('/api')) {
      return new NextResponse(
        JSON.stringify({ error: 'Authentication failed' }),
        { status: 401, headers: { 'content-type': 'application/json' } },
      );
    }
    return NextResponse.redirect(new URL('/auth/sign_in', req.url));
  }

  const { user } = session as { user: IUserSession };

  if (url.pathname === '/creator'
    || url.pathname === '/creator/apply'
  ) return NextResponse.next();

  if (url.pathname.startsWith('/api/creators')) {
    if (user.role === 'user') {
      return new NextResponse(
        JSON.stringify({ error: 'Authorization failed' }),
        { status: 401, headers: { 'content-type': 'application/json' } },
      );
    }
    return NextResponse.next();
  }

  if (user.role !== 'admin') {
    if (url.pathname.startsWith('/api')) {
      return new NextResponse(
        JSON.stringify({ error: 'Authorization failed' }),
        { status: 401, headers: { 'content-type': 'application/json' } },
      );
    }
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/creator/:path*',
    '/api/creators/:path*',
    '/profile'
  ],
};