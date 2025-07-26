"use client";

import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { createUser, getUserByEmail } from '@/server/users';
import Link from 'next/link';

const formSchema = z.object({
    email: z.email().min(8, {
        message: "Email must be a valid email address"
    }),
    password: z.string().min(6, {
        message: "Password must at least 6 characters"
    }),
});

type AddUserSchema = z.infer<typeof formSchema>;

export default function AddUserForm() {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<AddUserSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function submitForm(values: AddUserSchema) {
        try {
            const resUserExists = await getUserByEmail(values.email);

            if (!resUserExists) {
                errors.email = {
                    message: "Email already exists",
                    type: "manual"
                }
                return;
            }

            const res = await createUser(values);
            console.log(values);

            router.refresh();
            router.replace(`http://localhost:3000/`);
        } catch (error) {
            console.log("Error updating user", error);
        }
    }
    return (
        <div className="flex justify-center items-center flex-col gap-4 h-screen p-10">
            <h2 className="text-2xl font-bold text-center">Register</h2>
            <form
                onSubmit={handleSubmit(submitForm)}
                className="border border-gray-800 rounded-xl p-10 mt-3"
            >
                <div className="flex flex-col gap-2 mb-4">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        placeholder="Email"
                        id="email"
                        type="email"
                        required
                        {...register("email")}
                    />
                    {errors.email && <p className="text-sm px-2 py-1 rounded-md bg-red-500 text-zinc-100">{errors.email.message}</p>}
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        placeholder="Password"
                        id="password"
                        type="password"
                        required
                        {...register("password")}
                    />
                    {errors.password && <p className="text-sm px-2 py-1 rounded-md bg-red-500 text-zinc-100">{errors.password.message}</p>}
                </div>
                <div className="flex justify-center items-center mb-4">
                    <Button type="submit" className="hover:bg-cyan-900 bg-cyan-700 cursor-pointer text-zinc-100 rounded-lg px-4 py-2 font-semibold">Register</Button>
                </div>

                <div className="text-right">
                    <Link href="http://localhost:3000">
                        Already have an account? <span className="underline">Login</span>
                    </Link>
                </div>
            </form>
        </div>
    )
}