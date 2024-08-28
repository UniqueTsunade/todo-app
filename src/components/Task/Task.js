import React, { Component } from "react";

import "./task.css";

export default class Task extends Component {

    handleToggle = () => {
        this.props.onToggle();
    };

    handleDelete = () => {
        this.props.deleteTask();
    }

    render() {
        const label = this.props.label;

        return (
                <div className="view">
                    <input onChange={this.handleToggle} className="toggle" type="checkbox"/>
                    <label>
                    <span className="description">
                        {label}
                    </span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button onClick={this.handleDelete} className="icon icon-destroy"></button>
                </div>
            )
    }
}


