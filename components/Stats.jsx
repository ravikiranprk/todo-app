"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { getAllTodos } from "@/server/todos";
import { getAllUsers } from "@/server/users";

const COLORS = ["#0088FE", "#FF8042"];

export default function Stats() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        pendingUsers: 0,
        totalTodos: 0,
        completedTodos: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const users = await getAllUsers();
                const totalUsers = Array.isArray(users) ? users.length : 0;
                const pendingUsers = Array.isArray(users) ? users.filter(u => !u.approved).length : 0;

                const todos = await getAllTodos();
                const totalTodos = Array.isArray(todos) ? todos.length : 0;
                const completedTodos = Array.isArray(todos) ? todos.filter(t => t.completed).length : 0;

                setStats({ totalUsers, pendingUsers, totalTodos, completedTodos });
            } catch (err) {
                console.log("Error: ", err);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    const completionPercent = stats.totalTodos > 0 ? Math.round((stats.completedTodos / stats.totalTodos) * 100) : 0;
    const pieData = [
        { name: "Completed", value: stats.completedTodos },
        { name: "Incomplete", value: stats.totalTodos - stats.completedTodos },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
            <h1 className="text-4xl font-bold mb-8 text-center text-cyan-800">Admin Stats Dashboard</h1>
            {loading ? (
                <div className="text-center text-lg">Loading stats...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                    <Card className="p-6 flex flex-col items-center shadow-lg bg-white">
                        <h2 className="text-xl font-semibold mb-2 text-cyan-700">Total Users</h2>
                        <div className="text-3xl font-bold text-cyan-900">{stats.totalUsers}</div>
                    </Card>
                    <Card className="p-6 flex flex-col items-center shadow-lg bg-white">
                        <h2 className="text-xl font-semibold mb-2 text-yellow-700">Pending Users</h2>
                        <div className="text-3xl font-bold text-yellow-900">{stats.pendingUsers}</div>
                    </Card>
                    <Card className="p-6 flex flex-col items-center shadow-lg bg-white">
                        <h2 className="text-xl font-semibold mb-2 text-green-700">Total Todos</h2>
                        <div className="text-3xl font-bold text-green-900">{stats.totalTodos}</div>
                    </Card>
                    <Card className="p-6 flex flex-col items-center shadow-lg bg-white">
                        <h2 className="text-xl font-semibold mb-2 text-indigo-700">Todo Completion</h2>
                        <div className="text-2xl font-bold text-indigo-900 mb-2">{completionPercent}%</div>
                        <div className="w-full h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={70}
                                        label
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}