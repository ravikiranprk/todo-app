"use client";

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { updateTodo } from '@/server/todos';

export default function UpdateTodoForm({ todoId, title, description, completed }){
    const { data: session } = useSession();
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [newCompleted, setNewCompleted] = useState(completed);
    const [error, setError] = useState("");
    const router = useRouter();


    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const res = await updateTodo(todoId, {
                newTitle, newDescription, newCompleted
            })

            if(!res.status === 200) setError("Update failed!");
            
            router.refresh();
            router.replace(`/dashboard/user/${session.user.id}`);
        } catch (err) {
            setError("Error updating todo");
            console.log("Error updating todo", err);
        }
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <h2 className="text-2xl font-bold text-center">Update Your Todo</h2>
            <form 
                onSubmit={handleSubmit}
                className="border border-gray-800 rounded-xl p-10 mt-3"
            >
                <div className="flex flex-col gap-2 mb-4">
                    <Label htmlFor="title">Title</Label>
                    <Input 
                        placeholder="Title" 
                        id="title"
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <Label htmlFor="description">Description</Label>
                    <Input 
                        placeholder="Description" 
                        id="description"
                        value={newDescription}
                        onChange={e => setNewDescription(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <Label htmlFor="completed">Completed</Label>
                    <Input 
                        placeholder="Completed (true/false)" 
                        id="completed"
                        value={newCompleted}
                        onChange={e => setNewCompleted(e.target.value)}
                    />
                </div>
                {error && <p className="text-sm px-2 py-1 rounded-md bg-red-500 text-zinc-100">{error}</p>}
                <div className="flex justify-center items-center mb-4">
                    <Button type="submit" className="bg-cyan-800 text-zinc-100 rounded-lg px-4 py-2 font-semibold">Update Todo</Button>
                </div>
            </form>
        </div>
    )
}