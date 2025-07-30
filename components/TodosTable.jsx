"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react"
import { useRouter } from "next/navigation";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function TodosTable({ todos, deleteTodo }) {
    const { data: session } = useSession();
    const [statusFilter, setStatusFilter] = useState("all");
    const router = useRouter();

    // Filter todos based on statusFilter
    const filteredTodos = todos.filter(todo => {
        if (statusFilter === "all") return true;
        if (statusFilter === "completed") return todo.completed === true;
        if (statusFilter === "incomplete") return todo.completed === false;
        return true;
    });

    const onLogout = async () => {
        await signOut({ redirect: true, callbackUrl: "/signin" });
    }

    return (

        <div className="flex flex-col justify-between items-stretch">
            <div className="flex justify-between items-center gap-4 p-6 mb-4 bg-gray-900 text-white">
                <h1 className="text-center text-3xl font-bold uppercase">Todo List</h1>
                <div className="flex justify-between items-center mr-4">
                    <p className="mr-6 capitalize font-semibold">{session?.user?.email}</p>
                    <Link href="/addTodo" className="bg-green-300 font-bold rounded-sm px-3 py-2 w-fit mr-3">Add Todo</Link>
                    <Button
                        onClick={onLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                    >
                        Logout
                    </Button>
                </div>
            </div>
            <div className="flex items-center gap-4 mb-4 ml-6">
                <label htmlFor="statusFilter" className="font-semibold">Filter by Status:</label>
                <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="border rounded px-2 py-1"
                >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete">Incomplete</option>
                </select>
            </div> 
            <div className="mx-6">
                <Table className="border border-gray-700 rounded-sm">
                    <TableHeader className="font-bold text-lg">
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTodos.map((todo) => (
                            <TableRow key={todo.id}>
                                <TableCell className="font-medium">{todo.id}</TableCell>
                                <TableCell>{todo.completed ? "Completed" : "Incomplete"}</TableCell>
                                <TableCell>{todo.title}</TableCell>
                                <TableCell>{todo.description}</TableCell>
                                <TableCell className="flex gap-2 flex-end">
                                    <Link href={`/updateTodo/${todo.id}`} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                                        Update
                                    </Link>
                                    <Button
                                        onClick={async () => {
                                            await deleteTodo(todo.id);
                                            router.refresh();
                                        }}
                                        className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}