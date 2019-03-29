import React from 'react';

const filterItem = props => (
    <li key={props.key}>
        <a className={props.selected ? 'selected' : null} onClick={props.clicked} href="#">
            {props.children}
        </a>
    </li>
);

export default filterItem;