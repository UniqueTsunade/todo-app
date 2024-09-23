import React, { Component } from "react";
import PropTypes from 'prop-types';

import "./new-task-form.css";
import { getTimerData, formatTime, handleArrowKeyNavigation } from "../../utils/helpers";
 
export default class NewTaskForm extends Component {
  static propTypes = {
    addTask: PropTypes.func.isRequired,
  };

  state = {
    label: "",
    minutes: "",
    seconds: "",
    minutesFocused: false, 
    secondsFocused: false, 
  };

  //Updates the label state with the new input value
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  // Show initial data when focusing on input
  onFocus = (stateProperty) => {
    if (!this.state[`${stateProperty}Focused`]) {
      this.setState({
        [stateProperty]: "00",
        [`${stateProperty}Focused`]: true,
      });
    }
  };

  // Changing timer data
  onTimeChange = (value, stateProperty) => {
    const timeDataArray = value.split("");
    const updateTimeData = parseInt(timeDataArray.slice(-2).join(""), 10);

    if (stateProperty === "seconds") {
      this.handleSecondsUpdate(updateTimeData);
    } else {
      this.updateStateTimer(stateProperty, updateTimeData);
    }
  };

  // Converting values ​​greater than specified values
  handleSecondsUpdate = (updateTimeData) => {
    if (updateTimeData > 59) {
      const { minutes: minutesToAdd, seconds: secondsUpdate } =
        getTimerData(updateTimeData);

      this.setState((prevState) => ({
        minutes: formatTime(Number(prevState.minutes) + minutesToAdd),
        seconds: formatTime(secondsUpdate),
      }));
    } else {
      this.updateStateTimer("seconds", updateTimeData);
    }
  };

  // Update the timer state
  updateStateTimer = (stateProperty, value) => {
    this.setState({
      [stateProperty]: formatTime(value),
    });
  };


  // Tracking changes in timer inputs
  onTimeChangeHandler = (e, stateProperty) => {
    const input = e.target;
    const value = input.value; 
  
    this.onTimeChange(value, stateProperty);
  };

  onKeyDown = (e) => {
    handleArrowKeyNavigation(e);

    if (
      e.target.className === "timer" &&
      !/[0-9]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight"
    )
      if (
        e.key === "Enter" &&
        this.state.label &&
        this.state.minutes &&
        this.state.seconds
      ) {
        this.onSubmit(e);
      }
  };

  //Handles form submission, adds a new task with the current label, and resets the label state
  onSubmit = (e) => {
    e.preventDefault();
    const { label, minutes, seconds } = this.state;

    if (label && minutes && seconds) {
      this.props.addTask(label, minutes, seconds);
      this.setState({
        label: "",
        minutes: "",
        seconds: "",
        minutesFocused: false,
        secondsFocused: false,
      });
    }
  };

  render() {

    let { label, minutes, seconds } = this.state;

    return (
      <form
        className="new-task-form"
        onSubmit={this.onSubmit}
        onKeyDown={this.onKeyDown}
      >
        <input
          className="new-todo"
          onChange={this.onLabelChange}
          placeholder="Task"
          value={label}
          autoFocus
          required
        />

        <input
          className="timer"
          onChange={(e) => this.onTimeChangeHandler(e, "minutes")}
          placeholder="Min"
          value={minutes}
          onFocus={() => this.onFocus('minutes')}
          required
        />

        <input
          className="timer"
          onChange={(e) => this.onTimeChangeHandler(e, "seconds")}
          placeholder="Sec"
          value={seconds}
          onFocus={() => this.onFocus('seconds')}
          required
        />
      </form>
    );
  }
}

