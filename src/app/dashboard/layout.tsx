'use client';

import { useRouter } from "next/navigation";
import { Calendar2Fill, CollectionFill, HouseFill, PlusSquareFill, StarFill } from "react-bootstrap-icons";

import Header from "@/components/Header";
import { Spinner } from "@/components/Loading";
import Navbar from "@/components/Navbar";
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
                        <MenuButton hideLabelOnMobile className="text-xs flex-col" icon={<HouseFill size={18} />} label="Tasks" onClick={() => router.push('/dashboard')} />
                        <MenuButton hideLabelOnMobile className="text-xs flex-col" icon={<Calendar2Fill size={18} />} label="Calendar" onClick={() => router.push('/dashboard/calendar')} />
                        <MenuButton hideLabelOnMobile className="text-xs flex-col" icon={<StarFill size={18} />} label="Important" onClick={() => router.push('/dashboard/important')} />
                        <MenuButton hideLabelOnMobile className="text-xs flex-col" icon={<PlusSquareFill size={18} />} label="Add" onClick={addModal} />
                        <MenuButton hideLabelOnMobile className="text-xs flex-col" icon={<CollectionFill size={18} />} label="Categories" onClick={() => router.push('/dashboard/categories')} />
                    </Navbar>
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