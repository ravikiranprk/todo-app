import AdminPageTodos from "@/components/AdminPageTodos";
import { getAllTodos } from "@/server/todos";

export default async function AdminPage() {
    const todos = await getAllTodos();

    return (
        <AdminPageTodos todos={todos} />
    )
}