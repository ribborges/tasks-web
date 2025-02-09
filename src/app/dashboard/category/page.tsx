'use client';

import { useSearchParams } from "next/navigation";
import { Collection } from "react-bootstrap-icons";

import Title from "@/components/Title";
import { useCategoryStore, useTaskStore } from "@/lib/store";
import Collapse from "@/components/Collapse";
import { Blanckspace } from "@/components/Separator";
import { TaskList } from "@/components/Task";

export default function CategoryPage() {
    const { categories } = useCategoryStore();
    const { tasks } = useTaskStore();
    const searchParams = useSearchParams();

    const name = searchParams.get('name');

    const category = categories.find(category => category.name === name);

    return (
        <>
            <Title>
                <Collection /> Category: {name}
            </Title>
            <div className="flex flex-col gap-4 box-border w-full p-4 overflow-auto">
                {
                    category ?
                        <>
                            <TaskList tasks={tasks.filter(task => task.categoryId === category?.id && task.status !== "completed")} />
                            <Collapse title="Completed">
                                <TaskList tasks={tasks.filter(task => task.categoryId === category?.id && task.status === "completed")} />
                            </Collapse>
                            <Blanckspace space={120} className="lg:hidden" />
                        </> :
                        <span className="text-center text-lg text-gray-500/60">
                            Category not found
                        </span>
                }
            </div>
        </>
    );
}