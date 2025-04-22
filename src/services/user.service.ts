import { AxiosError } from "axios";

import { api } from "@/api";

async function getLoggedUser(token: string) {
    try {
        const res = await api.get("/user", {
            withCredentials: true,
            headers: {
                cookie: `token=${token}`
            }
        });

        return res;
    } catch (error) {
        if (error instanceof AxiosError && 'response' in error) {
            return error.response;
        }
    }
}

async function updateUser(
    userId: string,
    data: {
        username?: string,
        name?: string,
        email?: string,
        profilePic?: string,
    },
    token: string
) {
    try {
        const res = await api.patch(`/user/${userId}`, data, {
            withCredentials: true,
            headers: {
                cookie: `token=${token}`
            }
        });

        return res;
    } catch (error) {
        if (error instanceof AxiosError && 'response' in error) {
            return error.response;
        }
    }
}

async function changePassword(
    userId: string,
    password: {
        password: string,
        newPassword: string,
    },
    token: string
) {
    try {
        const res = await api.patch(`/password/${userId}`, password, {
            withCredentials: true,
            headers: {
                cookie: `token=${token}`
            }
        });

        return res;
    } catch (error) {
        if (error instanceof AxiosError && 'response' in error) {
            return error.response;
        }
    }
}

export { getLoggedUser, updateUser, changePassword };