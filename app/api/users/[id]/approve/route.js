import { approveUser } from '@/server/users';
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    try {
        const approved = await approveUser(params.id);
        return NextResponse.json(approved, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to approve user" }, { status: 500 });
    }
}