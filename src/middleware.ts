import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that don't require authentication
const publicRoutes = [
    '/login',
    '/register',
    '/auth',
    '/forgot-password',
    '/reset-password'
];

// Routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/services',
  '/recharge',
  '/invoices',
  '/guide',
  '/contact',
  '/proxy-list',
  '/purchase-history'
];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the current path is a protected route
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Check if the current path is a public route
    const isPublicRoute = publicRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Get token from cookies
    const token = request.cookies.get('auth_token')?.value ||
        request.cookies.get('access_token')?.value ||
        request.headers.get('authorization')?.replace('Bearer ', '');

    // If accessing protected route without token, redirect to login
    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // If accessing public route with token, redirect to dashboard
    if (isPublicRoute && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ],
}; 