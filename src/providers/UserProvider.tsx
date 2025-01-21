'use client';

import { ReactNode, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { UserContext } from "@/context/UserContext";
import { getLoginStatus, loginUser, logoutUser, registerUser } from "@/api/auth";
import { MessageProps } from "@/components/Message";

interface UserProviderProps {
    children: ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState(null);
    const [userState, setUserState] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<MessageProps>({
        message: '',
        type: undefined,
    });

    const router = useRouter();

    const register = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!userState.name || !userState.username || !userState.email || !userState.password) {
            setMessage({ message: 'Please fill all fields', type: 'error' });
            setLoading(false);
            return;
        }

        if (userState.password.length < 8) {
            setMessage({ message: 'Password must have at least 8 characters', type: 'error' });
            setLoading(false);
            return;
        }

        if (!userState.email.includes('@')) {
            setMessage({ message: 'Invalid email', type: 'error' });
            setLoading(false);
            return;
        }

        const res = await registerUser(userState);

        if (!res) {
            setMessage({ message: 'An error occurred', type: 'error' });
            setLoading(false);
            return;
        }

        if (!res?.status.toString().startsWith('2')) {
            setMessage({ message: res.status + ": " + res.data, type: 'error' });
            setLoading(false);
            return;
        }

        setUserState({
            name: '',
            username: '',
            email: '',
            password: '',
        });

        setLoading(false);

        router.push('/');
    };

    const login = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!userState.username || !userState.password) {
            setMessage({ message: 'Please fill all fields', type: 'error' });
            setLoading(false);
            return;
        }

        const res = await loginUser(userState);

        console.log(res.statusText);

        if (!res) {
            setMessage({ message: 'An error occurred', type: 'error' });
            setLoading(false);
            return;
        }

        if (!res?.status.toString().startsWith('2')) {
            setMessage({ message: res.status + ": " + res.data, type: 'error' });
            setLoading(false);
            return;
        }

        setUserState({
            name: '',
            username: '',
            email: '',
            password: '',
        });

        setLoading(false);

        router.push('/');
    }

    const loginStatus = async () => {
        setLoading(true);
        let isLoggedIn = false;

        const res = await getLoginStatus();

        isLoggedIn = res.data;

        if (!res) {
            setMessage({ message: 'An error occurred', type: 'error' });
            setLoading(false);
            return;
        }

        if (!isLoggedIn) {
            setMessage({ message: 'User not logged in', type: 'error' });
            setLoading(false);
            router.push('/login');
            return;
        }

        if (!res?.status.toString().startsWith('2')) {
            setMessage({ message: res.status + ": " + res.data, type: 'error' });
            setLoading(false);
            return;
        }

        setLoading(true);

        return isLoggedIn;
    }

    const logout = async () => {
        setLoading(true);

        const res = await logoutUser();

        if (!res) {
            setMessage({ message: 'An error occurred', type: 'error' });
            setLoading(false);
            return;
        }

        if (!res?.status.toString().startsWith('2')) {
            setMessage({ message: res.status + ": " + res.data, type: 'error' });
            setLoading(false);
            return;
        }

        setLoading(false);

        router.push('/login');
    }

    const handlerUserInput = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setUserState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <UserContext.Provider value={{
            handlerUserInput,
            register,
            login,
            loginStatus,
            logout,
            loading,
            userState,
            message
        }}>
            {children}
        </UserContext.Provider>
    );
}
