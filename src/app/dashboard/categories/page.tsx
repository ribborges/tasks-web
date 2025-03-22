'use client';

import { CollectionFill } from "react-bootstrap-icons";

import { TaskList } from "@/components/Task";
import { Blanckspace } from "@/components/Separator";
import Title from "@/components/Title";
import { useCategoryStore, useTaskStore } from "@/lib/store";
import Collapse from "@/components/Collapse";
import { Filter } from "@/components/Filter";

export default function CalendarPage() {
    const { tasks } = useTaskStore();
    const { categories } = useCategoryStore();

    return (
        <>
            <Title>
                <CollectionFill /> Categories
            </Title>
            <div className="flex flex-col gap-4 box-border w-full p-4 overflow-auto">
                <Filter id="add" items={[
                    {
                        label: 'Uncategorized',
                        content: <>
                            <TaskList tasks={tasks.filter(task => task.status !== "completed" && !task.categoryId)} />
                            <Collapse title="Completed">
                                {
                                    tasks.filter(task => task.status === "completed" && !task.categoryId).length > 0 ?
                                        <TaskList tasks={tasks.filter(task => task.status === "completed" && !task.categoryId)} /> :
                                        <span className="text-lg text-gray-500">No completed tasks</span>
                                }
                            </Collapse>
                        </>
                    },
                    ...categories.map((category) => ({
                        label: category.name,
                        icon: <CollectionFill color={category.color} />,
                        content: <>
                            <TaskList tasks={tasks.filter(task => task.status !== "completed" && task.categoryId === category.id)} />
                            <Collapse title="Completed">
                                {
                                    tasks.filter(task => task.status === "completed" && task.categoryId === category.id).length > 0 ?
                                        <TaskList tasks={tasks.filter(task => task.status === "completed" && task.categoryId === category.id)} /> :
                                        <span className="text-lg text-gray-500">No completed tasks</span>
                                }
                            </Collapse>
                        </>
                    }))
                ]} />
                <Blanckspace className="lg:hidden mt-32" />
            </div>
        </>
    );
}