'use client';

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { KeyFill, PersonBadgeFill } from "react-bootstrap-icons";

import { Button, Input } from "@/components/Input";
import Message, { MessageProps } from "@/components/Message";
import Spinner from "@/components/Loading";
import useUserStore from "@/lib/store/user.store";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<MessageProps>({
        message: '',
        type: undefined,
    });
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const router = useRouter();

    const { login } = useUserStore();

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;

        setCredentials((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);

        if (!credentials.username || !credentials.password) {
            setMessage({ message: 'Please fill all fields', type: 'error' });
            setLoading(false);
            return;
        }

        try {
            await login(credentials);
            setLoading(false);
            router.push('/');
        } catch (error) {
            setMessage({ message: 'An error occurred', type: 'error' });
            setLoading(false);
        }
    }

    return (
        <>
            {loading && <Spinner />}
            <div className="flex flex-col gap-6">
                <h1 className="text-2xl font-bold text-center">Login to your account</h1>
                <Message message={message.message} type={message.type} />
                <form className="flex flex-col gap-2">
                    <Input
                        id="username"
                        value={credentials.username}
                        onChange={handleChange}
                        type="text"
                        name="username"
                        label="Username:"
                        icon={<PersonBadgeFill />}
                        placeholder="ana.Silva"
                    />
                    <Input
                        id="password"
                        value={credentials.password}
                        onChange={handleChange}
                        type="password"
                        name="password"
                        label="Password:"
                        icon={<KeyFill />}
                        placeholder="••••••••"
                    />
                    <Button type="submit" onClick={handleSubmit}>Login</Button>
                </form>

                <p className="text-center text-sm font-thin">Don't have an account? <a href="/register">Create one</a></p>
            </div>
        </>
    );
}