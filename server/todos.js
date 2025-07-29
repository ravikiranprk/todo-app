"use server";

import { db } from "@/db/drizzle";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAllTodos() {
    try {
        const allTodos = await db.select().from(todos);
        return allTodos;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export async function getTodoByTodoId(id) {
    try {
        const userTodos = await db.select().from(todos).where(eq(todos.id, id));
        return userTodos;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getTodosByUserId(id) {
    try {
        const userTodos = await db.select().from(todos).where(eq(todos.user_id, id));
        return userTodos;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function createTodo(todo) {
    try {
        const newTodo = await db.insert(todos).values(todo);
        return newTodo;
    } catch (error) {
        console.log(error);
        return { error: "Failed to create a new user" }
    }
}

export async function updateTodo(id, data) {
    try {
        const updatedTodo = await db.update(todos).set(data).where(eq(todos.id, id));
        return updatedTodo;
    } catch (error) {
        console.log(error);
        return { error: "Failed to update user" }
    }
}

export async function deleteTodo(id) {
    try {
        const deletedTodo = await db.delete(todos).where(eq(todos.id, id));
        return deletedTodo;
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete user" }
    }
}