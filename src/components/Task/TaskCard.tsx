'use client';

import { Check, PencilSquare, Star, StarFill, TrashFill } from "react-bootstrap-icons";

import classConcat from "@/utils/classConcat";
import useModal from '@/hooks/useModal';
import { RemoveTask, UpdateTask } from "@/services/task.service";
import { useCategoryStore, useTaskStore } from "@/lib/store";
import { EditTask } from "@/components/Task";
import Collapse from "../Collapse";

interface TaskCardProps {
    taskID: string;
}

export default function TaskCard(props: TaskCardProps) {
    const { removeTask, updateTask, getTask } = useTaskStore();
    const { getCategory } = useCategoryStore();

    const { show } = useModal();

    const task = getTask(props?.taskID);
    const category = getCategory(task ? task.categoryId : '');
    const createdAt = new Date(task ? task.createdAt : '');

    const completeTask = () => {
        if (task) UpdateTask(task?.id, {
            status: 'completed'
        })
            .then(response => {
                if (response?.status !== 200) {
                    console.error('Error updating task:', response);
                    return;
                }

                updateTask(task.id, {
                    ...task,
                    status: 'completed'
                });
            })
            .catch(error => console.error('There has been a problem with your fetch operation: ', error));
    }

    const setIsImportant = () => {
        if (task) UpdateTask(task?.id, {
            isImportant: !task.isImportant
        })
            .then(response => {
                if (response?.status !== 200) {
                    console.error('Error updating task:', response);
                    return;
                }

                updateTask(task.id, {
                    ...task,
                    isImportant: !task.isImportant
                });
            })
            .catch(error => console.error('There has been a problem with your fetch operation: ', error));
    }

    const editModal = () => {
        show({
            title: 'Edit Task',
            content: task ? <EditTask task={task} /> : <div>Task not found</div>
        });
    }

    const deleteTask = () => {
        if (task) RemoveTask(task.id)
            .then(response => {
                if (response?.status !== 200) {
                    console.error('Error removing task:', response);
                    return;
                }

                removeTask(task.id);
            })
            .catch(error => console.error('There has been a problem with your fetch operation: ', error));
    };

    return (
        <div className="flex flex-col gap-1 p-2 rounded-xl border border-solid border-zinc-300 dark:border-zinc-800 hover:bg-zinc-500/20 trasition duration-500">
            <div className="flex gap-6 items-center">
                <h2 className={classConcat(
                    `flex items-center gap-2 text-base flex-1`,
                    `before:h-5 before:w-1 before:rounded-full before:block`,
                    task?.status === 'completed' ? 'before:bg-green-500' :
                        task?.status === 'in-progress' ? 'before:bg-yellow-500' :
                            task?.status === 'pending' ? 'before:bg-red-500' : 'before:bg-gray-500'
                )}>
                    {
                        task?.status === 'completed' ? <></> :
                            <button
                                type="button"
                                className="
                                    border border-solid rounded-full
                                    bg-zinc-300 dark:bg-zinc-800
                                    hover:bg-zinc-400 dark:hover:bg-zinc-700
                                    border-zinc-400 dark:border-zinc-700
                                    transition duration-500
                                "
                                onClick={completeTask}
                            >
                                <Check className="text-zinc-300 dark:text-zinc-800 hover:text-purple-600 transition duration-500" />
                            </button>
                    }
                    <Collapse title={task?.name} showCarret={false} themed={false} className="flex-1">
                        <div className="flex flex-col gap-2 p-1">
                            <p>{task?.description}</p>
                            <span className="text-xs text-gray-500">
                                Created at:
                                {`
                            ${String(createdAt.getDate()).padStart(2, '0')}/${String(createdAt.getMonth() + 1).padStart(2, '0')}/${createdAt.getFullYear()}
                        `}
                            </span>
                        </div>
                    </Collapse>
                </h2>
                <span style={{ color: category?.color }} className="rounded-lg text-xs font-bold">
                    {category?.name}
                </span>
                <div className="flex gap-4 p-1">
                    <button
                        className="border-none hover:bg-transparent focus:bg-transparent hover:shadow-none hover:text-yellow-400 transition duration-500"
                        onClick={setIsImportant}
                    >
                        {task?.isImportant ? <StarFill /> : <Star />}
                    </button>
                    <button
                        className="border-none hover:bg-transparent focus:bg-transparent hover:shadow-none hover:text-blue-400 transition duration-500"
                        onClick={editModal}
                    >
                        <PencilSquare />
                    </button>
                    <button
                        className="border-none hover:bg-transparent focus:bg-transparent hover:shadow-none hover:text-red-400 transition duration-500"
                        onClick={deleteTask}
                    >
                        <TrashFill />
                    </button>
                </div>
            </div>
            <div className="flex justify-between items-end">

            </div>
        </div>
    );
}