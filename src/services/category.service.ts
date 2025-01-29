import { AxiosError } from "axios";

import { api } from "@/api";

async function GetCategories(userId: string) {
    try {
        const res = await api.get("/categories", {
            withCredentials: true,
            params: {
                userId: userId
            }
        });

        return res;
    } catch (error) {
        if (error instanceof AxiosError && 'response' in error) {
            return error.response;
        }
    }
}

export { GetCategories };