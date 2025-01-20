'use client';

import { ReactNode, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { UserContext } from "@/context/UserContext";
import { registerUser } from "@/api/user";

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
    const [error, setError] = useState('');

    const router = useRouter();

    const register = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!userState.name || !userState.username || !userState.email || !userState.password) {
            setError('Please fill all fields');
            setLoading(false);
            return;
        }

        if (userState.password.length < 8) {
            setError('Password must be at least 8 characters long');
            setLoading(false);
            return;
        }

        if (!userState.email.includes('@')) {
            setError('Invalid email');
            setLoading(false);
            return;
        }

        const res = await registerUser(userState);

        if (res && res?.status !== 201) {
            setError(res.status + ": " + res.data);
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
            loading,
            register,
            userState,
            error
        }}>
            {children}
        </UserContext.Provider>
    );
}
