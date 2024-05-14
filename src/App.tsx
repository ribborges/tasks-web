import styled from "styled-components";
import { color, font } from "./styles/theme";

export default function App() {
  return (
    <AppContainer>
      <h1>Hello, World!</h1>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  color: ${color.light};
  font-family: ${font.family};
  display: flex;
  height: 100%;
  width: 100%;
  background-color: ${color.dark};
`;