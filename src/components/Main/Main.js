import React from "react";

import "./main.css";

import TaskList from "../TaskList/TaskList";
import Footer from "../Footer";

const Main = ( { todoList, toggleTaskCompletion, removeTaskById } ) => {
    return (
        <section className="main"> 
            <TaskList todoList={todoList} 
            toggleTaskCompletion={toggleTaskCompletion}
            removeTaskById={removeTaskById} />
            <Footer />
        </section>
    )
}

export default Main;