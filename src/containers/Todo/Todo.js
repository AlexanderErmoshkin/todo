import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Todo/Header/Header';
import Footer from '../../components/Todo/Footer/Footer';
import List from '../../components/Todo/List/List';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios';

class Todo extends Component {

    componentDidMount() {
        console.log('[Todo] componentDidMount');
    }

    todoInputHandler = event => {
        if (event.keyCode === 13) {
            this.props.onTodoAdd(event.target.value);
        }
    };

    inputChangedHandler = event => {
        this.props.onTodoNameChanged(event.target.value);
    };

    todoToggleHandler = event => {
        this.props.onTodoToggle(event.target.id, event.target.checked);
    };

    todoDeleteHandler = event => {
        this.props.onTodoDelete(event.target.dataset.id);
    };

    render() {
        const todoList = this.props.todos
            ? <List todos={this.props.todos} toggleHandler={this.todoToggleHandler} deleteHandler={this.todoDeleteHandler}/>
            : null;
        return (
            <React.Fragment>
                <Header
                    todoAdd={this.todoInputHandler}
                    inputValue={this.props.todoName}
                    inputChanged={this.inputChangedHandler} />
                <section className="main">
                    <input id="toggle-all" className="toggle-all" type="checkbox" />
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    {todoList}
                </section>
                <Footer itemsCount={0}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        todos: state.todo.todos,
        todoName: state.todo.todoName
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTodoAdd: todoName => dispatch(actions.todoAdd(todoName)),
        onTodoNameChanged: todoName => dispatch(actions.todoNameChanged(todoName)),
        onTodoToggle: (id, completed) => dispatch(actions.todoToggle(id, completed)),
        onTodoDelete: id => dispatch(actions.todoDelete(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Todo, axios));