"use client";

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { getUserByEmail } from '@/server/users';

export default function SignInForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const router = useRouter();
    const { data: session } = useSession()

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        if (!email || !password) {
            setError("All fields are required!");
            return;
        }
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res.error) {
                setError("Invalid email or password");
                return;
            }

            const userData = await getUserByEmail(email);
            if (!userData || userData.error) {
                setError("Failed to fetch user info");
                return;
            }
            const user = Array.isArray(userData) ? userData[0] : userData;
            if (!user || !user.id || !user.role) {
                setError("User info incomplete");
                return;
            }
            if (user.role === "admin") {
                router.rplace(`/dashboard/admin/${user.id}`);
            } else if (user.role === "user") {
                router.replace(`/dashboard/user/${user.id}`);
            } else {
                router.replace("/dashboard");
            }
        } catch (error) {
            setError("Error signing in. Please try again.");
            console.log("Error signing user", error);
        }
    }

    return (
        <div className="flex justify-center items-center flex-col gap-4 h-screen p-10">
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <form
                onSubmit={handleSubmit}
                className="border border-gray-800 rounded-xl p-10 mt-3"
            >
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        placeholder="Email"
                        id="email"
                        type="email"
                        required
                        name='email'
                    />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        placeholder="Password"
                        id="password"
                        type="password"
                        required
                        name='password'
                    />
                </div>
                <div className="flex justify-center items-center mb-4">
                    <button type="submit" className="hover:bg-cyan-900 bg-cyan-700 cursor-pointer text-zinc-100 rounded-lg px-4 py-2 font-semibold">Login</button>
                </div>

                <div>
                    {error && <p className="text-sm text-red-500 capitalize">{error}</p>}
                </div>

                <div className="text-right">
                    <Link href="/registerUser">
                        Don't have an account? <span className="underline">Signup</span>
                    </Link>
                </div>
            </form>
        </div>
    )
}