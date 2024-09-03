import React, { Component } from "react";
import PropTypes from 'prop-types';

import "./tasks-filter.css";

export default class TasksFilter extends Component {  

  static defaultProps = {
    selected: "all", 
  };

  static propTypes = {
    selected: PropTypes.string,
    updateSelected: PropTypes.func.isRequired
  }

  render() {

    const { selected, updateSelected } = this.props;


    return (
      <ul className="tasks-filter">
        <li>
        <button className={`${selected === 'all' ? 'selected' : ''}`}
                onClick={() => updateSelected("all")}>All</button>
        </li>
        <li>
        <button className={`${selected === 'active' ? 'selected' : ''}`}
                onClick={() => updateSelected("active")}>Active</button>
        </li>
        <li>
          <button className={`${selected === 'completed' ? 'selected' : ''}`}
                  onClick={() => updateSelected("completed")}>Completed</button>
        </li>
      </ul>
    )
  }
}