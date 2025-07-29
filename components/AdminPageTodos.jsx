"use client";

import AdminNav from "./AdminNav";
import AllTodos from "./AllTodos";
import { useSession } from "next-auth/react";

export default function AdminPageTodos({ todos }) {
    const { data: session } = useSession();

    return (
        <main>
            <AdminNav session={session} />
            <h1 className="text-3xl font-bold text-center">View All Todos</h1>
            <AllTodos todos={todos} />
        </main>
    )
}