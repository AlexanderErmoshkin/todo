import React from 'react';

import Item from '../Item/Item';

const list = props => {
    let todos = null;
    if (props.todos) {
        todos = props.todos.map(todo =>
            <Item
                id={todo.id}
                completed={todo.completed}
                hidden={todo.hidden}
                name={props.editId === todo.id ? props.editName : todo.name}
                key={todo.id}
                toggle={props.toggleHandler}
                delete={props.deleteHandler}
                doubleClicked={props.doubleClicked}
                nameChanged={props.nameChanged}
                focusLost={props.focusLost}
                keyDown={props.keyDown}
                editing={props.editId === todo.id} />
    )}

    return (
        <ul className="todo-list">
            {todos}
        </ul>
    );
};

export default list;