'use client';

import { EnvelopeFill, KeyFill, PersonBadgeFill, PersonFill } from "react-bootstrap-icons";

import { useUserContext } from "@/context/UserContext";
import { Button, Input } from "@/components/Input";
import Message from "@/components/Message";
import Spinner from "@/components/Spinner";

export default function Register() {
    const { register, userState, message, handlerUserInput, loading } = useUserContext();
    const { name, username, email, password } = userState;

    return (
        <>
            {loading && <Spinner />}
            <div className="flex flex-col gap-6">
                <h1 className="text-2xl font-bold text-center">Create a new account</h1>
                <Message message={message.message} type={message.type} />
                <form className="flex flex-col gap-2">
                    <Input
                        id="name"
                        value={name}
                        onChange={handlerUserInput("name")}
                        type="text"
                        name="name"
                        label="Full name:"
                        icon={<PersonFill />}
                        placeholder="Ana Silva"
                    />
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
                        id="email"
                        value={email}
                        onChange={handlerUserInput("email")}
                        type="email"
                        name="email"
                        label="Email:"
                        icon={<EnvelopeFill />}
                        placeholder="ana_silva@email.com"
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
                    <Button type="submit" onClick={register}>Register</Button>
                </form>

                <p className="text-center text-sm font-thin">Already have an account? <a href="/login">Login</a></p>
            </div>
        </>
    );
}