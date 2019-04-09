import React from 'react';

import FilterItem from './FilterItem/FilterItem';
import { filterActions } from "../../store/actions/actionTypes";

const filters = props => {
    return (
        <ul className="filters">
            <FilterItem currentMode={props.filterMode} clicked={props.handler} mode={filterActions.ALL}>All</FilterItem>
            <FilterItem currentMode={props.filterMode} clicked={props.handler} mode={filterActions.ACTIVE}>Active</FilterItem>
            <FilterItem currentMode={props.filterMode} clicked={props.handler} mode={filterActions.COMPLETED}>Completed</FilterItem>
        </ul>
    );
};

export default filters;