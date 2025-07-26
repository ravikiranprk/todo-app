import { getAllTodos } from "@/server/todos"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function allTodos() {
  const todos = await getAllTodos();
  if (!todos || todos.length === 0) {
    return [];
  }
  return JSON.stringify(todos, null, 2);
}
