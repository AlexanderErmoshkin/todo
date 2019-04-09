import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Todo/Header/Header';
import Footer from '../../components/Todo/Footer/Footer';
import List from '../../components/Todo/List/List';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios';
import ToggleMass from '../../components/Todo/ToggleMass/ToggleMass';

class Todo extends Component {

    componentDidMount() {
        console.log('[Todo] componentDidMount');
        this.props.onTodoFetch();
    }

    todoInputHandler = event => {
        if (event.keyCode === 13 && this.props.todoName !== '') {
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

    todoDeleteCompletedHandler = () => {
        const ids = [];
        this.props.todos.forEach(todo => {
            if (todo.completed) {
                ids.push(todo.id);
            }
        });
        this.props.onTodoCompletedDelete(ids);
    };

    todoToggleMassHandler = () => {
        this.props.onTodoToggleMass(this.props.todos, this.props.itemsLeft > 0);
    };

    todoFilterActionHandler = event => {
        this.props.onFilterAction(event.target.dataset.mode);
    };

    render() {
        const main = this.props.todos.length
            ? (
                <React.Fragment>
                    <ToggleMass checked={this.props.itemsLeft === 0} handler={this.todoToggleMassHandler}/>
                    <List todos={this.props.todos}
                          toggleHandler={this.todoToggleHandler}
                          deleteHandler={this.todoDeleteHandler}/>
                </React.Fragment>
            )
            : null;
        const footer = this.props.todos.length > 0
            ? <Footer uncheckedCount={this.props.itemsLeft}
                      checkedCount={this.props.todos.length - this.props.itemsLeft}
                      deleteCompleted={this.todoDeleteCompletedHandler}
                      filterHandler={this.todoFilterActionHandler}
                      filterMode={this.props.filterMode} />
            : null;
        return (
            <React.Fragment>
                <Header loading={this.props.loading}
                        todoAdd={this.todoInputHandler}
                        inputValue={this.props.todoName}
                        inputChanged={this.inputChangedHandler} />
                <section className="main">
                    {main}
                </section>
                {footer}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        todos: state.todo.todos,
        todoName: state.todo.todoName,
        itemsLeft: state.todo.itemsLeft,
        loading: state.todo.loading,
        filterMode: state.todo.filterMode
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTodoAdd: todoName => dispatch(actions.todoAdd(todoName)),
        onTodoNameChanged: todoName => dispatch(actions.todoNameChanged(todoName)),
        onTodoToggle: (id, completed) => dispatch(actions.todoToggle(id, completed)),
        onTodoDelete: id => dispatch(actions.todoDelete(id)),
        onTodoFetch: () => dispatch(actions.todoFetch()),
        onTodoCompletedDelete: ids => dispatch(actions.todoDeleteCompleted(ids)),
        onTodoToggleMass: (todos, isCompleted) => dispatch(actions.todoToggleMass(todos, isCompleted)),
        onFilterAction: mode => dispatch(actions.todoFilterAction(mode))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Todo, axios));