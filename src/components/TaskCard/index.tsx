import { PenFill, TrashFill } from "react-bootstrap-icons";

import Button from "../Button";

import { StyledTaskCard, StyledTaskData, StyledTaskName, StyledTaskOptions } from "./styles";

interface TaskCardProps {
    taskName: string;
    isCompleted?: boolean;
}

export default function TaskCard(props: TaskCardProps) {
    return (
        <StyledTaskCard>
            <StyledTaskData>
                <StyledTaskName>{props.taskName}</StyledTaskName>
            </StyledTaskData>
            <StyledTaskOptions>
                <Button>
                    <TrashFill />
                </Button>
                <Button>
                    <PenFill />
                </Button>
            </StyledTaskOptions>
        </StyledTaskCard>
    );
}