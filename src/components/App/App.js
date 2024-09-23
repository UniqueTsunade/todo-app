import React, {Component} from 'react';

import "./app.css";

import Header from '../Header';
import Main from '../Main';


import { getTimerData, convertTimeToSeconds } from "../../utils/helpers"

export default class App extends Component {
  startId = 100;
  timers = new Map();

  state = {
    todoData: [
      this.createTodoTask("drink tea", 12, 45),
      this.createTodoTask("drink coffee", 12, 45),
      this.createTodoTask("drink water", 12, 45),
    ],
    selected: "all",
  };

  // Create new task
  createTodoTask(label, timerMinutes, timerSeconds) {
    return {
      label,
      completed: false,
      id: this.startId++,
      time: new Date(),
      timerMinutes,
      timerSeconds,
    };
  }

  // Add new task
  addTask = (text, minutes, seconds) => {
    const newItem = this.createTodoTask(text, minutes, seconds);

    this.setState(({ todoData }) => {
      let newArr = [...todoData, newItem];

      return {
        todoData: newArr,
      };
    });
  };

  // Remove task
  removeTaskById = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter((todo) => todo.id !== id),
      };
    });
  };

  // Mark task complete
  toggleTaskCompletion = (id) => {
    const task = this.state.todoData.find((task) => task.id === id);
    if (task) {
      if (this.timers.has(id) && this.timers.get(id).isRunning) {
        this.pauseTimer(id);
      }
      this.setState(({ todoData }) => ({
        todoData: todoData.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        ),
      }));
    } else {
      console.error(`Task with id ${id} not found.`);
    }
  };

  // Filter method
  updateSelected = (newSelected) => {
    this.setState({
      selected: newSelected,
    });
  };

  filterTasks = (tasks, selected) => {
    if (selected === "all") return tasks;
    return tasks.filter((task) =>
      selected === "active" ? !task.completed : task.completed
    );
  };

  // Delete all completed tasks at once
  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const onlyActiveTasks = todoData.filter((task) => !task.completed);

      return {
        todoData: onlyActiveTasks,
      };
    });
  };

  // Add a new label to an already created task
  changeCreatedTask = (id, newLabel) => {
    this.setState(({ todoData }) => {
      const updatedTasks = todoData.map((task) =>
        task.id === id ? { ...task, label: newLabel } : task
      );

      return {
        todoData: updatedTasks,
      };
    });
  };

  /* Timer */
  componentWillUnmount() {
    this.timers.forEach((timerData) => {
      if (timerData.isRunning) {
        clearInterval(timerData.timerInterval);
      }
    });
    this.timers.clear();
  }

  // Saving the results of actions with a timer
  saveTimerMap = (timerInterval, id, remainDerdecrease) => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    this.timers.set(id, {
      remainDerdecrease,
      isRunning: false,
    });
  };

  // Timer update
  updateTimerMap = (id, minutes, seconds) => {
    this.setState(({ todoData }) => {
      const updatedTodoData = todoData.map((item) =>
        item.id === id
          ? {
              ...item,
              timerMinutes: minutes.toString().padStart(2, "0"),
              timerSeconds: seconds.toString().padStart(2, "0"),
            }
          : item
      );
      return { todoData: updatedTodoData };
    });
  };

  refreshTimerDisplay = (id, remainDerdecrease) => {
    const { minutes, seconds } = getTimerData(remainDerdecrease);
    this.updateTimerMap(id, minutes, seconds);
  };

  // Setting a pause for the timer
  stopTimer = (id) => {
    const timerData = this.timers.get(id);
    if (timerData) {
      clearInterval(timerData.timerInterval);
      // Update the timer state
      this.timers.set(id, {
        ...timerData,
        isRunning: false,
      });
    } 
  };

  // Create an interval for the timer
  createTimerInterval = (id, remainDerdecrease) => {

    const timerInterval = setInterval(() => {
      remainDerdecrease -= 1;
      this.refreshTimerDisplay(id, remainDerdecrease);

      if (remainDerdecrease <= 0) {
        this.stopTimer(id);
      }
    }, 1000);

    this.timers.set(id, {
      remainDerdecrease,
      isRunning: true,
      timerInterval,
    });
  };

  // Turn on the timer
  turnOnTimer = (id, timerMinutes, timerSeconds) => {
    // Checking if the timer is working before creating a new one
    if (this.timers.has(id) && this.timers.get(id).isRunning) {
      
      return; // Abort the execution of the function if the timer is running
    }

    // Convert time to seconds and create a timer
    let remainDerdecrease = convertTimeToSeconds(timerMinutes, timerSeconds);
    this.createTimerInterval(id, remainDerdecrease);
  };

  // Pause the timer
  pauseTimer = (id) => {
    const idArray = Array.isArray(id) ? id : [id];

    idArray.forEach((id) => {
      if (this.timers.has(id)) {
        const timerData = this.timers.get(id);
        this.saveTimerMap(
          timerData.timerInterval,
          id,
          timerData.remainDerdecrease
        );
      } else {
        this.saveTimerMap(null, id, 0);
      }
    });
  };

  render() {
    const { todoData, selected } = this.state;

    const filteredTasks = this.filterTasks(todoData, selected);
    const itemsTodo = todoData.reduce(
      (sum, task) => (sum += !task.completed),
      0
    );

    return (
      <section className="todo-app">
        <Header addTask={this.addTask} />
        <Main
          itemsTodo={itemsTodo}
          todoList={filteredTasks}
          toggleTaskCompletion={this.toggleTaskCompletion}
          removeTaskById={this.removeTaskById}
          selected={selected}
          updateSelected={this.updateSelected}
          clearCompleted={this.clearCompleted}
          changeCreatedTask={this.changeCreatedTask}
          turnOnTimer={this.turnOnTimer}
          pauseTimer={this.pauseTimer}
        />
      </section>
    );
  }
}


