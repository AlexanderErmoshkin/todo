import React from 'react';

const counter = props => {
    const caption = props.count === 1 ? 'item' : 'items';
    return (
        <span className="todo-count"><strong>{props.count}</strong> {caption} left</span>
    );
};

export default counter;