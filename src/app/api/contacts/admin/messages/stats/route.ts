import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Get auth token from headers
        const authHeader = request.headers.get('authorization');

        // Forward the request to the backend
        const response = await fetch('http://localhost:5000/api/contacts/admin/messages/stats', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(authHeader && { 'Authorization': authHeader }),
            },
        });

        const data = await response.json();

        if (response.ok) {
            return NextResponse.json(data);
        } else {
            return NextResponse.json(data, { status: response.status });
        }
    } catch (error) {
        console.error('Error fetching message stats:', error);
        return NextResponse.json(
            { message: 'Lỗi server, vui lòng thử lại sau' },
            { status: 500 }
        );
    }
} 