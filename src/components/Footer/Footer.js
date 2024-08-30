import React from "react";

import "./footer.css";

import TasksFilter from "../TasksFilter";

const Footer = ({ selected, updateSelected }) => {
    return (
        <footer className="footer">
            <span className="todo-count">1 items left</span>
            <TasksFilter 
                         selected={selected}
                         updateSelected={updateSelected} />
            <button className="clear-completed">Clear completed</button>
        </footer>
    )
}

export default Footer;