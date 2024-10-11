import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";

import "./task.css";

export default class Task extends Component {
  static defaultProps = {
    time: new Date(),
  };

  static propTypes = {
    editOneTask: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    changeTaskAfterSubmitting: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
  };

  state = {
    modifiedLabel: "",
    formattedTime: "",
    isTimerActive: false
  };

  /*Methods for updating task creation time*/

  //Updates the component's state with the formatted time based on the props.time value
  static getDerivedStateFromProps(props, state) {
    return {
      formattedTime: formatDistanceToNow(props.time, {
        includeSeconds: true,
        addSuffix: true,
      }),
    };
  }

  //Reused methods
  //Format a given time using the formatDistanceToNow function
  formatTime = (time) => {
    return formatDistanceToNow(time, { includeSeconds: true, addSuffix: true });
  };

  //Update the component's state with the current formatted time
  updateTime = () => {
    this.setState({ formattedTime: this.formatTime(this.props.time) });
  };

  //Stop updating the time by clearing the interval
  stopUpdatingTime = () => {
    clearInterval(this.timerId);
  };

  //Start running out of time: Initialize the timer and update the time every 20 seconds
  startUpdatingTime = () => {
    //Initialize the timer and add event listeners for window focus and blur events
    this.updateTime(); // Initial update
    this.timerId = setInterval(this.updateTime, 20000); // Run an update every 20 seconds
  };

  //Lifecycle method: Called when the component is mounted
  componentDidMount() {
    this.startUpdatingTime(); // Call startUpdatingTime to initialize the timer
    window.addEventListener("focus", this.startUpdatingTime); // Run update on focus
    window.addEventListener("blur", this.stopUpdatingTime); // Stop updating when focus is lost
  }

  //Lifecycle method: Called when the component is unmounted
  componentWillUnmount() {
    this.stopUpdatingTime(); //Stopping the update before unmounting
    window.removeEventListener("focus", this.startUpdatingTime);
    window.removeEventListener("blur", this.stopUpdatingTime);
  }


  //Update the component's state with the new label value
  onLabelChange = (e) => {
    this.setState({
      modifiedLabel: e.target.value,
    });
  };

  //Update the task's label and reset the component's state
  onSubmit = (e) => {
    e.preventDefault();
    this.props.changeTaskAfterSubmitting(this.props.id, this.state.modifiedLabel);
    this.setState({ modifiedLabel: "" });
  };

  handleTurnOnTimer = (completed, timerMinutes, timerSeconds) => {
    if (!completed && !this.state.isTimerActive) { 
      this.setState({ isTimerActive: true }, () => {
        this.props.turnOnTimer(timerMinutes, timerSeconds); 
      });
    }
  };

  handlePauseTimer = () => {
    if (this.state.isTimerActive) { 
      this.setState({ isTimerActive: false }, () => {
        this.props.pauseTimer(); 
      });
    }
  }

  render() {
    const {
      label,
      onToggle,
      onDelete,
      completed,
      editOneTask,
      handleBlur,
      timerMinutes,
      timerSeconds,
    } = this.props;

    const { formattedTime, isTimerActive, modifiedLabel } = this.state;

    const isEditing = this.props.isEditing;

    console.log(isEditing)

    return (
      <>
        <div className="view">
          <input
            onChange={onToggle}
            className="toggle"
            type="checkbox"
            checked={completed}
          />
          <label>
            <span className="title">{label}</span>
            <span className="description">
              <button
                onClick={() => this.handleTurnOnTimer(completed, timerMinutes, timerSeconds)}
                className={`icon icon-play ${isTimerActive ? "icon-play-active" : ""}`}
              ></button>
              <button 
                onClick={() => this.handlePauseTimer()} 
                className={`icon icon-pause ${!isTimerActive ? "icon-pause-active" : ""}`}>
              </button>
              {timerMinutes}:{timerSeconds}
            </span>
            <span className="description">created {formattedTime}</span>
          </label>
          <button
            onClick={() => editOneTask(this.props.id)}
            className="icon icon-edit"
          ></button>
          <button onClick={onDelete} className="icon icon-destroy"></button>
        </div>
        {isEditing && (
          <form className="edit-task-form" onSubmit={this.onSubmit}>
            <input
              type="text"
              onChange={this.onLabelChange}
              className="edit"
              value={modifiedLabel}
              autoFocus
              onBlur={handleBlur}
              required
            />
          </form>
        )}
      </>
    );
  }
}
