import { StyledLogo, StyledTitle, StyledTitleContainer } from "./styles";

export default function Title() {
    return (
        <StyledTitleContainer>
            <StyledLogo src="icon.svg" alt="" />
            <StyledTitle>Tasks!</StyledTitle>
        </StyledTitleContainer>
    );
}