import styled from "styled-components";
import { PlusCircle } from "react-bootstrap-icons";

import { color, font, fx, radius } from "./styles/theme";
import TaskCard from "./components/TaskCard";
import Title from "./components/Title";
import Button from "./components/Button";
import TaskList from "./components/TaskList";

export default function App() {
  return (
    <AppContainer>
      <AppBody>
        <Title />
        <Button>
          <PlusCircle />
        </Button>
        <TaskList>
          <TaskCard taskName="Buy milk" />
          <TaskCard taskName="Do home work" />
          <TaskCard taskName="Call Gabriel" />
          <TaskCard taskName="Buy Chang birthday present" />
        </TaskList>
      </AppBody>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  color: ${color.light};
  background-color: ${color.dark};

  font-family: ${font.family};

  display: flex;
  height: 100%;
  width: 100%;
`;

const AppBody = styled.main`
  background-color: ${color.dark_grey};
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin: 5vh 20vw;
  padding: 1rem;

  border-style: solid;
  border-width: 1px;
  border-color: ${color.grey};
  border-radius: ${radius.large};

  transition: ${fx.transition};

  @media screen and (max-width: 1500px){
    margin: 5vh 15vw;
  }

  @media screen and (max-width: 1000px){
    margin: 0 0;
    border-radius: 0;
  }
`;