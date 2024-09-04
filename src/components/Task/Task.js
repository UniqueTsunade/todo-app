import React, { Component } from "react";
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import "./task.css";

export default class Task extends Component {

  static defaultProps = {
    time: new Date(),
  };

  static propTypes = {
    onEdit: PropTypes.func.isRequired
  }

  state = {
    formattedTime: '',
  };

  static getDerivedStateFromProps(props, state) {
    return {
      formattedTime: formatDistanceToNow(props.time, { includeSeconds: true, addSuffix: true }),
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
    window.addEventListener('focus', this.startUpdatingTime); // Run update on focus
    window.addEventListener('blur', this.stopUpdatingTime); // Stop updating when focus is lost
  }

  //Lifecycle method: Called when the component is unmounted
  componentWillUnmount() {
    this.stopUpdatingTime(); //Stopping the update before unmounting
    window.removeEventListener('focus', this.startUpdatingTime); 
    window.removeEventListener('blur', this.stopUpdatingTime); 
  }


  render() {
    const { label, onToggle, onDelete, completed, onEdit } = this.props;
    const { formattedTime } = this.state;

    return (
      <div className="view">
        <input onChange={ onToggle } className="toggle" type="checkbox" checked={completed} />
        <label>
          <span className="description">{ label }</span>
          <span className="created">created { formattedTime }</span>
        </label>
        <button onClick={ onEdit } className="icon icon-edit"></button>
        <button onClick={ onDelete } className="icon icon-destroy"></button>
      </div>
    );
  }
}
