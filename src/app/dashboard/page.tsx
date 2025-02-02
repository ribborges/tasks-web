'use client';

import { House } from "react-bootstrap-icons";

import { TaskList } from "@/components/Task";
import { Blanckspace } from "@/components/Separator";
import Title from "@/components/Title";
import { useTaskStore } from "@/lib/store";

export default function DashboardPage() {
    const { tasks } = useTaskStore();

    return (
        <>
            <Title>
                <House /> Tasks
            </Title>
            <div className="box-border w-full p-4 overflow-auto">
                <TaskList tasks={tasks} />
                <Blanckspace className="lg:hidden" space={68} />
            </div>
        </>
    );
}