"use server";

import { cookies } from "next/headers";

import { getLoggedUser } from "@/services/user.service";

export async function fetchUser() {
    const cookieStore = cookies();
    const tokenCookie = (await cookieStore).get("token");

    if (!tokenCookie) {
        return { message: "No token found", error: true };
    }

    return await getLoggedUser(tokenCookie?.value)
        .then((res) => {
            if (!res) {
                return { message: "An error occurred", error: true };
            }

            if (!res?.status.toString().startsWith("2")) {
                return { message: res.status + ": " + res.data, error: true };
            }

            const { token, ...user } = res?.data;

            return { token, user };
        })
        .catch((err) => {
            return { message: "An error occurred", error: true };
        });
}