'use client';

import { useActionState, useEffect, useState } from "react";
import { CheckCircle, Collection, CollectionFill, ExclamationDiamond, ListTask, TextParagraph } from "react-bootstrap-icons";

import { Spinner } from "@/components/Loading";
import { Button, Input, OptionSelector } from "@/components/Input";
import { handleInputChange } from "@/utils/handleInputChange";
import { useCategoryStore, useTaskStore } from "@/lib/store";
import { TaskData } from "@/interfaces/task";
import { newTask } from "@/actions/task.actions";
import Validation from "@/components/Validation";

export default function AddTask() {
    const { addTask } = useTaskStore();
    const { categories } = useCategoryStore();

    const [state, action, pending] = useActionState(newTask, undefined);

    const [taskData, setTaskData] = useState<TaskData>({
        name: '',
        description: '',
        categoryId: '',
        dueDate: undefined,
        status: 'pending',
        isImportant: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, setTaskData);

    useEffect(() => {
        if (state?.id) {
            addTask(state);
            setTaskData({
                name: '',
                description: '',
                categoryId: '',
                dueDate: undefined,
                status: 'pending',
                isImportant: false
            });
        }
    }, [state]);

    return (
        <div className="flex flex-col flex-1 w-full overflow-hidden">
            <form action={action} className="flex flex-1 flex-col gap-2 overflow-hidden">
                <div className="flex flex-1 flex-col gap-2 p-8 overflow-auto">
                    <Input
                        id="name"
                        value={taskData.name}
                        onChange={handleChange}
                        name="name"
                        type="text"
                        label="Name"
                        icon={<ListTask />}
                    />
                    <Validation error={state?.errors?.name} />
                    <Input
                        id="description"
                        value={taskData.description}
                        onChange={handleChange}
                        name="description"
                        type="textarea"
                        label="Description"
                        icon={<TextParagraph />}
                    />
                    <Validation error={state?.errors?.description} />
                    <Input
                        id="dueDate"
                        value={taskData.dueDate}
                        onChange={handleChange}
                        name="dueDate"
                        type="datetime-local"
                        label="Due date"
                        icon={<TextParagraph />}
                    />
                    <Validation error={state?.errors?.dueDate} />
                    <OptionSelector
                        id="categoryId"
                        value={taskData.categoryId}
                        onChange={handleChange}
                        name="categoryId"
                        label="Category"
                        icon={<Collection />}
                        options={categories.map((category) => ({
                            label: category.name,
                            value: category.id,
                            children: <CollectionFill size={24} style={{ color: category.color }} />
                        }))}
                    />
                    <Validation error={state?.errors?.categoryId} />
                    <Input
                        id="status"
                        value={taskData.status}
                        onChange={handleChange}
                        name="status"
                        type="select"
                        label="Status"
                        icon={<CheckCircle />}
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </Input>
                    <Validation error={state?.errors?.status} />
                    <Input
                        id="isImportant"
                        value={taskData.isImportant}
                        onChange={handleChange}
                        name="isImportant"
                        type="checkbox"
                        label="Is important?"
                        icon={<ExclamationDiamond />}
                    />
                    <Validation error={state?.errors?.isImportant} />
                </div>
                <div className="flex justify-end p-4">
                    <Button
                        type="submit"
                        disabled={pending}
                    >
                        {pending ? <Spinner size={24} /> : "Add Task"}
                    </Button>
                </div>
            </form>
        </div>
    );
}