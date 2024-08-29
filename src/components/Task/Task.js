import React, { Component } from "react";

import "./task.css";

export default class Task extends Component {

    render() {
        const { label, onToggle, onDelete } = this.props;

        return (
                <div className="view">
                    <input onChange={ onToggle } className="toggle" type="checkbox"/>
                    <label>
                    <span className="description">
                        {label}
                    </span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button onClick={ onDelete } className="icon icon-destroy"></button>
                </div>
            )
    }
}


