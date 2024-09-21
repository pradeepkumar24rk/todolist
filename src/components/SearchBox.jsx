import { Input } from "@mantine/core";
import React, { useState } from "react";
import styled from "styled-components";
import { searchCompletedTask, searchInProcessTask } from "../Redux/Slices/taskManagerSlice";
import { useDispatch } from "react-redux";

const SearchBox = ({ type }) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (type === "InProcess Task") {
      dispatch(searchInProcessTask(search));
    } else dispatch(searchCompletedTask(search));
  };
  
  return (
    <Container onSubmit={submitHandler}>
      <Input
        placeholder='Search task'
        type='search'
        onChange={handleChange}
      />
    </Container>
  );
};

export default SearchBox;

const Container = styled.form``;
