import UpdateTodoForm from "@/components/forms/UpdateTodoForm";

export default async function UpdateTodo({ params }) {
    const { todoId } = await params;

    const initialTodo = await fetch(`api/todos/${todoId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    return (
        <UpdateTodoForm todoId={id} initialTodo={initialTodo} />
    )
}