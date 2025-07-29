"use client";

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useSession } from 'next-auth/react';

export default function AddTodoForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { data: session } = useSession();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        const userId = session?.user?.id;
        if (!userId) {
            setError("User id not found in session");
            return;
        }
        if (!title) {
            setError("Title is required");
            return;
        }

        let completedBool = false;
        if (completed.toLowerCase() === "true") completedBool = true;
        try {
            const todoData = {
                title,
                description,
                completed: completedBool,
                user_id: parseInt(userId, 10)
            };
            const res = await fetch("/api/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(todoData),
            });
            if (!res.ok) {
                setError("Error creating todo");
                return;
            }
            router.refresh();
            router.replace(`/dashboard/user/${userId}`);
        } catch (err) {
            setError("Error creating todo");
            console.log("Error creating todo", err);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen p-10">
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
                        required
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

                {error && <p className="text-sm px-2 py-1 rounded-md bg-red-500 text-zinc-100">{error}</p>}
                
                <div className="flex justify-center items-center mb-4">
                    <Button type="submit" className="bg-cyan-800 text-zinc-100 rounded-lg px-4 py-2 font-semibold">Add Todo</Button>
                </div>
            </form>
        </div>
    )
}