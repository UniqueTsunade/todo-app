import React, { Component } from "react";
import PropTypes from 'prop-types';

import "./new-task-form.css";

export default class NewTaskForm extends Component {

    static propTypes =  {
        addTask: PropTypes.func.isRequired,
    }

    state = {
        label: ""
    }


    //Updates the label state with the new input value
    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });

    };

    //Handles form submission, adds a new task with the current label, and resets the label state
    onSubmit = (e) => {
        e.preventDefault();                
        this.props.addTask(this.state.label);
        this.setState({
            label: ""
        })
        

    }

    render() {
            return (
                <form className="new-task-form" onSubmit={this.onSubmit}>
                    <input className="new-todo" 
                        onChange={this.onLabelChange} 
                        placeholder="What needs to be done?" 
                        value={this.state.label}
                        autoFocus
                        required />
                </form>
            );
    }
}

