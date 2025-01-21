import api from "./base";

async function getLoggedUser() {
    try {
        const res = await api.get("/user", {
            withCredentials: true
        });

        return res;
    } catch (error) {
        if (error instanceof Error && 'response' in error) {
            return (error as any).response;
        }
    }
}

export { getLoggedUser };