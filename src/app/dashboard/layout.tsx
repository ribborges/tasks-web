'use client';

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";

import { useAuth } from "@/hooks/useAuth";
import Redirect from "@/components/Redirect";
import { useUserStore } from "@/lib/store";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isLoading } = useAuth();
    const { user } = useUserStore();

    if (isLoading) {
        return <Loading />;
    }

    if (!user) {
        return <Redirect path="/" />
    }

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
                        flex flex-col flex-1 gap-2
                        m-0.5 lg:m-1
                        overflow-hidden
                    ">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
}