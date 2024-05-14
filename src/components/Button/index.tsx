import { StyledButton } from "./style";

interface ButtonProps {
    children: React.ReactNode;
}

export default function Button(props: ButtonProps) {
    return (
        <StyledButton>{ props.children }</StyledButton>
    );
}