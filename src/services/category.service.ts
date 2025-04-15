import { AxiosError } from "axios";

import { api } from "@/api";
import { CategoryData } from "@/interfaces/category";

async function getCategories(userId: string, token: string) {
    try {
        const res = await api.get("/categories", {
            withCredentials: true,
            params: {
                userId: userId
            },
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

async function createCategory(
    {
        name,
        color
    }: CategoryData,
    token: string
) {
    try {
        const res = await api.post("/category", {
            name,
            color
        }, {
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

async function updateCategory(
    id: string,
    data: {
        name?: string,
        color?: string
    },
    token: string
) {
    try {
        const res = await api.patch(`/category/${id}`, data, {
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

export { getCategories, createCategory, updateCategory };