import { getTodoByTodoId } from "@/server/todos";
import UpdateTodoForm from "@/components/forms/UpdateTodoForm";

export default async function UpdateTodo({ params }) {
    const { todoId } = await params;
    let todo = await getTodoByTodoId(todoId);

    if(Array.isArray(todo)) todo = todo[0];

    const {title, description, completed} = todo;

    return (
        <UpdateTodoForm todoId={todoId} title={title} description={description} completed={completed}  />
    )
}