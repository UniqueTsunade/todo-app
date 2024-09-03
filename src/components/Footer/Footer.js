import React, { Component } from "react";
import PropTypes from 'prop-types';

import "./footer.css";

import TasksFilter from "../TasksFilter";

export default class Footer extends Component {

    static propTypes = {
        itemsTodo: PropTypes.number
    }

    render() {

        return (
            <footer className="footer">
                <span className="todo-count">{ this.props.itemsTodo } items left</span>
                <TasksFilter selected={ this.props.selected } 
                             updateSelected={ this.props.updateSelected } />
                <button className="clear-completed" onClick={ this.props.clearCompleted }>Clear completed</button>
            </footer>
        )
    }
}

