'use client';

import { useState } from "react";
import { CheckCircle, CheckLg, Collection, CollectionFill, ExclamationDiamond, ListTask, TextParagraph } from "react-bootstrap-icons";

import { Button, Input, OptionSelector } from "@/components/Input";
import { TaskSchema } from "@/types/task";
import { Loading } from "@/components/Loading";
import { useCategoryStore, useTaskStore, useUserStore } from "@/lib/store";
import { handleInputChange } from "@/utils/handleInputChange";
import { UpdateTask } from "@/services/task.service";
import { TaskData } from "@/interfaces/task";
import useModal from "@/hooks/useModal";

interface EditTaskModalProps {
    task: TaskSchema;
}

export default function EditTask(props: EditTaskModalProps) {
    const { user } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const [taskData, setTaskData] = useState<TaskData>({
        categoryId: props.task.categoryId,
        name: props.task.name,
        description: props.task.description,
        dueDate: props.task.dueDate ? props.task.dueDate : '',
        status: props.task.status,
        isImportant: props.task.isImportant
    });

    const { categories } = useCategoryStore();
    const { updateTask } = useTaskStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, setTaskData);

    const { hide } = useModal();

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);

        if (user?.id) {
            await UpdateTask(props.task.id, {
                categoryId: taskData.categoryId === props.task.categoryId ? undefined : taskData.categoryId,
                name: taskData.name === props.task.name ? undefined : taskData.name,
                description: taskData.description === props.task.description ? undefined : taskData.description,
                dueDate: taskData.dueDate === props.task.dueDate ? undefined : taskData.dueDate,
                status: taskData.status === props.task.status ? undefined : taskData.status,
                isImportant: taskData.isImportant === props.task.isImportant ? undefined : taskData.isImportant
            })
                .then((res) => {
                    if (!res) {
                        console.error('Error updating task: no response');
                        return;
                    }

                    if (res?.status !== 200) {
                        console.error(`${res.status}: ${res.data}`);
                        return;
                    }

                    updateTask(props.task.id, {
                        ...props.task,
                        categoryId: taskData.categoryId ? taskData.categoryId : props.task.categoryId,
                        name: taskData.name ? taskData.name : props.task.name,
                        description: taskData.description ? taskData.description : props.task.description,
                        dueDate: taskData.dueDate ? taskData.dueDate : props.task.dueDate,
                        status: taskData.status ? taskData.status : props.task.status,
                        isImportant: taskData.isImportant ? taskData.isImportant : props.task.isImportant
                    });
                    setIsLoading(false);
                    hide();
                })
                .catch((error) => {
                    console.error('There has been a problem with your fetch operation: ', error);
                });
        }

        setIsLoading(false);
    }

    return (
        <>
            {isLoading ? <div className="absolute z-[2]"><Loading /></div> : <></>}
            <div className="flex flex-col flex-1 w-full overflow-hidden">
                <form className="flex flex-1 flex-col gap-2 overflow-hidden">
                    <div className="flex flex-1 flex-col gap-2 px-4 pt-4 overflow-auto">
                        <Input
                            id="name"
                            value={taskData?.name}
                            onChange={handleChange}
                            type="text"
                            name="name"
                            label="Name"
                            icon={<ListTask />}
                        />
                        <Input
                            id="description"
                            value={taskData?.description}
                            onChange={handleChange}
                            type="textarea"
                            name="description"
                            label="Description"
                            icon={<TextParagraph />}
                        />
                        <Input
                            id="dueDate"
                            value={taskData?.dueDate}
                            onChange={handleChange}
                            type="datetime-local"
                            name="dueDate"
                            label="Due date"
                            icon={<TextParagraph />}
                        />
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
                        <Input
                            id="isImportant"
                            value={taskData?.isImportant}
                            onChange={handleChange}
                            type="checkbox"
                            name="isImportant"
                            label="Is important?"
                            icon={<ExclamationDiamond />}
                        />
                    </div>
                    <div className="flex justify-end p-4">
                        <Button disabled={
                            taskData.name === props.task.name &&
                            taskData.description === props.task.description &&
                            taskData.dueDate === props.task.dueDate &&
                            taskData.categoryId === props.task.categoryId &&
                            taskData.status === props.task.status &&
                            taskData.isImportant === props.task.isImportant
                        } type="button" onClick={handleSubmit}>
                            <CheckLg />
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}