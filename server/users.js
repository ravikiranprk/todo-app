"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserById(id) {
    try {
        const user = await db.select().from(users).where(eq(users.id, id));
        return user;
    } catch (error) {
        console.log(error);
        return { error: "Failed to get user by id" }
    }
}
export async function getUserByEmail(email) {
    try {
        const user = await db.select().from(users).where(eq(users.email, email));
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export async function getAllUsers() {
    try {
        const allUsers = await db.select().from(users);
        return allUsers;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function createUser(user) {
    try {
        const newUser = await db.insert(users).values(user);
        return newUser;
    } catch (error) {
        console.log(error);
        return { error: "Failed to create a new user" }
    }
}

export async function updateUser(id, data) {
    try {
        const updatedUser = await db.update(users).set(data).where(eq(users.id, id));
        return updatedUser;
    } catch (error) {
        console.log(error);
        return { error: "Failed to update user" }
    }
}

export async function deleteUser(id) {
    try {
        const deletedUser = await db.delete(users).where(eq(users.id, id));
        return deletedUser;
    } catch (error) {
        console.log(error);
        return { error: "Failed to delete user" }
    }
}

export async function approveUser(id) {
    try {
        const approvedUser = await db.update(users).set({ approved: true }).where(eq(users.id, id));
        return approvedUser;
    } catch (error) {
        console.log(error);
        return { error: "Failed to approve user" }
    }
}
export async function rejectUser(id) {
    try {
        const rejectedUser = await db.update(users).set({ approved: false }).where(eq(users.id, id));
        return rejectedUser;
    } catch (error) {
        console.log(error);
        return { error: "Failed to reject user" }
    }
}