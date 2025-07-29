"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export default function AdminNav({ session }) {
    const handleLogout = async () => {
        await signOut({
            redirec: true,
            callbackUrl: "/signin"
        })
    }

    return (
        <nav className="flex justify-between items-center bg-gray-900 text-white mb-4 p-4">
            <h2 className="text-3xl font-medium">Hello <span className="capitalize font-semibold">{session?.user?.name}</span></h2>
            <div className="flex gap-3 justify-between items-center">
                <Link href="/todos">All Todos</Link>
                <Link href="/stats">Statistics</Link>
                <div className="flex justify-center items-center">
                    <Button onClick={handleLogout} className="cursor-pointer bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200">Logout</Button>
                </div>
            </div>
        </nav>
    )
}