import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

const Task = ({ task }) => {
  const { completeTask, deleteTask } = useContext(GlobalContext);
  const [divClass, setdivClass] = useState(task.isCompleted);

  const changeClass = () => {
    setdivClass(!divClass);
    completeTask(task._id);
  };
  return (
    <div className={divClass ? "todo text-line" : "todo"}>
      <li className="todo-item">{task.name}</li>
      <button className="complete-btn" onClick={changeClass}>
        <i className="fas fa-check"></i>
      </button>
      <button className="trash-btn" onClick={() => deleteTask(task._id)}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Task;
