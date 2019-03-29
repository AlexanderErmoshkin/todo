import React from 'react';

import Item from '../Item/Item';

const list = props => {
    let todos = null;
    if (props.todos) {
        todos = props.todos.map(todo =>
            <Item
                id={todo.id}
                completed={todo.completed}
                name={todo.name}
                key={todo.id}
                toggle={props.toggleHandler}
                delete={props.deleteHandler}/>
    )}

    return (
        <ul className="todo-list">
            {todos}
        </ul>
    );
};

export default list;