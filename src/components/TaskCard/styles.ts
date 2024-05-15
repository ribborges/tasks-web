import styled from "styled-components";

import { color, fx, radius } from "../../styles/theme";

const StyledTaskCard = styled.div`
  margin: 5px;
  padding: 5px;

  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${color.grey};

  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: ${fx.transition};

  &:hover {
    background-color: ${color.grey};
    border-radius: ${radius.small};
  }
`;

const StyledTaskData = styled.div`
  display: flex;
`;

const StyledTaskOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const StyledTaskName = styled.span<{ isCompleted: boolean }>`
  display: flex;
  align-items: center;

  &::before {
    content: "";
    background-color: ${props => props.isCompleted ?  color.green : color.red};
    height: 25px;
    width: 5px;
    margin-right: 15px;
    border-radius: ${radius.small};
    display: block;
  }
`;

export { StyledTaskCard, StyledTaskData, StyledTaskOptions, StyledTaskName };