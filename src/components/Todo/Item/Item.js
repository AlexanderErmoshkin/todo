import React from 'react';

import classes from './Item.css';
import Input from '../Input/Input';

const item = props => {
    const styles = [];
    if (props.completed) {
        styles.push('completed');
    }
    if (props.hidden) {
        styles.push(classes.Hidden);
    }
    if (props.editing) {
        styles.push('editing');
    }
    return (
        <li key={props.id} className={styles.join(' ')} onDoubleClick={props.doubleClicked}>
            <div className="view">
                <input
                    id={props.id}
                    className="toggle"
                    type="checkbox"
                    onChange={props.toggle}
                    checked={props.completed}
                    value={props.completed} />
                <label data-id={props.id}>{props.name}</label>
                <button className="destroy" onClick={props.delete} data-id={props.id}></button>
            </div>
            <Input className="edit"
                   changed={props.nameChanged}
                   value={props.name}
                   keyDown={props.keyDown}
                   focusLost={props.focusLost}
                   dataId={props.id}
                   editing={props.editing} />
        </li>
    );
};

export default item;