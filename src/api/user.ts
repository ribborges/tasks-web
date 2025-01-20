import api from "./base";

interface RegisterData {
    name: string;
    username: string;
    email: string;
    password: string;
}

async function registerUser({ name, username, email, password }: RegisterData) {
    try {
        const res = await api.post("/auth/register", {
            name,
            username,
            email,
            password
        });

        return res;
    } catch (error) {
        console.error(error);
    }
}

export { registerUser };