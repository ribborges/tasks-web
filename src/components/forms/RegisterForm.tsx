'use client';

import { useActionState, useState } from "react";
import { EnvelopeFill, KeyFill, PersonBadgeFill, PersonFill } from "react-bootstrap-icons";

import { Button, Input } from "@/components/Input";
import { handleInputChange } from "@/utils/handleInputChange";
import { Spinner } from "@/components/Loading";
import { register } from "@/actions/auth.actions";
import Validation from "@/components/Validation";

export default function RegisterForm() {
    const [state, action, pending] = useActionState(register, undefined);

    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, setUser);

    return (
        <form action={action} className="flex flex-col gap-2">
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
            <Validation error={state?.errors?.name} />
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
            <Validation error={state?.errors?.username} />
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
            <Validation error={state?.errors?.email} />
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
            <Validation error={state?.errors?.password} />
            <Button disabled={pending} type="submit">
                {pending ? <Spinner size={24} /> : "Register"}
            </Button>
        </form>
    )
}