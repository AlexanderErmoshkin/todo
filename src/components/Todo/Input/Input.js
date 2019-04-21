import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidUpdate() {
        if (this.props.editing) {
            this.ref.current.focus();
        }
    }

    render() {
        return (
            <input
                ref={this.ref}
                type="text"
                className={this.props.className}
                placeholder={this.props.placeHolder}
                onKeyDown={this.props.keyDown}
                value={this.props.value}
                onChange={this.props.changed}
                disabled={this.props.disabled}
                onBlur={this.props.focusLost}
                data-id={this.props.dataId}
            />
        );
    }
}

export default Input;