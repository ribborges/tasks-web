import { useState } from "react";
import { CheckLg, PenFill, TrashFill } from "react-bootstrap-icons";

import Button from "../Button";

import { StyledTaskCard, StyledTaskData, StyledTaskName, StyledTaskOptions } from "./styles";
import { Task } from "../../types/task";
import EditTaskModal from "../EditTaskModal";
import { CompleteTask, RemoveTask } from "../../api/api";

interface TaskCardProps {
    onTaskUpdated(updatedTask: { id: string; name: string; isCompleted: boolean; }): unknown;
    taskData: Task;
    removed: (id: string) => void;
    setIsCompleted: (id: string) => void;
}

export default function TaskCard(props: TaskCardProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const completeTask = () => {
        CompleteTask(props.taskData.id)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                props.taskData.isCompleted = true;
                props.setIsCompleted(props.taskData.id);
            })
            .catch(error => console.error('There has been a problem with your fetch operation: ', error));
    };

    const editTask = () => {
        // Open a modal to edit the task
        setIsEditModalOpen(true);
    };

    const deleteTask = () => {
        RemoveTask(props.taskData.id)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                props.removed(props.taskData.id);
            })
            .catch(error => console.error('There has been a problem with your fetch operation: ', error));

        props.removed(props.taskData.id);
    };

    return (
        <>
            {isEditModalOpen && (
                <EditTaskModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    task={props.taskData}
                    onTaskUpdated={updatedTask => {
                        // Update the task in your state
                        // This will depend on how your state is structured
                        props.onTaskUpdated(updatedTask);
                        setIsEditModalOpen(false);
                    }}
                />
            )}
            <StyledTaskCard>
                <StyledTaskData>
                    <StyledTaskName isCompleted={props.taskData.isCompleted}>{props.taskData.name}</StyledTaskName>
                </StyledTaskData>
                <StyledTaskOptions>
                    {
                        !props.taskData.isCompleted ?
                            <Button onClick={completeTask}>
                                <CheckLg />
                            </Button>
                            :
                            <></>
                    }
                    <Button onClick={editTask}>
                        <PenFill />
                    </Button>
                    <Button onClick={deleteTask}>
                        <TrashFill />
                    </Button>
                </StyledTaskOptions>
            </StyledTaskCard>
        </>
    );
}