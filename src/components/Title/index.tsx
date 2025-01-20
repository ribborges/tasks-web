'use client';

import { StyledLogo, StyledTitle, StyledTitleContainer } from "./styles";

export default function Title() {
    return (
        <StyledTitleContainer>
            <StyledLogo src="/icon.png" alt="Logo" />
            <StyledTitle>Tasks!</StyledTitle>
        </StyledTitleContainer>
    );
}