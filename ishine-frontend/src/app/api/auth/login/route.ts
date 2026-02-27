import { NextRequest, NextResponse } from 'next/server';

/**
 * Login route — proxies to the Express backend.
 * This avoids any schema mismatch between the frontend Prisma client
 * and the actual database schema managed by the backend.
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const backendRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await backendRes.json();

        if (!backendRes.ok) {
            return NextResponse.json(
                { message: data.message || 'Invalid email or password.' },
                { status: backendRes.status }
            );
        }

        // Normalize user object: backend may return `name` instead of firstName/lastName
        const rawUser = data.user || {};
        const nameParts = (rawUser.name || '').split(' ');
        const normalizedUser = {
            id: String(rawUser.id),
            email: rawUser.email,
            name: rawUser.name || '',
            firstName: nameParts[0] || '',
            lastName: nameParts.slice(1).join(' ') || '',
            role: rawUser.role,
            businessName: rawUser.businessName,
        };

        return NextResponse.json({
            message: 'Login successful',
            token: data.token,
            user: normalizedUser,
        });

    } catch (error) {
        console.error('Login proxy error:', error);
        return NextResponse.json(
            { message: 'Could not connect to the authentication server. Make sure the backend is running.' },
            { status: 503 }
        );
    }
}
