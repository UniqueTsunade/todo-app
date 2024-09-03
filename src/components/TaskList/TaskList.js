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

  constructor(props) {
    super(props);

    this.state = {
        label: "",
        editing: {}
    }
}

//Update the component's state with the new label value
onLabelChange = (e) => {        
    this.setState({
        label: e.target.value
    });
};

//Update the task's label and reset the component's state
onSubmit = (id) => (e) => {
  e.preventDefault();
  this.props.changeCreatedTask(id, this.state.label);
  this.setState({
    label: "",
    editing: {}
  });
};

//Open input for changes to a specific task
onEdit = (id) => {
  if (Object.keys(this.state.editing).length === 0) {
    this.setState({
      editing: { [id]: true }
    });
  }
};


//Reset the editing state when the input field loses focus
handleBlur = (id) => {
  this.setState({ editing: {} }); 
};



  render() {
    const {todoList, toggleTaskCompletion, removeTaskById } = this.props;

    const tasks = todoList.map((item) => {
      const {id, ...itemProps } = item;
      const isCompleted = item.completed;

      const isEditing = this.state.editing[id];


      return (
          <li key={id} className={`${isCompleted ? "completed" : ""} ${isEditing ? "editing" : ""}`}>
            <Task {...itemProps} 
            onToggle={() => toggleTaskCompletion(id)} 
            onDelete={() => removeTaskById(id)}
            onEdit={() => this.onEdit(id)} />
            {isEditing && ( 
            <form className="edit-task-form" onSubmit={this.onSubmit(id)}>
              <input
                type="text"
                onChange={this.onLabelChange}
                className="edit"
                value={this.state.label}
                autoFocus 
                onBlur={() => this.handleBlur(id)} 
                required
              />
            </form>
          )}
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



