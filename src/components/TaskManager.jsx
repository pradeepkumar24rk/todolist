import { Button, Drawer, Input, Textarea } from "@mantine/core";
import React, { useState } from "react";
import styled from "styled-components";
import SearchBox from "./SearchBox";
import TaskCard from "./TaskCard";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCreationDrawer,
  openCreationDrawer,
  resetTastModelData,
  setCreationDrawerType,
  setInProcessTasks,
} from "../Redux/Slices/taskManagerSlice";
import TaskCreation from "./TaskCreation";

const TaskManager = ({ type, tasks }) => {
  const { creationDrawer,creationDrawerType } = useSelector((state) => state.taskManager);
  const dispatch = useDispatch();

  const openDrawer = () => {
    dispatch(openCreationDrawer());
    dispatch(setCreationDrawerType("CREATION"));
    dispatch(resetTastModelData())
  };

  const closeDrawer = () => {
    dispatch(closeCreationDrawer());
  };

  return (
    <>
      <Drawer
        opened={creationDrawer}
        onClose={closeDrawer}
        title={creationDrawerType === "CREATION"? 'New Task':'Edit Task'}
        padding='xl'
        size='md'
        position='right'
      >
        <TaskCreation/>
      </Drawer>

      <Container>
        <Header>
          <h3>{type}</h3>
          <Right>
            <SearchBox type={type} />
            {type === "InProcess Task" && (
              <Button onClick={openDrawer}>New Task</Button>
            )}
          </Right>
        </Header>
        <Body>
          {tasks.map((data, index) => {
            return (
              <TaskCard
                type={type}
                data={data}
                key={index}
              />
            );
          })}
        </Body>
      </Container>
    </>
  );
};

export default TaskManager;

const Container = styled.div`
  box-shadow: 0px 0px 2.7px rgba(0, 0, 0, 0.022),
    0px 0px 6.9px rgba(0, 0, 0, 0.031), 0px 0px 14.2px rgba(0, 0, 0, 0.039),
    0px 0px 29.2px rgba(0, 0, 0, 0.048), 0px 0px 80px rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  flex: 1;
  padding: 1%;
  margin: 1%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  `;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Right = styled.div`
  display: flex;
  gap: 10px;
  `;
const Body = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  @media (max-width: 760px){
    height: calc(100vh - 15vh);
  }
  `;
