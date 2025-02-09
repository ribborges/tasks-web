'use client';

import { FormEvent, useState } from "react";
import router from "next/router";
import { EnvelopeFill, KeyFill, PersonBadgeFill, PersonFill } from "react-bootstrap-icons";

import { Button, Input } from "@/components/Input";
import Message, { MessageProps } from "@/components/Message";
import { handleInputChange } from "@/utils/handleInputChange";
import { useUserStore } from "@/lib/store";
import { Spinner } from "@/components/Loading";

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, setUser);

    const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);

        if (!user.name || !user.username || !user.email || !user.password) {
            setMessage({ message: 'Please fill all fields', type: 'error' });
            setIsLoading(false);
            return;
        }

        if (user.password.length < 8) {
            setMessage({ message: 'Password must have at least 8 characters', type: 'error' });
            setIsLoading(false);
            return;
        }

        if (!user.email.includes('@')) {
            setMessage({ message: 'Invalid email', type: 'error' });
            setIsLoading(false);
            return;
        }

        try {
            await register(user);
            setIsLoading(false);
            router.push('/');
        } catch (error) {
            setMessage({ message: 'An error occurred', type: 'error' });
            setIsLoading(false);
        }
    }

    return isLoading ? (
        <Spinner />
    ) : (
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
    )
}