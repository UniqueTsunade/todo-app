import React, { Component } from "react";
import PropTypes from 'prop-types';

import "./new-task-form.css";
import { getTimerData, formatTime, handleArrowKeyNavigation, isTimerInput, validateTimerInput, } from "../../utils/helpers";
 
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
    labelError: false,    
    minutesError: false,  
    secondsError: false,  
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
    //Checking that the input value is a number
    if (!/^\d*$/.test(value)) {
      return; //Stop execution if the value is not a number
    }
    const timeDataArray = value.split("");
    const updateTimeData = parseInt(timeDataArray.slice(-2).join(""), 10);
  
    if (!isNaN(updateTimeData)) {
      if (stateProperty === "seconds") {
        this.handleSecondsUpdate(updateTimeData);
      } else {
        this.updateStateTimer(stateProperty, updateTimeData);
      }
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

    //Timer Input Validation
    if (isTimerInput(e.target)) {
      validateTimerInput(e);
    }
  
    //Submitting a form by pressing Enter
    if (e.key === "Enter") {
      this.handleFormSubmitOnEnter(e);
    }
  };
  
  //Submitting a form by pressing Enter
  handleFormSubmitOnEnter = (e) => {
    const { label, minutes, seconds } = this.state;
  
    if (label && minutes && seconds) {
      this.onSubmit(e);
    } else {
      //Set error flags depending on what is not filled in
    this.setState({
      labelError: !label,
      minutesError: !minutes,
      secondsError: !seconds
    });
    }
  };

  //Handles form submission, adds a new task with the current label, and resets the label state
  onSubmit = (e) => {
    e.preventDefault();
    const { label, minutes, seconds } = this.state;

    if (label && (minutes !== "00" || seconds !== "00")) {
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

    let { label, minutes, seconds, labelError, minutesError, secondsError } = this.state;

    return (
      <form
        className="new-task-form"
        onSubmit={this.onSubmit}
        onKeyDown={this.onKeyDown}
      >
        <input
          className={`new-todo ${labelError ? 'error' : ''}`}
          onChange={this.onLabelChange}
          placeholder="Task"
          value={label}
          autoFocus
          required
        />

        <input
          className={`timer ${minutesError ? 'error' : ''}`}
          onChange={(e) => this.onTimeChangeHandler(e, "minutes")}
          placeholder="Min"
          value={minutes}
          onFocus={() => this.onFocus('minutes')}
          required
        />

        <input
          className={`timer ${secondsError ? 'error' : ''}`} 
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

