import TodosTable from '@/components/TodosTable';
import { getTodosByUserId } from '@/server/todos';
import { deleteTodo } from '@/server/todos';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Suspense } from 'react';
import { redirect } from "next/navigation"

export default async function UserPage({ params }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    // if (session) {
    //     redirect(`/dashboard/user/${id}`);
    // }


    const todos = await getTodosByUserId(id);

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <TodosTable todos={todos} deleteTodo={deleteTodo} />
        </Suspense>
    )
}