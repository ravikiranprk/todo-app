import ViewAllTodos from "@/components/ViewAllTodos";
import { getAllTodos } from "@/server/todos";

export default async function Todos() {
    const allTodos = await getAllTodos();

    return (
        <ViewAllTodos todos={allTodos} />
    )
}