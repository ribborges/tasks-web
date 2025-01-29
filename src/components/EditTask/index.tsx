'use client';

import { useState } from "react";
import { CheckLg, ListTask, TextParagraph } from "react-bootstrap-icons";

import { Button, Input } from "@/components/Input";
import { TaskSchema } from "@/types/task";

interface EditTaskModalProps {
    task: TaskSchema;
}

export default function EditTask(props: EditTaskModalProps) {
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="flex flex-col gap-2">
            <Input icon={<ListTask />} label="Task name:" type="text" id="title" value={name} onChange={(e: any) => setName(e.target.value)} />
            <Input icon={<TextParagraph />} label="Description:" type="textarea" id="description" value={name} onChange={(e: any) => setName(e.target.value)} />
            <Input label="Is important?" type="checkbox" id="isImportant" value={name} onChange={(e: any) => setName(e.target.value)} />
            <div className="flex">
                <Button onClick={() => { }} disabled={isLoading}>
                    {isLoading ? 'Updating Task...' : <CheckLg />}
                </Button>
            </div>
        </div>
    );
}