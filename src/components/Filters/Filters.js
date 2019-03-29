import React from 'react';

import FilterItem from './FilterItem/FilterItem';

const filters = () => {
    return (
        <ul className="filters">
            <FilterItem selected>All</FilterItem>
            <FilterItem>Active</FilterItem>
            <FilterItem>Completed</FilterItem>
        </ul>
    );
};

export default filters;