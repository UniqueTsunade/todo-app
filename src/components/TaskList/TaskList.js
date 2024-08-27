import React from "react";

import "./task-list.css";

import Task from "../Task";

const TaskList = ( { todoList } ) => {

  const elements = todoList.map((item) => {
    const {id, ...itemProps } = item;

    return (
      <li key={id}>  
        <Task {...itemProps} />
        <input type="text" className="edit" defaultValue="Editing task"></input>
      </li>
    )
  })


    return (
        <ul className="task-list">
          { elements }
        </ul>
    )
}

export default TaskList; 