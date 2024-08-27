import React from 'react';

import "./app.css";

import Header from '..//Header';
import Main from '../Main';

const App = () => {

  const todoData = [
    { label: "Drink Coffee", id: 1 },
    { label: "Make Awesome App", id: 2 },
    { label: "Have a lunch", id: 3 },
  ];

  return (
    <section className="todo-app">
      <Header />
      <Main todos={todoData} />
    </section>
  );
};

export default App;