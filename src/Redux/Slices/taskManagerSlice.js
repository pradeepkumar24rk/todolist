import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inProcessTasks: [],
  completedTasks: [],
  creationDrawer: false,
  creationDrawerType: "",
  taskModel: {
    id: 0,
    title: "",
    description: "",
  },
};

const taskManager = createSlice({
  name: "taskManager",
  initialState,
  reducers: {
    getInProcessTasks: (state) => {
      const storedInProcessTasks = JSON.parse(
        localStorage.getItem("InProcess") || "[]"
      );
      state.inProcessTasks = storedInProcessTasks;
    },
    getCompletedTasks: (state) => {
      const storedCompletedTasks = JSON.parse(
        localStorage.getItem("Completed") || "[]"
      );
      state.completedTasks = storedCompletedTasks;
    },
    setInProcessTasks: (state, action) => {
      state.inProcessTasks.unshift(action.payload);
      localStorage.setItem("InProcess", JSON.stringify(state.inProcessTasks));
    },
    setCompletedTasks: (state, action) => {
      state.completedTasks.unshift(action.payload);
      localStorage.setItem("Completed", JSON.stringify(state.completedTasks));
      const filteredInprocessTasks = state.inProcessTasks.filter((data) => {
        return action.payload.id !== data.id;
      });
      state.inProcessTasks = filteredInprocessTasks;
      localStorage.setItem("InProcess", JSON.stringify(state.inProcessTasks));
    },
    deleteInProcessTask: (state, action) => {
      const filteredInprocessTasks = state.inProcessTasks.filter((data) => {
        return action.payload.id !== data.id;
      });
      state.inProcessTasks = filteredInprocessTasks;
      localStorage.setItem("InProcess", JSON.stringify(state.inProcessTasks));
    },
    deleteCompletedTask: (state, action) => {
      const filteredCompletedTasks = state.completedTasks.filter((data) => {
        return action.payload.id !== data.id;
      });
      state.completedTasks = filteredCompletedTasks;
      localStorage.setItem("Completed", JSON.stringify(state.inProcessTasks));
    },
    searchInProcessTask: (state, action) => {
      const storedInProcessTasks = JSON.parse(
        localStorage.getItem("InProcess") || "[]"
      );
      const filteredInprocessTasks = storedInProcessTasks.filter((data) => {
        return data.title.toLowerCase().includes(action.payload.toLowerCase());
      });
      state.inProcessTasks = filteredInprocessTasks;
    },
    searchCompletedTask: (state, action) => {
      const storedCompletedTasks = JSON.parse(
        localStorage.getItem("Completed") || "[]"
      );
      const filteredCompletedTasks = storedCompletedTasks.filter((data) => {
        return data.title.toLowerCase().includes(action.payload.toLowerCase());
      });
      state.completedTasks = filteredCompletedTasks;
    },
    openCreationDrawer: (state) => {
      state.creationDrawer = true;
    },
    closeCreationDrawer: (state) => {
      state.creationDrawer = false;
    },
    setCreationDrawerType: (state, action) => {
      state.creationDrawerType = action.payload;
    },
    setTaskModelData: (state, action) => {
      state.taskModel = action.payload;
    },
    resetTastModelData: (state) => {
      state.taskModel.id = 0;
      state.taskModel.title = "";
      state.taskModel.description = "";
    },
    editInProcessTask: (state, action) => {
      const dataIndex = state.inProcessTasks.findIndex(
        (data) => data.id === action.payload.id
      );
      if (dataIndex !== -1) state.inProcessTasks[dataIndex] = action.payload;
      localStorage.setItem("InProcess", JSON.stringify(state.inProcessTasks));
    },
    undoTask: (state, action) => {
      state.inProcessTasks.unshift(action.payload);
      localStorage.setItem("InProcess", JSON.stringify(state.inProcessTasks));
      const filterCompletedTask = state.completedTasks.filter((data) => {
        return data.id !== action.payload.id;
      });
      state.completedTasks = filterCompletedTask;
      localStorage.setItem("Completed", JSON.stringify(state.completedTasks));
    },
  },
});

export default taskManager.reducer;
export const {
  getInProcessTasks,
  getCompletedTasks,
  setCompletedTasks,
  setInProcessTasks,
  deleteCompletedTask,
  deleteInProcessTask,
  searchInProcessTask,
  searchCompletedTask,
  openCreationDrawer,
  closeCreationDrawer,
  setCreationDrawerType,
  setTaskModelData,
  resetTastModelData,
  editInProcessTask,
  undoTask,
} = taskManager.actions;
