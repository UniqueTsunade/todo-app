import React, {Component} from 'react';

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

  createTodoTask(label) {
    return {
        label, 
        completed: false,
        id: this.startId++,
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


  render() {
    // Tasks for different filter categories
    const filteredTasks = this.state.selected === "all"
    ? this.state.todoData
    : this.state.selected === "active"
      ? this.state.todoData.filter(task => !task.completed)
      : this.state.todoData.filter(task => task.completed);

    return (


      <section className="todo-app">
        <Header addTask={this.addTask}/>
        <Main todoList={filteredTasks} 
        toggleTaskCompletion={this.toggleTaskCompletion} 
        removeTaskById={this.removeTaskById}
        selected={this.state.selected}
        updateSelected={this.updateSelected}/>
        
      </section>
    );
  }
}


