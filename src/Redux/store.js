import { configureStore } from "@reduxjs/toolkit";
import taskManagerSlice from "./Slices/taskManagerSlice";

const store = configureStore({
    reducer:{
        taskManager: taskManagerSlice
    }
})

export default store