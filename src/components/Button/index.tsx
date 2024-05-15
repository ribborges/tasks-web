import { StyledButton } from "./style";

interface ButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}

export default function Button(props: ButtonProps) {
    return (
        <StyledButton onClick={props.onClick} disabled={props.disabled}>{ props.children }</StyledButton>
    );
}