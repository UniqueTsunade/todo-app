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

  render() {
    return (
      <section className="todo-app">
        <Header />
        <Main todos={this.state.todoData} />
      </section>
    );
  }
}


