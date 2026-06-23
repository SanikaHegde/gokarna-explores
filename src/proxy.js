import { NextResponse } from 'next/server';

export function proxy(req) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const session = req.cookies.get('admin_session');

    if (!session || session.value !== 'true') {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
