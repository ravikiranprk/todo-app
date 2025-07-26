"use client";

import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { createTodo } from '@/server/todos';

const formSchema = z.object({
    title: z.string().min(3, {
        message: "Title is required"
    }),
    description: z.string(),
    completed: z.boolean(),
});

type AddTodoSchema = z.infer<typeof formSchema>;


export default function AddTodoForm() {

    const router = useRouter();
    
    const { register, handleSubmit, formState: { errors } } = useForm<AddTodoSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            completed: false,
        },
    });

    async function submitForm(values: AddTodoSchema) {
        try {
            const res = await createTodo(values);
            console.log(values);

            router.refresh();
            router.replace(`http://localhost:3000/dashboard/user`);
        } catch (error) {
            console.log("Error updating user", error);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen p-10">
            <h2 className="text-2xl font-bold text-center">Update Your Todo</h2>
            <form 
                onSubmit={handleSubmit(submitForm)}
                className="border border-gray-800 rounded-xl p-10 mt-3"
            >
                <div className="flex flex-col gap-2 mb-4">
                    <Label htmlFor="title">Title</Label>
                    <Input 
                        placeholder="Title" 
                        id="title"
                        required
                        {...register("title")}
                    />
                    {errors.title && <p className="text-sm px-2 py-1 rounded-md bg-red-500 text-zinc-100">{errors.title.message}</p>}
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <Label htmlFor="description">Description</Label>
                    <Input 
                        placeholder="Description" 
                        id="description" 
                        {...register("description")}
                    />
                    {errors.description && <p className="text-sm px-2 py-1 rounded-md bg-red-500 text-zinc-100">{errors.description.message}</p>}
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <Label htmlFor="completed">Completed</Label>
                    <Input 
                        placeholder="Completed (Enter either 'true' or 'false')" 
                        id="completed" 
                        {...register("completed")}
                    />
                    {errors.completed && <p className="text-sm px-2 py-1 rounded-md bg-red-500 text-zinc-100">{errors.completed.message}</p>}
                </div>
                <div className="flex justify-center items-center mb-4">
                    <Button type="submit" className="bg-cyan-800 text-zinc-100 rounded-lg px-4 py-2 font-semibold">Update Todo</Button>
                </div>
            </form>
        </div>
    )
}