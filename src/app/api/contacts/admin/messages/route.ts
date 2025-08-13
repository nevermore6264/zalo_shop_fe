import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = searchParams.get('page') || '1';
        const limit = searchParams.get('limit') || '10';
        const status = searchParams.get('status') || '';
        const priority = searchParams.get('priority') || '';
        const search = searchParams.get('search') || '';

        // Build query string
        const params = new URLSearchParams({
            page,
            limit,
            ...(status && { status }),
            ...(priority && { priority }),
            ...(search && { search })
        });

        // Get auth token from headers
        const authHeader = request.headers.get('authorization');

        // Forward the request to the backend
        const response = await fetch(`http://localhost:5000/api/contacts/admin/messages?${params}`, {
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
        console.error('Error fetching messages:', error);
        return NextResponse.json(
            { message: 'Lỗi server, vui lòng thử lại sau' },
            { status: 500 }
        );
    }
} 