import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    if (pathname.match(/\.(png|jpg|jpeg|svg|gif|webp)$/)) {
        if (pathname.includes('missing')) {
            return NextResponse.rewrite(new URL('/placeholder.png', request.url));
        }
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next).*)'],
};