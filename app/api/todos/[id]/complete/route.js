import { NextResponse } from "next/server";
import { updateTodo } from "@/server/todos";

export async function POST(request, { params }) {
  try {
    const { completed } = await request.json();
    
    const { id } = await params;
    const updated = await updateTodo(id, { completed });
    if (updated.error) {
      return NextResponse.json(updated, { status: 400 });
    }
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update todo completion status" }, { status: 500 });
  }
}
