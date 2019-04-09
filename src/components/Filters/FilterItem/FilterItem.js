import React from 'react';

import classes from './FilterItem.css';

const filterItem = props => {
    const styles = [classes.FilterItem];
    if (props.currentMode === props.mode) {
        styles.push('selected');
    }
    return (
        <li key={props.key}>
            <a className={styles.join(' ')} onClick={props.clicked}
               data-mode={props.mode}>
                {props.children}
            </a>
        </li>
    );
};
export default filterItem;