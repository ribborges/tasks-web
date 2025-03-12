'use client';

import { useRouter } from "next/navigation";
import { Calendar2Fill, CollectionFill, HouseFill, PlusSquareFill, StarFill } from "react-bootstrap-icons";

import Header from "@/components/Header";
import { Loading } from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import Redirect from "@/components/Redirect";
import { useUserStore } from "@/lib/store";
import { MenuButton, Toggle } from "@/components/Input";
import useModal from "@/hooks/useModal";
import { AddTask } from "@/components/Task";
import { AddCategory } from "@/components/Category";

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

    const router = useRouter();

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
                    <Navbar>
                        <MenuButton className="text-xs flex-col" icon={<HouseFill size={18} />} label="Tasks" onClick={() => router.push('/dashboard')} />
                        <MenuButton className="text-xs flex-col" icon={<Calendar2Fill size={18} />} label="Calendar" onClick={() => router.push('/dashboard/calendar')} />
                        <MenuButton className="text-xs flex-col" icon={<StarFill size={18} />} label="Important" onClick={() => router.push('/dashboard/important')} />
                        <MenuButton className="text-xs flex-col" icon={<PlusSquareFill size={18} />} label="Add" onClick={addModal} />
                        <MenuButton className="text-xs flex-col" icon={<CollectionFill size={18} />} label="Categories" />
                    </Navbar>
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