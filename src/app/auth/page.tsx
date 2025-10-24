'use client';

import { useState } from "react";

import AnimBackground from "@/components/AnimBackground";
import LoginForm from "@/components/forms/LoginForm";
import Footer from "@/components/Footer";
import RegisterForm from "@/components/forms/RegisterForm";

export default function AuthPage() {
    const [login, setLogin] = useState(true);

    return (
        <div className="
            h-screen w-screen
            flex justify-between flex-col
            box-border
        ">
            <AnimBackground />
            <div className="flex items-center justify-center gap-4 p-10">
                <img className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16" src="/icon.png" alt="Tasks logo" />
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-indigo-600">Tasks</h1>
            </div>
            <div className="h-full flex flex-col justify-center items-center">
                <div className="
                    relative
                    overflow-hidden
                    flex flex-col gap-2
                    w-10/12 md:w-8/12 lg:w-4/12
                    bg-zinc-300/50 dark:bg-zinc-900/50
                    border border-solid border-zinc-400/50 dark:border-zinc-800/50
                    p-4 m-4 lg:p-8 lg:m-8
                    rounded-4xl
                ">
                    <div className="flex flex-col gap-6">
                        <h1 className="text-2xl font-bold text-center">{login ? "Login to your account" : "Create a new account"}</h1>
                        {login ? <LoginForm /> : <RegisterForm />}
                        <p className="text-center text-sm flex gap-1">
                            <span>{login ? "Don't have an account?" : "Already have an account?"}</span>
                            <button className="cursor-pointer hover:underline decoration-inherit" onClick={() => setLogin(!login)}>{login ? "Create one" : "Login"}</button>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}