import styled from "styled-components";

import { font } from "../../styles/theme";

const StyledTitleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledLogo = styled.img`
    height: 50px;
    width: 50px;
`;

const StyledTitle = styled.h1`
  font-size: ${font.size.h1};
  font-weight: bold;
  margin: 1rem;
`;

export { StyledTitleContainer, StyledLogo, StyledTitle };