'use client';

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { useCheckUser, useRedirect } from "@/hooks";
import { useLoadingStore, useUserStore } from "@/lib/store";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isLoading } = useLoadingStore();
    const { user } = useUserStore();

    useCheckUser();

    useRedirect("/login", user === undefined && !isLoading, [user]);

    return (
        <main className="
        bg-zinc-100 dark:bg-zinc-950
        w-screen h-screen
        ">
            <div className="flex flex-col h-screen overflow-hidden">
                <Header />
                <div className="flex-1 flex overflow-hidden flex-col-reverse lg:flex-row">
                    <Navbar />
                    <div className="
                        flex-1
                        m-0.5 lg:m-1
                        bg-zinc-200 dark:bg-zinc-900
                        border border-solid rounded-xl
                        border-zinc-300 dark:border-zinc-800
                        overflow-hidden
                    ">
                        {isLoading ? <Loading /> : children}
                    </div>
                </div>
            </div>
        </main>
    );
}