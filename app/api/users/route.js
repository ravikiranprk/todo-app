import { getAllUsers, createUser } from '@/server/users';
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await getAllUsers();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        const user = await createUser(data);
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to create user" }, { status: 500 });
    }
}
