'use client';

import { useActionState, useState } from "react";
import { KeyFill, PersonBadgeFill } from "react-bootstrap-icons";

import { Button, Input } from "@/components/Input";
import { handleInputChange } from "@/utils/handleInputChange";
import { Spinner } from "@/components/Loading";
import { login } from "@/actions/auth.actions";
import Validation from "@/components/Validation";

export default function LoginForm() {
    const [state, action, pending] = useActionState(login, undefined);

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, setCredentials);

    return (
        <form action={action} className="flex flex-col gap-2">
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
            <Validation error={state?.errors?.username} />
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
            <Validation error={state?.errors?.password} />
            <Button disabled={pending} type="submit">
                {pending ? <Spinner size={24} /> : "Login"}
            </Button>
        </form>
    )
}