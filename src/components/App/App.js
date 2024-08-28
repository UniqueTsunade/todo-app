import React, {Component} from 'react';

import "./app.css";

import Header from '..//Header';
import Main from '../Main';


export default class App extends Component {
 
  constructor() {
    super();
    
    this.state = {
      todoData: [
      { label: "Drink Coffee", id: 1 },
      { label: "Make Awesome App", id: 2 },
      { label: "Have a lunch", id: 3 },
      ]
    }
  }

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

  render() {
    return (
      <section className="todo-app">
        <Header />
        <Main todoList={this.state.todoData} removeTaskById={(id) => this.removeTaskById(id)}/>
      </section>
    );
  }
}


