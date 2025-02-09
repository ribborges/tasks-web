'use client';

import AnimBackground from "@/components/AnimBackground";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import Redirect from "@/components/Redirect";
import { useAuth } from "@/hooks/useAuth";

export default function AuthPage({ children }: { children?: React.ReactNode }) {
    const { authenticated, isLoading } = useAuth();

    if (isLoading) {
        return <Loading />;
    }

    if (authenticated) {
        return <Redirect path="/dashboard" />
    }

    return (
        <div className="
                h-screen w-screen
                flex justify-between items-center flex-col
                box-border
            ">
            <AnimBackground />
            <div className="flex items-center gap-4 p-10">
                <img className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16" src="/icon.png" alt="Tasks logo" />
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-indigo-600">Tasks</h1>
            </div>
            <div className="
                relative
                overflow-hidden
                flex flex-col gap-2
                w-10/12 md:w-8/12 lg:w-4/12
                bg-zinc-400 bg-opacity-50 dark:bg-zinc-800 dark:bg-opacity-50
                border border-solid border-zinc-500 border-opacity-50 dark:border-zinc-700 dark:border-opacity-50
                p-4 m-4 lg:p-8 lg:m-8
                rounded-2xl
                shadow-xl shadow-black/10 dark:shadow-white/10
            ">
                {children}
                {isLoading &&
                    <div className="absolute">
                        <Loading />
                    </div>
                }
            </div>
            <Footer />
        </div>
    );
}