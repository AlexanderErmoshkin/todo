import React from 'react';

import Filters from '../../Filters/Filters';
import Counter from '../Counter/Counter';

const footer = props => {
    const clearBtn = props.checkedCount > 0
        ? <button className="clear-completed" onClick={props.deleteCompleted}>Clear completed</button>
        : null;
    return (
        <footer className="footer">
            <Counter count={props.uncheckedCount}/>
            <Filters/>
            {clearBtn}
        </footer>
    );
};

export default footer;