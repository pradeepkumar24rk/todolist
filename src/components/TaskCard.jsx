import { Button, Drawer } from "@mantine/core";
import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineDelete } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  deleteCompletedTask,
  deleteInProcessTask,
  openCreationDrawer,
  setCompletedTasks,
  setCreationDrawerType,
  setTaskModelData,
} from "../Redux/Slices/taskManagerSlice";

const TaskCard = ({ type, data }) => {
  const dispatch = useDispatch();
  const [drawer, setDrawer] = useState(false);
  const openDrawer = () => {
    setDrawer(true);
  };

  const closeDrawer = () => {
    setDrawer(false);
  };
  
  const openEditingDrawer = () => {
    dispatch(openCreationDrawer());
    dispatch(setCreationDrawerType("EDIT"));
    dispatch(setTaskModelData(data))
  };
  
  const deleteTask = () => {
    if (type === "InProcess Task") dispatch(deleteInProcessTask(data));
    else dispatch(deleteCompletedTask(data));
  };

  const handleDone = () => {
    dispatch(setCompletedTasks(data));
  };
  
  return (
    <Container>
      <Drawer
        opened={drawer}
        onClose={closeDrawer}
        position='right'
        title="Task"
      >
        <DisplayContent>
          <h3>{data.title}</h3>
          <p>{data.description}</p>
        </DisplayContent>
      </Drawer>

      <Content>
        <Title
          type={type}
          onClick={openDrawer}
        >
          {data.title}
        </Title>
        <p>{data.description}</p>
      </Content>
      <ControlButtons>
        {type === "InProcess Task" && (<>
          <Button onClick={openEditingDrawer} >
            <AiFillEdit size={20}/>
          </Button>
          <Button onClick={handleDone}>
            <MdDone size={20} />
          </Button>
        </>
        )}
        <Button
          variant='filled'
          color='red'
          onClick={deleteTask}
        >
          <MdOutlineDelete size={20} />
        </Button>
      </ControlButtons>
    </Container>
  );
};

export default TaskCard;

const Container = styled.div`
  margin-bottom: 20px;
  min-height: 30px;
  max-height: 100px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 0px 2.7px rgba(0, 0, 0, 0.022),
    0px 0px 6.9px rgba(0, 0, 0, 0.031), 0px 0px 14.2px rgba(0, 0, 0, 0.039),
    0px 0px 29.2px rgba(0, 0, 0, 0.048);
`;

const Content = styled.div`
  p {
    height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const Title = styled.h3`
  text-decoration: ${(props) =>
    props.type === "Completed Task" ? "line-through" : "none"};
  &:hover {
    color: blue;
    cursor: pointer;
    text-decoration: underline;
  }
`;

const ControlButtons = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DisplayContent = styled.div``;
