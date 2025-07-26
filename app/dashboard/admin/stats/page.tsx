import UsersChart from "@/components/UsersChart";
import { getAllUsers } from "@/server/users";

export default async function StatsPage() {
    const totalUsers = await getAllUsers(); // Assume this function fetches all users
    const pendingUsers = totalUsers.filter(user => user.approved === false); // Filter pending users

    return (
        <div>
            <h1>Admin Stats Page</h1>
            <p>This page displays statistics for the admin dashboard.</p>
            <UsersChart totalUsers={totalUsers} pendingUsers={pendingUsers} />
        </div>
    );
}