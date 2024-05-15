import styled from "styled-components";

import { color, font, fx, radius } from "../../styles/theme";

const StyledEditTaskModalTitle = styled.h2`
    font-size: ${font.size.h2};
    margin-bottom: 10px;
`;

const StyledEditTaskModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledEditTaskModalBody = styled.div`
    background-color: ${color.dark};
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    width: 300px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const StyledInput = styled.input`
    margin: 5px;
    padding: 5px;
    border-radius: ${radius.small};
    border: 1px solid ${color.grey};
    outline: none;
    flex: 1;
    transition: ${fx.transition};
    
    &:focus {
        border-color: ${color.accent_primary};
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
`;

const ErrorMessage = styled.p<{ success: boolean }>`
    color: ${props => props.success ? color.green : color.red};
`;

export { StyledEditTaskModalTitle, StyledEditTaskModal, StyledEditTaskModalBody, StyledInput, ButtonsContainer, ErrorMessage };