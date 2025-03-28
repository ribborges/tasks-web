'use client';

import { useState } from "react";
import { CheckCircle, Collection, CollectionFill, ExclamationDiamond, ListTask, TextParagraph } from "react-bootstrap-icons";

import { Loading } from "@/components/Loading";
import { Button, Input, OptionSelector } from "@/components/Input";
import { handleInputChange } from "@/utils/handleInputChange";
import { useCategoryStore, useTaskStore, useUserStore } from "@/lib/store";
import { CreateTask } from "@/services/task.service";
import { TaskData } from "@/interfaces/task";

export default function AddTask() {
    const { user } = useUserStore();
    const { addTask } = useTaskStore();
    const [isLoading, setIsLoading] = useState(false);
    const [taskData, setTaskData] = useState<TaskData>({
        name: '',
        description: '',
        categoryId: '',
        dueDate: undefined,
        status: 'pending',
        isImportant: false
    });

    const { categories } = useCategoryStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, setTaskData);

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);

        if (user?.id) {
            await CreateTask(taskData)
                .then((res) => {
                    if (!res) {
                        console.error('Error creating task: no response');
                        return;
                    }

                    if (res?.status !== 201) {
                        console.error(`${res.status}: ${res.data}`);
                        return;
                    }

                    addTask(res.data);
                    setIsLoading(false);
                    setTaskData({
                        name: '',
                        description: '',
                        dueDate: '',
                        categoryId: '',
                        status: 'pending',
                        isImportant: false
                    });
                })
                .catch((error) => {
                    console.error('There has been a problem with your fetch operation: ', error);
                });
        }

        setIsLoading(false);
    }

    return (
        <>
            {isLoading ? <div className="absolute z-2"><Loading /></div> : <></>}
            <div className="flex flex-col flex-1 w-full overflow-hidden">
                <form className="flex flex-1 flex-col gap-2 overflow-hidden">
                    <div className="flex flex-1 flex-col gap-2 p-8 overflow-auto">
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
                            !taskData.name ||
                            !taskData.categoryId ||
                            !taskData.status
                        } type="button" onClick={handleSubmit}>
                            Add Task
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}