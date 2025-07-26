import TodosTable from "@/components/TodosTable";

import { getTodosByUserId, deleteTodo } from "@/server/todos";

export default async function AdminPage({ userId } : { userId: number }) {
    const todos = await getTodosByUserId(userId);
    if (!todos || todos.length === 0) {
        return <div>No todos found</div>;
    }
    return (
        <TodosTable todos={todos} deleteTodo={deleteTodo} />
    );
}