import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');

        if (!authHeader) {
            return NextResponse.json(
                { message: 'No authorization header provided' },
                { status: 401 }
            );
        }

        const token = authHeader.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json(
                { message: 'No token provided' },
                { status: 401 }
            );
        }

        // Forward to backend to verify token
        const response = await fetch('http://localhost:5000/api/auth/verify', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (response.ok) {
            return NextResponse.json(data);
        } else {
            return NextResponse.json(data, { status: response.status });
        }
    } catch (error) {
        console.error('Error verifying token:', error);
        return NextResponse.json(
            { message: 'Error verifying token' },
            { status: 500 }
        );
    }
} 