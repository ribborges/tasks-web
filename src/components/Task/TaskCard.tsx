'use client';

import { Check, PencilSquare, Star, StarFill, TrashFill } from "react-bootstrap-icons";
import { clsx } from 'clsx';

import useModal from '@/hooks/useModal';
import { RemoveTask, UpdateTask } from "@/services/task.service";
import { useCategoryStore, useTaskStore } from "@/lib/store";
import { EditTask } from "@/components/Task";
import Collapse from "@/components/Collapse";
import { formatDate } from "@/utils/formatDate";

interface TaskCardProps {
    taskID: string;
}

export default function TaskCard(props: TaskCardProps) {
    const { removeTask, updateTask, getTask } = useTaskStore();
    const { getCategory } = useCategoryStore();

    const { show } = useModal();

    const task = getTask(props?.taskID);
    const category = getCategory(task ? task.categoryId : '');

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
        <div className="
            flex flex-row items-center gap-2 p-3
            bg-zinc-100 dark:bg-zinc-900
            border border-solid rounded-xl
            border-zinc-200 dark:border-zinc-800
        ">
            <div className={clsx(
                "h-8 w-1 rounded-full",
                task?.status === 'completed' ? "bg-green-500" :
                    task?.status === 'in-progress' ? "bg-yellow-500" :
                        task?.status === 'pending' ? "bg-red-500" : "bg-blue-500"
            )} />
            <button
                type="button"
                className={clsx(
                    `
                        h-7 w-7
                        flex items-center justify-center
                        border border-solid rounded-full
                        transition duration-500
                    `, task?.status === 'completed' ? "border-indigo-600 bg-indigo-600/50 hover:bg-indigo-600" :
                    "bg-zinc-300 dark:bg-zinc-800 border-zinc-400 dark:border-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-700"
                )}
                onClick={completeTask}
            >
                <Check className="h-5/6 w-5/6 text-black dark:text-white" />
            </button>
            <Collapse title={task?.name ?? "Untitled Task"} showCaret={false} className="flex-1" themed={false}>
                {task?.categoryId && <span className="text-sm font-semibold md:hidden" style={{ color: category?.color }}>{category?.name}</span>}
                {task?.description && <span className="text-zinc-700 dark:text-zinc-300">{task?.description}</span>}
                {task?.dueDate && <span className="text-gray-500 md:hidden">{`Due: ${formatDate('en-US', task?.dueDate)}`}</span>}
                <span className="text-gray-500">{`Created: ${formatDate('en-US', task?.createdAt)}`}</span>
            </Collapse>
            {task?.dueDate && <span className="w-72 text-gray-500 hidden md:flex">{`Due: ${formatDate('en-US', task?.dueDate)}`}</span>}
            {task?.categoryId && <span className="w-32 text-sm font-semibold hidden md:flex" style={{ color: category?.color }}>{category?.name}</span>}
            <div className="flex items-center gap-4">
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
    );
}