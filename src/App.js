import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TaskManager from "./components/TaskManager";
import { useDispatch, useSelector } from "react-redux";
import { getCompletedTasks, getInProcessTasks } from "./Redux/Slices/taskManagerSlice";

function App() {
  const {inProcessTasks,completedTasks} = useSelector((state)=>state.taskManager);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompletedTasks())
    dispatch(getInProcessTasks());
  }, []);

  return (
    <Container>
      <Header>
        <h1>TODO</h1>
      </Header>
      <Body>
        <TaskManager
          type='InProcess Task'
          tasks={inProcessTasks}
          
        />
        <TaskManager
          type='Completed Task'
          tasks={completedTasks}
        />
      </Body>
    </Container>
  );
}

export default App;

const Container = styled.div`
  padding: 10px;
`;
const Header = styled.div`
text-align: center;
`;
const Body = styled.div`
  display: flex;
  gap: 10px;
  height: calc(100vh - 15vh);
  
  @media (max-width: 760px) {
    height:auto;
    /* overflow: hidden; */
   flex-direction: column;
  }
`;

