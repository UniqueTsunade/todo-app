//Imports
import React from 'react';
import ReactDOM from 'react-dom/client';

import "./index.css";

import Header from './components/Header';
import Main from './components/Main';

//Definition of functions and components
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


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)