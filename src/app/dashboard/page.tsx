'use client';

import { House } from "react-bootstrap-icons";

import { TaskList } from "@/components/Task";
import { Blanckspace } from "@/components/Separator";
import Title from "@/components/Title";
import { useTaskStore } from "@/lib/store";
import Collapse from "@/components/Collapse";

export default function DashboardPage() {
    const { tasks } = useTaskStore();

    return (
        <>
            <Title>
                <House /> Tasks
            </Title>
            <div className="flex flex-col gap-4 box-border w-full p-4 overflow-auto">
                <TaskList tasks={tasks.filter(task => task.status !== "completed")} />
                <Collapse title="Completed">
                    <TaskList tasks={tasks.filter(task => task.status === "completed")} />
                </Collapse>
                <Blanckspace className="lg:hidden mt-32" />
            </div>
        </>
    );
}