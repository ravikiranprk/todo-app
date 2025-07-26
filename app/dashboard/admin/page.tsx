import UsersTable from "@/components/UsersTable";

import { approveUser, getAllUsers, rejectUser } from "@/server/users";

export default async function AdminPage() {
    const users = await getAllUsers();
    if (!users || users.length === 0) {
        return <div>No users found</div>;
    }
    return (
        <UsersTable users={users} approveUser={approveUser} rejectUser={rejectUser} />
    );
}