import React from 'react';

import Input from '../Input/Input';

const header = props => (
    <header className="header">
        <h1>todos</h1>
        <Input
            className="new-todo"
            placeHolder="What needs to be done?"
            editing={props.editing}
            value={props.inputValue}
            keyDown={props.todoAdd}
            changed={props.inputChanged} />
    </header>
);

export default header;