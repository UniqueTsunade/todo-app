import React from "react";

import "./main.css";

import TaskList from "../TaskList/TaskList";
import Footer from "../Footer";

const Main = ({
  todoList,
  toggleTaskCompletion,
  removeTaskById,
  selected,
  updateSelected,
  clearCompleted,
  itemsTodo,
  changeCreatedTask,
  turnOnTimer,
  pauseTimer,
}) => {
  return (
    <section className="main">
      <TaskList
        todoList={todoList}
        toggleTaskCompletion={toggleTaskCompletion}
        removeTaskById={removeTaskById}
        changeCreatedTask={changeCreatedTask}
        turnOnTimer={turnOnTimer}
        pauseTimer={pauseTimer}
      />
      <Footer
        itemsTodo={itemsTodo}
        selected={selected}
        updateSelected={updateSelected}
        clearCompleted={clearCompleted}
      />
    </section>
  );
};

export default Main;