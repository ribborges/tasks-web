'use client';

import { Star } from "react-bootstrap-icons";

import { TaskList } from "@/components/Task";
import { Blanckspace } from "@/components/Separator";
import Title from "@/components/Title";
import { useTaskStore } from "@/lib/store";
import Collapse from "@/components/Collapse";

export default function ImportantPage() {
    const { tasks } = useTaskStore();

    return (
        <>
            <Title>
                <Star /> Important tasks
            </Title>
            <div className="flex flex-col gap-4 box-border w-full p-4 overflow-auto">
                <TaskList tasks={tasks.filter(task => task.isImportant === true && task.status !== "completed")} />
                <Collapse title="Completed">
                    <TaskList tasks={tasks.filter(task => task.isImportant === true && task.status === "completed")} />
                </Collapse>
                <Blanckspace space={120} className="lg:hidden" />
            </div>
        </>
    );
}