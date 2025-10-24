'use client';

import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";
import { Calendar2Fill, CollectionFill, HouseFill, PlusSquareFill, StarFill } from "react-bootstrap-icons";

import Header from "@/components/Header";
import { Spinner } from "@/components/Loading";
import { Bottombar } from "@/components/Bottombar";
import { Sidebar, SidebarToggle, SidebarContent, SidebarItem } from "@/components/Sidebar";
import { MenuButton, Toggle } from "@/components/Input";
import useModal from "@/hooks/useModal";
import AddTask from "@/components/forms/AddTask";
import AddCategory from "@/components/forms/AddCategory";
import useCheckUser from "@/hooks/useCheckUser";
import useLoadData from "@/hooks/useLoadData";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { userLoading } = useCheckUser();
    const { dataLoading } = useLoadData();
    const router = useRouter();
    const pathname = usePathname();

    const { show } = useModal();

    const addModal = () => {
        show({
            title: 'Add',
            content: <Toggle id='add' itemsAlign="baseline" items={[
                { label: 'Task', content: <AddTask /> },
                { label: 'Category', content: <AddCategory /> }
            ]} />
        });
    }

    return (
        <main className="w-screen h-screen">
            <div className="flex flex-col h-screen overflow-hidden">
                <Header />
                <div className="flex-1 flex overflow-hidden flex-col-reverse lg:flex-row">
                    <Sidebar defaultExpanded={false} className="hidden md:block">
                        <SidebarToggle />
                        <SidebarContent>
                            <SidebarItem>{(context) => <MenuButton
                                className={clsx(
                                    pathname === "/dashboard" ? "bg-zinc-200 dark:bg-zinc-900" : "",
                                    context.isExpanded ? "" : "justify-center"
                                )}
                                icon={<HouseFill />}
                                label={
                                    <span
                                        className={clsx(
                                            "text-sm transition duration-500",
                                            context.isExpanded ? "opacity-100 translate-x-0" : "absolute opacity-0 -translate-x-2 w-0"
                                        )}
                                    >Tasks</span>
                                }
                                onClick={() => router.push('/dashboard')}
                            />}</SidebarItem>
                            <SidebarItem>{(context) => <MenuButton
                                className={clsx(
                                    pathname === "/dashboard/calendar" ? "bg-zinc-200 dark:bg-zinc-900" : "",
                                    context.isExpanded ? "" : "justify-center"
                                )}
                                icon={<Calendar2Fill />}
                                label={
                                    <span
                                        className={clsx(
                                            "text-sm transition duration-500",
                                            context.isExpanded ? "opacity-100 translate-x-0" : "absolute opacity-0 -translate-x-2 w-0"
                                        )}
                                    >Calendar</span>
                                }
                                onClick={() => router.push('/dashboard/calendar')}
                            />}</SidebarItem>
                            <SidebarItem>{(context) => <MenuButton
                                className={clsx(
                                    pathname === "/dashboard/important" ? "bg-zinc-200 dark:bg-zinc-900" : "",
                                    context.isExpanded ? "" : "justify-center"
                                )}
                                icon={<StarFill />}
                                label={
                                    <span
                                        className={clsx(
                                            "text-sm transition duration-500",
                                            context.isExpanded ? "opacity-100 translate-x-0" : "absolute opacity-0 -translate-x-2 w-0"
                                        )}
                                    >Important</span>
                                }
                                onClick={() => router.push('/dashboard/important')}
                            />}</SidebarItem>
                            <SidebarItem>{(context) => <MenuButton
                                className={context.isExpanded ? "" : "justify-center"}
                                icon={<PlusSquareFill />}
                                label={
                                    <span
                                        className={clsx(
                                            "text-sm transition duration-500",
                                            context.isExpanded ? "opacity-100 translate-x-0" : "absolute opacity-0 -translate-x-2 w-0"
                                        )}
                                    >Add</span>
                                }
                                onClick={addModal}
                            />}</SidebarItem>
                            <SidebarItem>{(context) => <MenuButton
                                className={clsx(
                                    pathname === "/dashboard/categories" ? "bg-zinc-200 dark:bg-zinc-900" : "",
                                    context.isExpanded ? "" : "justify-center"
                                )}
                                icon={<CollectionFill />}
                                label={
                                    <span
                                        className={clsx(
                                            "text-sm transition duration-500",
                                            context.isExpanded ? "opacity-100 translate-x-0" : "absolute opacity-0 -translate-x-2 w-0"
                                        )}
                                    >Categories</span>
                                }
                                onClick={() => router.push('/dashboard/categories')}
                            />}</SidebarItem>
                        </SidebarContent>
                    </Sidebar>
                    <Bottombar className="block md:hidden">
                        <MenuButton className={clsx("flex-col", pathname === "/dashboard" ? "bg-indigo-500 dark:bg-indigo-800" : "")} icon={<HouseFill size={18} />} onClick={() => router.push('/dashboard')} />
                        <MenuButton className={clsx("flex-col", pathname === "/dashboard/calendar" ? "bg-indigo-500 dark:bg-indigo-800" : "")} icon={<Calendar2Fill size={18} />} onClick={() => router.push('/dashboard/calendar')} />
                        <MenuButton className="flex-col" icon={<PlusSquareFill size={18} />} onClick={addModal} />
                        <MenuButton className={clsx("flex-col", pathname === "/dashboard/categories" ? "bg-indigo-500 dark:bg-indigo-800" : "")} icon={<CollectionFill size={18} />} onClick={() => router.push('/dashboard/categories')} />
                        <MenuButton className={clsx("flex-col", pathname === "/dashboard/important" ? "bg-indigo-500 dark:bg-indigo-800" : "")} icon={<StarFill size={18} />} onClick={() => router.push('/dashboard/important')} />
                    </Bottombar>
                    <div className="
                        flex flex-col flex-1
                        m-0 lg:m-1
                        overflow-hidden
                    ">
                        {
                            userLoading || dataLoading ?
                                <div className="flex justify-center items-center h-full w-full">
                                    <Spinner size={64} />
                                </div> :
                                children
                        }
                    </div>
                </div>
            </div>
        </main>
    );
}