import React from "react";

import "./main.css";

import TaskList from "../TaskList/TaskList";
import Footer from "../Footer";

const Main = ( { todoList, removeTaskById } ) => {
    return (
        <section className="main"> 
            <TaskList todoList={todoList} removeTaskById={(id) => removeTaskById(id)} />
            <Footer />
        </section>
    )
}

export default Main;