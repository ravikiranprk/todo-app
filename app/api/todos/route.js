import { NextResponse } from "next/server";
import { getAllTodos, createTodo } from "@/server/todos";

export async function GET() {
  try {
    const todos = await getAllTodos();
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const todo = await createTodo(data);
    if (todo.error) {
      return NextResponse.json(todo, { status: 400 });
    }
    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create todo" }, { status: 500 });
  }
}