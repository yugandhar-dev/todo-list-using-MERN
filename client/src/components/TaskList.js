import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import Task from "./Task";

const TaskList = () => {
  let { tasks, option } = useContext(GlobalContext);

  if (option === "completed")
    tasks = tasks.filter((task) => task.isCompleted === true);
  else if (option === "uncompleted")
    tasks = tasks.filter((task) => task.isCompleted === false);

  return (
    <div className="todo-container">
      <ul className="todo-list">
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
