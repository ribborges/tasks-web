'use client';

import { useCallback, useEffect } from "react";

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { useCheckUser, useRedirect } from "@/hooks";
import { useCategoryStore, useLoadingStore, useTaskStore, useUserStore } from "@/lib/store";
import { GetTasks } from "@/services/task.service";
import { GetCategories } from "@/services/category.service";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isLoading } = useLoadingStore();
    const { user } = useUserStore();
    const { setTasks } = useTaskStore();
    const { setCategories } = useCategoryStore();

    useCheckUser();

    useRedirect("/login", user === undefined && !isLoading, [user]);

    const loadData = useCallback(async () => {
        if (user) {
            await GetCategories(user?.id).then((res) => {
                const data = res?.data;

                if (Array.isArray(data)) {
                    setCategories(data);
                } else {
                    setCategories([]);
                }
            }).catch((error) => {
                console.error("Error fetching categories:", error);
                setCategories([]);
            });

            await GetTasks(user?.id).then((res) => {
                const data = res?.data;

                if (Array.isArray(data)) {
                    setTasks(data);
                } else {
                    setTasks([]);
                }
            }).catch((error) => {
                console.error("Error fetching tasks:", error);
                setTasks([]);
            });
        }
    }, [user, GetTasks, GetCategories, setTasks, setCategories]);

    useEffect(() => {
        loadData();
    }, [user]);

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