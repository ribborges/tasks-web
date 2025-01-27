import { AxiosError } from "axios";

import { api } from "@/api";

async function getLoggedUser() {
    try {
        const res = await api.get("/user", {
            withCredentials: true
        });

        return res;
    } catch (error) {
        if (error instanceof AxiosError && 'response' in error) {
            return error.response;
        }
    }
}

export { getLoggedUser };