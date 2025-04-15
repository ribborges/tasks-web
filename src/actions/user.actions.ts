"use server";

import { getLoggedUser } from "@/services/user.service";
import { cookies } from "next/headers";

export async function fetchUser() {
    const cookieStore = cookies();
                const tokenCookie = (await cookieStore).get("token");

    return await getLoggedUser(tokenCookie?.value)
        .then((res) => {
            const { token, ...user } = res?.data;

            return { token, user };
        })
        .catch((error) => {
            console.error(error);
        });
}