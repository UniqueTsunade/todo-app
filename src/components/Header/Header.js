import React, { Component } from "react";

import "./header.css";

import NewTaskForm from "../NewTaskForm";


export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <NewTaskForm addTask={ this.props.addTask } />
            </header>
        )
    }
}

