import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside

const guestroutes = ['/login', '/signup']

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("next-auth.session-token");
    if (!guestroutes.includes(path) && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (guestroutes.includes(path) && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    const url = new URL(request.url);
    const origin = url.origin;
    const pathname = url.pathname;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-url', request.url);
    requestHeaders.set('x-origin', origin);
    requestHeaders.set('x-pathname', pathname);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    });

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/login', '/signup', '/dashboard/:path*', "/blog/create-blog"],
}
