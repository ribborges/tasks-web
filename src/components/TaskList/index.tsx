import { StyledTaskList } from "./style";

interface TaskListProps {
    children: React.ReactNode;
}

export default function TaskList(props: TaskListProps) {
    return (
        <StyledTaskList>
            {props.children}
        </StyledTaskList>
    );
}