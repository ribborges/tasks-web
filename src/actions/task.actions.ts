"use server";

import { cookies } from "next/headers";

import { getTasks } from "@/services/task.service";

export async function fetchTasks(userId: string) {
    const cookieStore = cookies();
    const tokenCookie = (await cookieStore).get("token");

    if (!tokenCookie) {
        return { message: "No token found", error: true };
    }

    return await getTasks(userId, tokenCookie.value)
        .then((res) => {
            if (!res) {
                return { message: "An error occurred", error: true };
            }

            if (!res?.status.toString().startsWith("2")) {
                return { message: res.status + ": " + res.data, error: true };
            }

            const data = res?.data;

            if (Array.isArray(data)) {
                return data;
            } else {
                return [];
            }
        }).catch((error) => {
            return { message: "An error occurred", error: true };
        });
}