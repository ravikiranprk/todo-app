import { NextResponse } from "next/server";
import { getTodoByTodoId, updateTodo, deleteTodo } from "@/server/todos";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const todo = await getTodoByTodoId(id);
    if (!todo || todo.length === 0) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch todo" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { id } = await params;
    const updated = await updateTodo(id, data);
    if (updated.error) {
      return NextResponse.json({ message: "Error updating todo!" }, { status: 400 });
    }
    return NextResponse.json({ message: "Updated todo successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update todo" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const deleted = await deleteTodo(id);
    if (deleted.error) {
      return NextResponse.json({message: "Error deleting todo!"}, { status: 400 });
    }
    return NextResponse.json({message: "Todo deleted successfully!"}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete todo" }, { status: 500 });
  }
}