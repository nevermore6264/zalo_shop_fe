import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Forward the request to the backend
        const response = await fetch('http://localhost:5000/api/contacts/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok) {
            return NextResponse.json(data, { status: 201 });
        } else {
            return NextResponse.json(data, { status: response.status });
        }
    } catch (error) {
        console.error('Error submitting contact message:', error);
        return NextResponse.json(
            { message: 'Lỗi server, vui lòng thử lại sau' },
            { status: 500 }
        );
    }
} 