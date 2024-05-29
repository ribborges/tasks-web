import { useEffect, useState } from "react";
import styled from "styled-components";

import { color, font, fx, radius } from "./styles/theme";
import TaskCard from "./components/TaskCard";
import Title from "./components/Title";
import TaskList from "./components/TaskList";
import NewTask from "./components/NewTask";
import { Task } from "./types/task";
import { GetTasks } from "./api/api";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    GetTasks().then((response) => response.json()).then((data) => {
      setTasks(data);
    });
  }, []);

  const addTask = (task: Task) => {
    setTasks([task, ...tasks]);
  }

  const setIsCompleted = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        task.isCompleted = true;
      }
      return task;
    }));
  }

  const updateTask = (task: Task) => {
    setTasks(tasks.map(t => {
      if (t.id === task.id) {
        return task;
      }
      return t;
    }));
  }

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <AppContainer>
      <AppBody>
        <Title />
        <TaskList>
          <NewTask new={addTask} />
          {
            tasks.map((task) => {
              return (
                <TaskCard key={task.id} taskData={task} removed={removeTask} setIsCompleted={setIsCompleted} onTaskUpdated={updateTask} />
              );
            })
          }
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