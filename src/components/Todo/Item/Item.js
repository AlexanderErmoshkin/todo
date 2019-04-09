import React from 'react';

import classes from './Item.css';

const item = props => {
    const styles = [];
    if (props.completed) {
        styles.push('completed');
    }
    if (props.hidden) {
        styles.push(classes.Hidden);
    }
    return (
        <li key={props.id} className={styles.join(' ')}>
            <div className="view">
                <input
                    id={props.id}
                    className="toggle"
                    type="checkbox"
                    onChange={props.toggle}
                    checked={props.completed}
                    value={props.completed}/>
                <label>{props.name}</label>
                <button className="destroy" onClick={props.delete} data-id={props.id}></button>
            </div>
            <input className="edit" value="Create a TodoMVC template"/>
        </li>
    );
};

export default item;