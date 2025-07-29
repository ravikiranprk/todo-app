"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


export default function AllTodos({ todos }) {
    return (
        <main className="flex items-center justify-center p-5">
            <Table className="border border-gray-800 runded-md">
                <TableHeader>
                    <TableRow className="font-bold uppercase">
                        <TableHead className="font-bold w-[100px]">ID</TableHead>
                        <TableHead className="font-bold">Title</TableHead>
                        <TableHead className="font-bold">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {todos.map((todo) => (
                        <TableRow key={todo.id}>
                            <TableCell className="font-medium">{todo.id}</TableCell>
                            <TableCell>{todo.title}</TableCell>
                            <TableCell>{todo.completed ? "Completed" : "Incomplete"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    )
}