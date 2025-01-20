'use client';

import styled from "styled-components";
import { color, fx, radius } from "../../styles/theme";

const StyledNewTask = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px;
    padding: 5px;
`;

const CreateTaskCard = styled.div`
    display: flex;
    flex-direction: row;
    margin: 5px;
    padding: 5px;
    border-radius: ${radius.small};
    border: 1px solid ${color.grey};
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

const ErrorMessage = styled.p<{ success: boolean }>`
    color: ${props => props.success ? color.green : color.red};
`;

export { StyledNewTask, CreateTaskCard, StyledInput, ErrorMessage };