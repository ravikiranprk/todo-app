import { rejectUser } from '@/server/users';
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    try {
        const rejected = await rejectUser(params.id);
        return NextResponse.json(rejected, { status: 200});
    } catch(error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to reject user" }, { status: 500 });
    }
}