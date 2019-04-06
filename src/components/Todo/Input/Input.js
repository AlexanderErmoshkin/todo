import React from 'react';

const input = props => (
    <input
        className={props.className}
        placeholder={props.placeHolder}
        autoFocus={props.autoFocus}
        onKeyDown={props.todoAdd}
        value={props.value}
        onChange={props.changed}
        disabled={props.disabled}
    />
);

export default input;