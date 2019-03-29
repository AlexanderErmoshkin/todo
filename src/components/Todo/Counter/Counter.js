import React from 'react';

const counter = props => (
    <span className="todo-count"><strong>{props.count}</strong> item left</span>
);

export default counter;