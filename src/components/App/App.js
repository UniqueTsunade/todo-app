import React, {Component} from 'react';
import { compareAsc, format } from "date-fns";

import "./app.css";

import Header from '..//Header';
import Main from '../Main';


export default class App extends Component {
 
  startId = 100;

  constructor(props) {
    super(props);
    
    this.state = {
      todoData: [
        this.createTodoTask("Drink Coffee"),
        this.createTodoTask("Make Awesome App"),
        this.createTodoTask("Have a lunch")
      ],
      selected: "all", 
    }
  }

 // Create new task 
  createTodoTask(label) {
    return {
        label, 
        completed: false,
        id: this.startId++,
        time: new Date()
    }
  } 

   // Add new task  
  addTask = (text) => {
    const newItem = this.createTodoTask(text);

    this.setState(({ todoData }) => {
        let newArr = [
            ...todoData,
            newItem
        ];

        return {
            todoData: newArr
        };
    })
  }

  // Remove task  
  removeTaskById = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((elem) => elem.id === id);

            const newArr = [
                ...todoData.slice(0,idx), 
                ...todoData.slice(idx + 1)
            ]; 

            return {
                todoData: newArr
            };
    })
  }

  // Mark task complete 
  toggleTaskCompletion = (id) => {
    this.setState(({ todoData }) => {
      const updatedTasks = todoData.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
  
      return {
        todoData: updatedTasks,
      };
    });
  };


  // Filter method
  updateSelected = (newSelected) => {
    this.setState({
      selected: newSelected
    });
  };

  filterTasks = (tasks, selected) => {
    if (selected === "all") {
      return tasks;
    } else if (selected === "active") {
      return tasks.filter(task => !task.completed);
    } else {
      return tasks.filter(task => task.completed);
    }
  };

  
  // Delete all completed tasks at once
  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const onlyActiveTasks = todoData.filter((task) => !task.completed);

      return {
        todoData: onlyActiveTasks
      }
    })
  }

  // Add a new label to an already created task
  changeCreatedTask = (id, newLabel) => {
    this.setState(({ todoData }) => {
      const updatedTasks = todoData.map((task) =>
        task.id === id ? { ...task, label: newLabel, time: new Date() } : task
      );
  
      return {
        todoData: updatedTasks,
      };
    });
  };

  render() {
    const { todoData, selected } = this.state;

    const filteredTasks = this.filterTasks(todoData, selected);
    const itemsTodo = todoData.reduce((sum, task) => sum += !task.completed, 0);

    return (
      <section className="todo-app">
        <Header addTask={this.addTask}/>
        <Main itemsTodo={itemsTodo}
              todoList={filteredTasks} 
              toggleTaskCompletion={this.toggleTaskCompletion} 
              removeTaskById={this.removeTaskById}
              selected={selected}
              updateSelected={this.updateSelected}
              clearCompleted={this.clearCompleted}
              changeCreatedTask={this.changeCreatedTask} />
      </section>
    );
  }
}


