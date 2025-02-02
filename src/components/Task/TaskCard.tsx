'use client';

import { PencilSquare, Star, StarFill, TrashFill } from "react-bootstrap-icons";

import classConcat from "@/utils/classConcat";
import useModal from '@/hooks/useModal';
import { RemoveTask, UpdateTask } from "@/services/task.service";
import { useCategoryStore, useTaskStore } from "@/lib/store";
import { EditTask } from "@/components/Task";

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
        <div className="flex flex-col gap-2 p-2 rounded-xl border border-solid border-zinc-300 dark:border-zinc-800 hover:bg-zinc-500/20 trasition duration-500">
            <div className="flex flex-col gap-1 items-start">
                <h2 className={classConcat(
                    `flex items-center text-base`,
                    `before:h-5 before:w-1 before:mr-2 before:rounded-full before:block`,
                    task?.status === 'completed' ? 'before:bg-green-500' :
                        task?.status === 'in-progress' ? 'before:bg-yellow-500' :
                            task?.status === 'pending' ? 'before:bg-red-500' : 'before:bg-gray-500'
                )}>{task?.name}</h2>
                <span style={{ color: category?.color }} className="rounded-lg text-xs font-bold">{category?.name}</span>
                <p className="text-sm">{task?.description}</p>
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
        </div>
    );
}