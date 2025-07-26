"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Todo } from "@/db/schema";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function TodosTable(
{ todos, deleteTodo }
    : 
{ todos: Todo[]; 
  deleteTodo: (id: number) => void; 
}) {
    const data = useSession();

    return (
        <div>
            <div className="flex justify-between gap-4">
                <h1 className="text-center text-3xl font-bold uppercase">Todo List</h1>
                <div className="flex gap-2">
                    <p className="text-center">Hello {data.data?.user?.email}</p>
                </div>
                <button
                    onClick={() => signOut()}
                    className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                    Logout
                </button>
            </div>
            <Table className="flex items-center justify-center h-screen">
                <TableCaption>List of todos.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>                        
                        <TableHead>Status</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {todos.map((todo) => (
                        <TableRow key={todo.id}>
                            <TableCell className="font-medium">{todo.id}</TableCell>
                            <TableCell>{todo.completed ? "Completed" : "Incomplete" }</TableCell>
                            <TableCell>{todo.title}</TableCell>
                            <TableCell>{todo.description}</TableCell>
                            <TableCell className="flex gap-2 flex-end">
                                <Link href={`/todos/${todo.id}`} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                                    Update Todo
                                </Link>
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                                >
                                    Reject
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}