import AllUsersData from "@/components/AllUsersData";
import { getAllUsers, deleteUser } from "@/server/users";

export default async function UpdateUserPage({ params }) {
    const { id } = params;

    const users = await getAllUsers();

    return (
        <AllUsersData users={users} deleteUser={deleteUser} />
    )
}