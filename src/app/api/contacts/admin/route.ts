import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');

        const response = await fetch('http://localhost:5000/api/contacts/admin', {
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
        console.error('Error fetching contact info:', error);
        return NextResponse.json(
            { message: 'Lỗi server, vui lòng thử lại sau' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const authHeader = request.headers.get('authorization');

        const response = await fetch('http://localhost:5000/api/contacts/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(authHeader && { 'Authorization': authHeader }),
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
        console.error('Error creating contact info:', error);
        return NextResponse.json(
            { message: 'Lỗi server, vui lòng thử lại sau' },
            { status: 500 }
        );
    }
} 