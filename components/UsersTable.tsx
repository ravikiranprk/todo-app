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
import { User } from "@/db/schema";

export default async function UsersTable({ users, approveUser, rejectUser }: { users: User[]; approveUser: (id: number) => void; rejectUser: (id: number) => void; }) {
    const filteredUsers = users.filter(user => user.role !== "admin");
    
    return (
        <div className="flex items-start justify-center flex-col h-screen max-w-[90%] p-10 m-5">
            <h1 className="text-3xl font-bold uppercase">Admin Dashboard</h1>
            <Table className="border border-gray-900 rounded-lg p-10 mt-4">
                <TableHeader> 
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.created_at.toLocaleString()}</TableCell>
                            <TableCell className="flex gap-2 flex-end">
                                <button
                                    onClick={() => approveUser(user.id)}
                                    className="mr-2 bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => rejectUser(user.id)}
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