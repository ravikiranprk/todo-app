import { getUserById } from '@/server/users';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Suspense } from 'react';
import AdminPageHome from '@/components/AdminPageHome';
import { redirect } from 'next/navigation';

export default async function AdminPage({ params }) {
    const { id } = await params;

    const session = await getServerSession(authOptions);
    // if (session) {
    //     redirect(`/dashboard/admin/${id}`);
    // }

    const todos = await getUserById(id);

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <AdminPageHome session={session} />
        </Suspense>
    )
}