'use client';

import TaskCard from "@/components/TaskCard";
import { useTaskStore } from "@/lib/store";
import Loading from "@/components/Loading";

export default function TaskList() {
    const { tasks } = useTaskStore();

    return (
        !tasks ? <Loading /> :
            <div className="flex flex-col w-full gap-2">
                {
                    tasks.map((task, index) => (
                        <TaskCard key={index} taskData={task} />
                    ))
                }
            </div>
    );
}