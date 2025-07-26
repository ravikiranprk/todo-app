"use client";

import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";

import { updateTodo } from '@/server/todos';

const formSchema = z.object({
    title: z.string().min(3, {
        message: "Title is required"
    }),
    description: z.string().optional(),
    completed: z.boolean(),
});

type UpdateTodoSchema = z.infer<typeof formSchema>;

interface UpdateTodoFormProps {
    userId: number;
    initialTodo: { 
        id: number; 
        title: string; 
        description: string | null; 
        completed: boolean | null; 
        created_at: Date; 
        updated_at: Date; 
        user_id: number | null; 
    };
}

export default function UpdateTodoForm({ userId, initialTodo } : UpdateTodoFormProps) {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<UpdateTodoSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialTodo.title,
            description: initialTodo.description!,
            completed: initialTodo.completed!,
        },
    });

    async function submitForm(values: UpdateTodoSchema) {
        try {
            const res = await updateTodo(userId, values);
            console.log(values);

            router.refresh();
            router.replace(`http://localhost:3000/dashboard/user/${userId}`);
        } catch (error) {
            console.log("Error updating user", error);
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-center">Update Your Todo</h2>
            <form 
                onSubmit={handleSubmit(submitForm)}
                className="border border-gray-800 rounded-xl p-10 mt-3"
            >
                <div className="flex flex-col gap-2 mb-4">
                    <Label htmlFor="title">Title</Label>
                    <Input {...register('title')} placeholder="Title" id="title" />
                    {errors.title && <p className="text-sm px-2 py-1 rounded-md bg-red-500 text-zinc-100">{errors.title.message}</p>}
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <Label htmlFor="description">Description</Label>
                    <Input {...register('description')} placeholder="Description" id="description" />
                    {errors.description && <p className="text-sm px-2 py-1 rounded-md bg-red-500 text-zinc-100">{errors.description.message}</p>}
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <Label htmlFor="completed">Completed</Label>
                    <Input {...register('completed')} placeholder="Completed" id="completed" />
                    {errors.completed && <p className="text-sm px-2 py-1 rounded-md bg-red-500 text-zinc-100">{errors.completed.message}</p>}
                </div>
                <div className="flex justify-center items-center mb-4">
                    <Button type="submit" className="bg-cyan-800 text-zinc-100 rounded-lg px-4 py-2 font-semibold">Update Todo</Button>
                </div>
            </form>
        </div>
    )
}