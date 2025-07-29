"use client";

import { useSession } from "next-auth/react";
import Stats from "./Stats";
import AdminNav from "./AdminNav";

export default function AllStats() {
    const { data: session } = useSession();

    return (
        <div>
            <AdminNav session={session} />
            <Stats />
        </div>
    )
}