import AdminNav from "./AdminNav";
import AllUsersData from "./AllUsersData";
import { getAllUsers } from "@/server/users";

export default async function AdminPageHome({session}) {
    const users = await getAllUsers();
    
    return (
        <div>
            <AdminNav session={session}/>
            <div className="flex flex-col gap-3 justify-start items-center">
                <h1 className="text-3xl font-bold mt-2">Admin Dashboard</h1>
                <p>Welcome to the admin dashboard. Here you can manage users and their data.</p>
            </div>
            <AllUsersData users={users} />
        </div>
    );
}