import styled from "styled-components";
import { color, font, fx, radius } from "./styles/theme";

export default function App() {
  return (
    <AppContainer>
      <AppBody>
        <h1>Hello, World!</h1>
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