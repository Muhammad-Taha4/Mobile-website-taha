import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Protect admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const token = request.cookies.get('token')?.value;
        
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            // Extact payload from JWT
            const payloadBase64 = token.split('.')[1];
            // Decode base64 payload
            const decodedPayload = JSON.parse(atob(payloadBase64));

            // Check role
            if (decodedPayload.role !== 'ADMIN') {
                return NextResponse.redirect(new URL('/login', request.url));
            }
        } catch (error) {
            // Invalid token format
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
