import AddUserForm from "@/components/forms/AddUserForm.";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function RegisterUser() {
    // const session = await getServerSession(authOptions);
    // if(session?.user?.role === "admin") redirect("/dashboard/admin");
    // else redirect("/dashboard/user")

    return <AddUserForm />
}