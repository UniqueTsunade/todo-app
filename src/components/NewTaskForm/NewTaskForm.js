import React, { Component } from "react";

import "./new-task-form.css";

export default class NewTaskForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            label: ""
        }
    }


    onLabelChange = (e) => {
        
        this.setState({
            label: e.target.value
        });

    };

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
                        required/>
                </form>
            );
    }
}

