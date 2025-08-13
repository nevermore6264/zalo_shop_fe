import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const authHeader = request.headers.get('authorization');

        const response = await fetch(`http://localhost:5000/api/contacts/admin/messages/${params.id}`, {
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
        console.error('Error fetching message:', error);
        return NextResponse.json(
            { message: 'Lỗi server, vui lòng thử lại sau' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const authHeader = request.headers.get('authorization');

        const response = await fetch(`http://localhost:5000/api/contacts/admin/messages/${params.id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...(authHeader && { 'Authorization': authHeader }),
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok) {
            return NextResponse.json(data);
        } else {
            return NextResponse.json(data, { status: response.status });
        }
    } catch (error) {
        console.error('Error updating message:', error);
        return NextResponse.json(
            { message: 'Lỗi server, vui lòng thử lại sau' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const authHeader = request.headers.get('authorization');

        const response = await fetch(`http://localhost:5000/api/contacts/admin/messages/${params.id}`, {
            method: 'DELETE',
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
        console.error('Error deleting message:', error);
        return NextResponse.json(
            { message: 'Lỗi server, vui lòng thử lại sau' },
            { status: 500 }
        );
    }
} 