import React from "react";

import "./new-task-form.css";

const NewTaskForm = () => {
    return (
        <form className="new-task-form">
            <input className="new-todo" placeholder="What needs to be done?" autoFocus/>
        </form>
    );
};

export default NewTaskForm;