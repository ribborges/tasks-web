import { useState } from "react";
import { CheckLg, X } from "react-bootstrap-icons";

import Button from "../Button";

import { ButtonsContainer, StyledEditTaskModal, StyledEditTaskModalBody, StyledEditTaskModalTitle, StyledInput } from "./style";
import { baseURL } from "../../api/url";

interface EditTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: { id: string, name: string, isCompleted: boolean };
    onTaskUpdated: (task: { id: string, name: string, isCompleted: boolean }) => void;
}

export default function EditTaskModal(props: EditTaskModalProps) {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const updateTask = async () => {
        setLoading(true);
        
        if (!name) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${baseURL}tasks/${props.task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name
                }),
            });

            if (response.ok) {
                props.onTaskUpdated({ id: props.task.id, name, isCompleted: props.task.isCompleted });
                props.onClose();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <StyledEditTaskModal>
            <StyledEditTaskModalBody>
                <StyledEditTaskModalTitle>Edit task</StyledEditTaskModalTitle>
                <StyledInput
                    type="text"
                    id="title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <ButtonsContainer>
                    <Button onClick={updateTask} disabled={loading}>
                        {loading ? 'Updating Task...' : <CheckLg />}
                    </Button>
                    <Button onClick={props.onClose} disabled={loading}>
                        <X />
                    </Button>
                </ButtonsContainer>
            </StyledEditTaskModalBody>
        </StyledEditTaskModal>
    );
}