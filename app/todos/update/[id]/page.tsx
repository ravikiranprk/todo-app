import UpdateTodoForm from "@/components/forms/UpdateTodoForm";
import { getTodoByTodoId } from "@/server/todos";

export default async function UpdateTodo({ params }: { params: { id: number } }) {
    const todo = await getTodoByTodoId(params.id);
    const user_id = todo[0].user_id;

    return (
        <UpdateTodoForm userId={user_id!} initialTodo={todo[0]} />
    )
}