import React, { Component } from "react";

import "./task-list.css";

import Task from "../Task";

export default class TaskList extends Component {

  constructor() {
    super();

    this.state = {
        completedTasks: new Set(),
    }
  }

  toggleTaskCompletion = (id) => {
    this.setState((prevState) => {
      const completedTasks = new Set(prevState.completedTasks);
      if (completedTasks.has(id)) {
          completedTasks.delete(id); 
      } else {
          completedTasks.add(id);
      }
      return {
        completedTasks
      };
    });
  };

  render() {

    const todoList = this.props.todoList;

    const elements = todoList.map((item) => {
    
      const {id, ...itemProps } = item;
      const isCompleted = this.state.completedTasks.has(id);

      return (
        <li key={id} className={isCompleted ? "completed" : ""}>  
            <Task {...itemProps} onToggle={() => this.toggleTaskCompletion(id)} />
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
