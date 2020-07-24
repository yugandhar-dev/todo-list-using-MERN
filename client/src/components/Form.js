import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";

const Form = () => {
  const [input, setInput] = useState("");

  const { addTask, getTasks } = useContext(GlobalContext);

  const addCurrentTask = (e) => {
    e.preventDefault();
    addTask({
      id: Math.floor(Math.random(1) * 100000),
      name: input,
      isCompleted: false,
    });
    setInput("");
  };

  useEffect(() => {
    getTasks("all");
  }, []);

  return (
    <form onSubmit={addCurrentTask}>
      <input
        type="text"
        className="todo-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="todo-button">
        <i className="far fa-plus-square"></i>
      </button>

      <div className="select">
        <select
          name="todos"
          className="todo-select"
          onClick={(e) => getTasks(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
};

export default Form;
