'use client';

import { KeyFill, PersonBadgeFill } from "react-bootstrap-icons";

import { useUserContext } from "@/context/UserContext";
import { Button, Input } from "@/components/Input";
import Message from "@/components/Message";
import Spinner from "@/components/Spinner";

export default function Login() {
    const { login, userState, message, handlerUserInput, loading } = useUserContext();
    const { username, password } = userState;

    return (
        <>
            {loading && <Spinner />}
            <div className="flex flex-col gap-6">
                <h1 className="text-2xl font-bold text-center">Login to your account</h1>
                <Message message={message.message} type={message.type} />
                <form className="flex flex-col gap-2">
                    <Input
                        id="username"
                        value={username}
                        onChange={handlerUserInput("username")}
                        type="text"
                        name="username"
                        label="Username:"
                        icon={<PersonBadgeFill />}
                        placeholder="ana.Silva"
                    />
                    <Input
                        id="password"
                        value={password}
                        onChange={handlerUserInput("password")}
                        type="password"
                        name="password"
                        label="Password:"
                        icon={<KeyFill />}
                        placeholder="••••••••"
                    />
                    <Button type="submit" onClick={login}>Login</Button>
                </form>

                <p className="text-center text-sm font-thin">Don't have an account? <a href="/register">Create one</a></p>
            </div>
        </>
    );
}