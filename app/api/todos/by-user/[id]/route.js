import { NextResponse } from "next/server";
import { getTodosByUserId } from "@/server/todos";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const todos = await getTodosByUserId(id);
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch todos for user" }, { status: 500 });
  }
}