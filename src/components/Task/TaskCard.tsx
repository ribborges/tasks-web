'use client';

import { PencilSquare, Star, StarFill, TrashFill } from "react-bootstrap-icons";

import { TaskSchema } from "@/types/task";
import EditTask from "../EditTask";
import classConcat from "@/utils/classConcat";
import useModal from '@/hooks/useModal';
import { RemoveTask } from "@/services/task.service";
import { useCategoryStore, useTaskStore } from "@/lib/store";

interface TaskCardProps {
    taskData: TaskSchema;
}

export default function TaskCard(props: TaskCardProps) {
    const createdAt = new Date(props.taskData.createdAt);

    const { removeTask } = useTaskStore();
    const { getCategory } = useCategoryStore();

    const { show } = useModal();

    const category = getCategory(props.taskData.categoryId);

    const editModal = () => {
        show({
            title: 'Edit Task',
            content: <EditTask task={props.taskData} />
        });
    }

    const deleteTask = () => {
        RemoveTask(props.taskData.id)
            .then(response => {
                if (response?.status !== 200) {
                    console.error('Error removing task:', response);
                    return;
                }

                removeTask(props.taskData.id);
            })
            .catch(error => console.error('There has been a problem with your fetch operation: ', error));
    };

    return (
        <div className="flex flex-col gap-2 p-2 rounded-xl border border-solid border-zinc-300 dark:border-zinc-800 hover:bg-zinc-500/20 trasition duration-500">
            <div className="flex flex-col gap-1 items-start">
                <h2 className={classConcat(
                    `flex items-center text-base`,
                    `before:h-5 before:w-1 before:mr-2 before:rounded-full before:block`,
                    props.taskData.status === 'completed' ? 'before:bg-green-500' :
                        props.taskData.status === 'in-progress' ? 'before:bg-yellow-500' :
                            props.taskData.status === 'pending' ? 'before:bg-red-500' : 'before:bg-gray-500'
                )}>{props.taskData.name}</h2>
                <span style={{ color: category?.color }} className="rounded-lg text-xs font-bold">{category?.name}</span>
                <p className="text-sm">{props.taskData.description}</p>
            </div>
            <div className="flex justify-between items-end">
                <div>
                    <span className="text-xs text-gray-500">
                        Created at:
                        {`
                            ${String(createdAt.getDate()).padStart(2, '0')}/${String(createdAt.getMonth() + 1).padStart(2, '0')}/${createdAt.getFullYear()}
                        `}
                    </span>
                </div>
                <div className="flex gap-4 p-1">
                    <button className="border-none hover:bg-transparent focus:bg-transparent hover:shadow-none hover:text-yellow-400 transition duration-500">
                        {props.taskData.isImportant ? <StarFill /> : <Star />}
                    </button>
                    <button
                        className="border-none hover:bg-transparent focus:bg-transparent hover:shadow-none hover:text-yellow-400 transition duration-500"
                        onClick={editModal}
                    >
                        <PencilSquare />
                    </button>
                    <button className="border-none hover:bg-transparent focus:bg-transparent hover:shadow-none hover:text-red-400 transition duration-500" onClick={deleteTask}>
                        <TrashFill />
                    </button>
                </div>
            </div>
        </div>
    );
}