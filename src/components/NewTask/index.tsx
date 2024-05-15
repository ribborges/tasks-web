import { useState } from "react";
import { PlusCircle } from "react-bootstrap-icons";

import Button from "../Button";

import { CreateTaskCard, ErrorMessage, StyledInput, StyledNewTask } from "./style";
import { baseURL } from "../../api/url";

interface NewTaskProps {
    new: (task: { id: string, name: string, isCompleted: boolean }) => void;
}

export default function NewTask(props: NewTaskProps) {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ success: boolean, message: string }>({success: false, message: ''});

    const createTask = async () => {
        setLoading(true);
        setMessage({success: false, message: ''});

        if (!name) {
            setMessage({success: false, message: 'Task name is required'});
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${baseURL}tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name
                }),
            });

            if (response.ok) {
                const data: { message: string, id: string } = await response.json();
                if (data.id) {
                    setName('');
                    props.new({ id: data.id, name, isCompleted: false });
                    setMessage({success: true, message: data.message});
                } else {
                    setMessage({success: false, message: data.message || 'An error occurred while creating the task'});
                }
            } else {
                setMessage({success: false, message: 'An error occurred while creating the task'});
            }
        } catch (error) {
            setMessage({success: false, message: 'An error occurred while creating the task'});
        } finally {
            setLoading(false);
        }
    };

    return (
        <StyledNewTask>
            <CreateTaskCard>
                <StyledInput
                    type="text"
                    id="title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button onClick={createTask} disabled={loading}>
                    {loading ? 'Creating Task...' : <PlusCircle />}
                </Button>
            </CreateTaskCard>
            {message && <ErrorMessage success={message.success}>{message.message}</ErrorMessage>}
        </StyledNewTask>
    );
}