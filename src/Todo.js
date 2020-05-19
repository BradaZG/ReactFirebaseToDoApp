import React from 'react';
import './Todo.css'

const Todo = (props) => {

    return (
        <div className="todo">
            <h2>{(props.value + 1) + ". " + props.title}</h2>
            <button className="button" value={props.value} onClick={props.deleteTodo}>DELETE</button>
        </div>
    );
};

export default Todo;