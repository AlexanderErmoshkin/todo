import React from 'react';

import Filters from '../../Filters/Filters';
import Counter from '../Counter/Counter';

const footer = props => {
    return (
        <footer className="footer">
            <Counter count={0}/>
            <Filters/>
            <button className="clear-completed">Clear completed</button>
        </footer>
    );
};

export default footer;