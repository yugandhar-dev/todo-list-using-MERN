import React, { useReducer, createContext } from "react";
import { TaskReducer } from "./TaskReducer";
import axios from "axios";

// Initial State
const initialState = {
  tasks: [],
  option: "all",
  error: null,
};

// GlobalContext
export const GlobalContext = createContext(initialState);

// GlobalContext Provider component
export const GlobalProvider = ({ children }) => {
  // ACTIONS

  const addTask = async (task) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/v1/tasks", task, config);

      dispatch({
        type: "ADD_TASK",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "TASK_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      dispatch({
        type: "DELETE_TASK",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "TASK_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const completeTask = async (id) => {
    try {
      const task = await axios.patch(`/api/v1/tasks/${id}`);
      dispatch({
        type: "COMPLETE_TASK",
        payload: task,
      });
    } catch (error) {
      dispatch({
        type: "TASK_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const getTasks = async (option) => {
    try {
      const res = await axios.get("/api/v1/tasks");

      dispatch({
        type: "GET_TASKS",
        payload: res.data.data,
        option: option,
      });
    } catch (error) {
      dispatch({
        type: "TASK_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const [state, dispatch] = useReducer(TaskReducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        tasks: state.tasks,
        addTask,
        deleteTask,
        completeTask,
        getTasks,
        option: state.option,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
