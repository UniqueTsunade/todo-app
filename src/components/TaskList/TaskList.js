import React, { Component } from "react";
import PropTypes from 'prop-types';

import "./task-list.css";

import Task from "../Task";


export default class TaskList extends Component {

  static propTypes = {
    todoList: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      completed: PropTypes.bool,
      id: PropTypes.number,
      time: PropTypes.instanceOf(Date)
    })),
    toggleTaskCompletion: PropTypes.func.isRequired,
    removeTaskById: PropTypes.func.isRequired, 
    changeCreatedTask: PropTypes.func.isRequired,
  }

  state = {
    editing: [],
  };

  //Ability to work with only one input to edit a task
  editOneTask = (id) => {
    this.setState({ editing: [id] }); 
  }

  //Reset the editing state when the input field loses focus
  handleBlur = () => {
    this.setState({ editing: [] }); 
  };

  //Sending the received data for the task of changing the text
  changeTaskAfterSubmitting = (id, label) => {
    this.props.changeCreatedTask(id, label);
    this.setState({ editing: [] });
  };

  render() {
    const {todoList, toggleTaskCompletion, removeTaskById, turnOnTimer, pauseTimer } = this.props;

    const tasks = todoList.map((item) => {
      const {id, ...itemProps } = item;
      const isCompleted = item.completed;
      const isTimerEnd = item.timerEnd;
      
      const isEditing = this.state.editing.includes(id);

      return (
          <li key={ id } className={ `${isCompleted ? "completed" : ""} ${isEditing ? "editing" : ""}` }>
            <Task { ...itemProps } 
            id={id}
            isEditing={ isEditing } 
            isTimerEnd={ isTimerEnd }
            onToggle={ () => toggleTaskCompletion(id) } 
            onDelete={ () => removeTaskById(id) }
            editOneTask={ this.editOneTask }
            handleBlur={ this.handleBlur }
            changeTaskAfterSubmitting={ this.changeTaskAfterSubmitting }
            turnOnTimer={(timerMinutes, timerSeconds) => turnOnTimer(id, timerMinutes, timerSeconds) }
            pauseTimer={() => pauseTimer(id)} />
        </li>
          )
      })

    return (
        <ul className="task-list">
          { tasks }
        </ul>
    )
  }
}



