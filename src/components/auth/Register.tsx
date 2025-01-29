'use client';

import { FormEvent, useState } from "react";
import router from "next/router";
import { EnvelopeFill, KeyFill, PersonBadgeFill, PersonFill } from "react-bootstrap-icons";

import { Button, Input } from "@/components/Input";
import Message, { MessageProps } from "@/components/Message";
import Spinner from "@/components/Loading";
import useUserStore from "@/lib/store/user.store";

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<MessageProps>({
        message: '',
        type: undefined,
    });
    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    });

    const { register } = useUserStore();

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;

        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);

        if (!user.name || !user.username || !user.email || !user.password) {
            setMessage({ message: 'Please fill all fields', type: 'error' });
            setLoading(false);
            return;
        }

        if (user.password.length < 8) {
            setMessage({ message: 'Password must have at least 8 characters', type: 'error' });
            setLoading(false);
            return;
        }

        if (!user.email.includes('@')) {
            setMessage({ message: 'Invalid email', type: 'error' });
            setLoading(false);
            return;
        }

        try {
            await register(user);
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
                <h1 className="text-2xl font-bold text-center">Create a new account</h1>
                <Message message={message.message} type={message.type} />
                <form className="flex flex-col gap-2">
                    <Input
                        id="name"
                        value={user.name}
                        onChange={handleChange}
                        type="text"
                        name="name"
                        label="Full name:"
                        icon={<PersonFill />}
                        placeholder="Ana Silva"
                    />
                    <Input
                        id="username"
                        value={user.username}
                        onChange={handleChange}
                        type="text"
                        name="username"
                        label="Username:"
                        icon={<PersonBadgeFill />}
                        placeholder="ana.Silva"
                    />
                    <Input
                        id="email"
                        value={user.email}
                        onChange={handleChange}
                        type="email"
                        name="email"
                        label="Email:"
                        icon={<EnvelopeFill />}
                        placeholder="ana_silva@email.com"
                    />
                    <Input
                        id="password"
                        value={user.password}
                        onChange={handleChange}
                        type="password"
                        name="password"
                        label="Password:"
                        icon={<KeyFill />}
                        placeholder="••••••••"
                    />
                    <Button type="submit" onClick={handleSubmit}>Register</Button>
                </form>

                <p className="text-center text-sm font-thin">Already have an account? <a href="/login">Login</a></p>
            </div>
        </>
    );
}