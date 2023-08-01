import { NextResponse,NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside

const guestroutes = ['/login' , '/signup']

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token");
    if( !guestroutes.includes(path) &&  !token ){
        return  NextResponse.redirect(new URL('/login', request.url))
    }
    if(guestroutes.includes(path) && token ){
        return  NextResponse.redirect(new URL('/dashboard', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login' , '/signup',  '/dashboard/:path*'  ],
}