import React from "react";

import "./main.css";

import TaskList from "../TaskList/TaskList";
import Footer from "../Footer";

const Main = ( { todos } ) => {
    return (
        <section className="main"> 
            <TaskList todoList={todos} />
            <Footer />
        </section>
    )
}

export default Main;