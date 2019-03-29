import React from 'react';

const item = props => (
    <li key={props.id} className={props.completed ? 'completed' : null}>
        <div className="view">
            <input
                id={props.id}
                className="toggle"
                type="checkbox"
                onChange={props.toggle}
                value={props.completed} />
            <label>{props.name}</label>
            <button className="destroy" onClick={props.delete} data-id={props.id}></button>
        </div>
        <input className="edit" value="Create a TodoMVC template" />
    </li>
);

export default item;