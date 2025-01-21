import api from "./base";

interface RegisterData {
    name: string;
    username: string;
    email: string;
    password: string;
}

interface LoginData {
    username: string;
    password: string;
}

async function registerUser({ name, username, email, password }: RegisterData) {
    try {
        const res = await api.post("/auth/register", {
            name,
            username,
            email,
            password
        }, {
            withCredentials: true
        });

        return res;
    } catch (error) {
        if (error instanceof Error && 'response' in error) {
            return (error as any).response;
        }
    }
}

async function loginUser({ username, password }: LoginData) {
    try {
        const res = await api.post("/auth/login", {
            username,
            password
        }, {
            withCredentials: true
        });

        return res;
    } catch (error) {
        if (error instanceof Error && 'response' in error) {
            return (error as any).response;
        }
    }
}

async function getLoginStatus() {
    try {
        const res = await api.get("/auth/status", {
            withCredentials: true
        });

        return res;
    } catch (error) {
        if (error instanceof Error && 'response' in error) {
            return (error as any).response;
        }
    }
}

async function logoutUser() {
    try {
        const res = await api.get("/auth/logout", {
            withCredentials: true
        });

        return res;
    } catch (error) {
        if (error instanceof Error && 'response' in error) {
            return (error as any).response;
        }
    }
}

export { registerUser, loginUser, getLoginStatus, logoutUser };