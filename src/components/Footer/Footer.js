import React, { Component } from "react";

import "./footer.css";

import TasksFilter from "../TasksFilter";

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="todo-count">1 items left</span>
                <TasksFilter selected={this.props.selected}
                             updateSelected={this.props.updateSelected} />
                <button className="clear-completed" onClick={this.props.clearCompleted} >Clear completed</button>
            </footer>
        )
    }
}

