import { getUserById, updateUser, deleteUser } from '@/server/users';
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const id = await params.id;
        const user = await getUserById(id);
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to fetch user" }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const data = await request.json();
        const updated = await updateUser(params.id, data);
        return NextResponse.json(updated, { status: 200 }``);
    } catch(error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to update user" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const deleted = await deleteUser(params.id);
        return NextResponse.json(deleted, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to delete user" }, { status: 500 });
    }
}