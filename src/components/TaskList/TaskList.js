import React, { Component } from "react";

import "./task-list.css";

import Task from "../Task";


export default class TaskList extends Component {



  render() {
    const {todoList, toggleTaskCompletion, removeTaskById } = this.props;

    const elements = todoList.map((item) => {
      const {id, ...itemProps } = item;
      const isCompleted = item.completed;

      return (
        <li key={id} className={isCompleted ? "completed" : ""}>
            <Task {...itemProps} 
            onToggle={() => toggleTaskCompletion(id)} 
            onDelete={() => removeTaskById(id)} />
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
}
