import { Button, Input } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  closeCreationDrawer,
  editInProcessTask,
  setInProcessTasks,
} from "../Redux/Slices/taskManagerSlice";

const TaskCreation = () => {
  const dispatch = useDispatch();
  const { taskModel, creationDrawerType } = useSelector(
    (state) => state.taskManager
  );
  const [titleError, setTitleError] = useState("");
  const [newTask, setNewTask] = useState({
    id: 0,
    title: "",
    description: "",
  });

  useEffect(() => {
    setNewTask(taskModel);
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.title.length === 0) setTitleError("Title is required");
    else if (creationDrawerType === "CREATION") {
      const addNewTask = { ...newTask, id: Math.floor(Math.random() * 1000) };
      dispatch(setInProcessTasks(addNewTask));
      dispatch(closeCreationDrawer());
    } else if (creationDrawerType === "EDIT") {
      dispatch(editInProcessTask(newTask));
      dispatch(closeCreationDrawer());
    }
  };

  return (
    <DrawerHeader>
      <Input.Wrapper
        error={titleError}
        withAsterisk
        label='Title'
      >
        <Input
          placeholder='Task Title'
          name='title'
          value={newTask.title}
          onChange={handleOnChange}
        />
      </Input.Wrapper>
      <TextArea
        placeholder='Description'
        name='description'
        value={newTask.description}
        onChange={handleOnChange}
      />
      <Button onClick={handleSubmit}>
        {creationDrawerType === "CREATION" ? "Add Task" : "Edit Task"}
      </Button>
    </DrawerHeader>
  );
};

export default TaskCreation;

const DrawerHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: calc(100vh - 20vh);
  flex-grow: 1;
`;

const TextArea = styled.textarea`
  flex-grow: 1;
  resize: none;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;

  font-size: 14px;
  height: 100%;
  &:focus {
    outline: 1px solid #228be6;
  }
`;
