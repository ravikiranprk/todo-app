"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useMemo } from "react";
import { User } from "@/db/schema";

const UsersChart = ({ totalUsers, pendingUsers } : { totalUsers: User[]; pendingUsers: User[]; }) => {
  const chartData = useMemo(() => {
    const totalCount = totalUsers.length;
    const pendingCount = pendingUsers.length;

    return [
      { name: 'Total Users', users: totalCount },
      { name: 'Pending Users', users: pendingCount }
    ];
  }, [totalUsers, pendingUsers]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} width={400} height={300} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Line type="monotone" dataKey="users" stroke="#8884d8" />
        <Tooltip />
        <Legend align="right" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UsersChart;
