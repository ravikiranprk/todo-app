"use client";

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";

export default function UpdateTodoForm(){
    const { data: session } = useSession();
    const [title, setTitle] = useState(initialTodo?.title || "");
    const [description, setDescription] = useState(initialTodo?.description || "");
    const [completed, setCompleted] = useState(initialTodo?.completed ? "true" : "false");
    const [error, setError] = useState("");
    const router = useRouter();

    if (!session) {
        if (typeof window !== "undefined") {
            router.replace("/signin");
        }
        return null;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        // Convert completed to boolean
        let completedBool = false;
        if (completed.toLowerCase() === "true") completedBool = true;
        try {
            const res = await fetch(`/api/todos/${todoId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    description,
                    completed: completedBool
                })
            });
            if (!res.ok) {
                setError("Error updating todo");
                return;
            }
            router.refresh();
            router.replace(`/dashboard/user/${session.user.id}`);
        } catch (err) {
            setError("Error updating todo");
            console.log("Error updating todo", err);
        }
    }

    return (
        <div>
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
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <Label htmlFor="description">Description</Label>
                    <Input 
                        placeholder="Description" 
                        id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <Label htmlFor="completed">Completed</Label>
                    <Input 
                        placeholder="Completed (true/false)" 
                        id="completed"
                        value={completed}
                        onChange={e => setCompleted(e.target.value)}
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