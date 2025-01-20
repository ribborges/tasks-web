'use client';

import styled from "styled-components";

import { color, fx, radius } from "../../styles/theme";

const StyledButton = styled.button`
  background-color: ${color.accent_primary};
  color: ${color.light};

  display: flex;
  justify-content: space-between;
  align-items: center;

  border: none;
  border-radius: ${radius.medium};
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  cursor: pointer;
  transition: ${fx.transition};

  &:hover {
    background-color: ${color.accent_secondary};
  }
`;

export { StyledButton };