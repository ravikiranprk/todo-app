"use client";

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { useState } from 'react';

export default function AddUserForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            setError("All fields are required");
            return;
        }
        try {
            const userRes = await fetch(`/api/users/by-email?email=${encodeURIComponent(email)}`);
            const userData = await userRes.json();
            const userExists = Array.isArray(userData) ? userData[0] : userData;
            if (userExists && userExists.id) {
                setError("Email already exists");
                return;
            }

            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                setError(errorData.error || "Error creating user");
                return;
            }
            router.replace(`/signin`);
        } catch (err) {
            setError("Error updating user");
            console.log("Error updating user", err);
        }
    }
    return (
        <div className="flex justify-center items-center flex-col gap-4 h-screen p-10">
            <h2 className="text-2xl font-bold text-center">Register</h2>
            <form
                onSubmit={handleSubmit}
                className="border border-gray-800 rounded-xl p-10 mt-3"
            >
                <div className="flex flex-col gap-2 mb-4">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        placeholder="Email"
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        placeholder="Password"
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="text-sm px-2 py-1 rounded-md bg-red-500 text-zinc-100">{error}</p>}

                <div className="flex justify-center items-center mb-4">
                    <Button type="submit" className="hover:bg-cyan-900 bg-cyan-700 cursor-pointer text-zinc-100 rounded-lg px-4 py-2 font-semibold">Register</Button>
                </div>

                <div className="text-right">
                    <Link href="/signin">
                        Already have an account? <span className="underline">Login</span>
                    </Link>
                </div>
            </form>
        </div>
    )
}