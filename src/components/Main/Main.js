import React from "react";

import "./main.css";

import TaskList from "../TaskList/TaskList";
import Footer from "../Footer";

const Main = ({ todoList, toggleTaskCompletion, removeTaskById, selected, updateSelected, clearCompleted }) => {
    return (
        <section className="main"> 
            <TaskList todoList={todoList} 
                    toggleTaskCompletion={toggleTaskCompletion}
                    removeTaskById={removeTaskById} />
            <Footer selected={selected}
                    updateSelected={updateSelected}
                    clearCompleted={clearCompleted} />
        </section>
    )
}

export default Main;