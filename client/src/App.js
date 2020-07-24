import React from "react";
import "./App.css";
import Header from "./components/Header";
import Form from "./components/Form";
import TaskList from "./components/TaskList";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Header />
        <Form />
        <TaskList />
      </div>
    </GlobalProvider>
  );
}

export default App;
