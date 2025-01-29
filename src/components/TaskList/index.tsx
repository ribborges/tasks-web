'use client';

import { useEffect, useState } from "react";

import { GetTasks } from "@/services/task.service";
import TaskCard from "@/components/TaskCard";
import { useTaskStore, useUserStore } from "@/lib/store";
import Loading from "@/components/Loading";

export default function TaskList() {
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useUserStore();
    const { tasks, setTasks } = useTaskStore();

    useEffect(() => {
        if (user) {
            GetTasks(user?.id).then((response) => {
                const data = response?.data;
                if (Array.isArray(data)) {
                    setTasks(data);
                    setIsLoading(false);
                } else {
                    setTasks([]);
                }
            }).catch((error) => {
                console.error("Error fetching tasks:", error);
                setTasks([]);
            });
        }
    }, []);

    return (
        isLoading ? <Loading /> :
            <div className="flex flex-col w-full gap-2">
                {
                    tasks.map((task, index) => (
                        <TaskCard key={index} taskData={task} />
                    ))
                }
            </div>
    );
}