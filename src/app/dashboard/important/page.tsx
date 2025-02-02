'use client';

import { Star } from "react-bootstrap-icons";

import { TaskList } from "@/components/Task";
import { Blanckspace } from "@/components/Separator";
import Title from "@/components/Title";
import { useTaskStore } from "@/lib/store";

export default function ImportantPage() {
    const { tasks } = useTaskStore();

    return (
        <>
            <Title>
                <Star /> Important tasks
            </Title>
            <div className="box-border w-full p-4 overflow-auto">
                <TaskList tasks={tasks.filter(task => task.isImportant === true)} />
                <Blanckspace className="lg:hidden" space={68} />
            </div>
        </>
    );
}