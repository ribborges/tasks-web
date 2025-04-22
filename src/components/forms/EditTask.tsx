'use client';

import { useActionState, useEffect, useState } from "react";
import { CheckCircle, Collection, CollectionFill, ExclamationDiamond, ListTask, TextParagraph } from "react-bootstrap-icons";

import { Button, Input, OptionSelector } from "@/components/Input";
import { TaskSchema } from "@/types/task";
import { Spinner } from "@/components/Loading";
import { useCategoryStore, useTaskStore } from "@/lib/store";
import { handleInputChange } from "@/utils/handleInputChange";
import { TaskData } from "@/interfaces/task";
import { editTask } from "@/actions/task.actions";
import Validation from "@/components/Validation";

interface EditTaskModalProps {
    task: TaskSchema;
}

export default function EditTask(props: EditTaskModalProps) {
    const { categories } = useCategoryStore();
    const { updateTask } = useTaskStore();

    const [state, action, pending] = useActionState(editTask, undefined);

    const [taskData, setTaskData] = useState<TaskData>({
        categoryId: props.task.categoryId,
        name: props.task.name,
        description: props.task.description,
        dueDate: props.task.dueDate ? props.task.dueDate : '',
        status: props.task.status,
        isImportant: props.task.isImportant
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, setTaskData);

    useEffect(() => {
        if (state === true) {
            updateTask(props.task.id, {
                ...props.task,
                categoryId: taskData.categoryId ? taskData.categoryId : props.task.categoryId,
                name: taskData.name ? taskData.name : props.task.name,
                description: taskData.description ? taskData.description : props.task.description,
                dueDate: taskData.dueDate ? taskData.dueDate : props.task.dueDate,
                status: taskData.status ? taskData.status : props.task.status,
                isImportant: taskData.isImportant ? taskData.isImportant : props.task.isImportant
            });
            setTaskData({
                categoryId: state.categoryId,
                name: state.name,
                description: state.description,
                dueDate: state.dueDate ? state.dueDate : '',
                status: state.status,
                isImportant: state.isImportant
            });
        }
    }, [state]);

    return (
        <div className="flex flex-col flex-1 w-full overflow-hidden">
            <form action={action} className="flex flex-1 flex-col gap-2 overflow-hidden">
                <div className="flex flex-1 flex-col gap-2 px-4 pt-4 overflow-auto">
                    <input type="hidden" name="taskId" value={props.task.id} />
                    <Input
                        id="name"
                        value={taskData?.name}
                        onChange={handleChange}
                        type="text"
                        name="name"
                        label="Name"
                        icon={<ListTask />}
                    />
                    <Validation error={state?.errors?.name} />
                    <Input
                        id="description"
                        value={taskData?.description}
                        onChange={handleChange}
                        type="textarea"
                        name="description"
                        label="Description"
                        icon={<TextParagraph />}
                    />
                    <Validation error={state?.errors?.description} />
                    <Input
                        id="dueDate"
                        value={taskData?.dueDate}
                        onChange={handleChange}
                        type="datetime-local"
                        name="dueDate"
                        label="Due date"
                        icon={<TextParagraph />}
                    />
                    <Validation error={state?.errors?.dueDate} />
                    <OptionSelector
                        id="categoryId"
                        value={taskData?.categoryId}
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
                        value={taskData?.status}
                        onChange={handleChange}
                        type="select"
                        name="status"
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
                        value={taskData?.isImportant}
                        onChange={handleChange}
                        type="checkbox"
                        name="isImportant"
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
                        {pending ? <Spinner size={24} /> : "Save Task"}
                    </Button>
                </div>
            </form>
        </div>
    );
}