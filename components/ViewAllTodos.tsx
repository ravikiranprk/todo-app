import { Todo } from "@/db/schema";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow, TableCell } from "./ui/table";

export default function AllTodosPage({ todos }: { todos: Todo[] }) {
    return (
        <div className="flex justify-center items-center flex-col gap-4 h-screen m-5">
            <h1 className="text-3xl font-bold text-center">All Todos</h1>
            <hr className="my-4 bg-cyan-800" />
            {todos.length === 0 ? (
                <p className="bg-red-700">No todos found.</p>
            ) : (
                <Table>
                    <TableCaption>List of all todos</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Title</TableHead>
                            <TableHead className="w-[150px]">Completed</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {todos.map((todo) => (
                            <TableRow key={todo.id}>
                                <TableCell>{todo.title}</TableCell>
                                <TableCell>{todo.completed ? "completed" : "incomplete"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}