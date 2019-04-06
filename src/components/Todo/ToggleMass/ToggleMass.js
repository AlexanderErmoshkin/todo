import React from 'react';

const toggleMass = props => {
    return (
        <React.Fragment>
            <input id="toggle-all"
                   className="toggle-all"
                   type="checkbox"
                   onClick={props.handler}
                   value={props.checked}
                   checked={props.checked}/>
            <label htmlFor="toggle-all">Mark all as complete</label>
        </React.Fragment>
    );
};

export default toggleMass;