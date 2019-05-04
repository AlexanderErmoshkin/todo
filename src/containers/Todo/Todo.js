import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Todo/Header/Header';
import Footer from '../../components/Todo/Footer/Footer';
import List from '../../components/Todo/List/List';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios';
import ToggleMass from '../../components/Todo/ToggleMass/ToggleMass';
import { getIncompleteCount, getTodoById} from '../../util';

class Todo extends Component {

    componentDidMount() {
        this.props.onTodoFetch();
    }

    todoInputHandler = event => {
        if (event.keyCode === 13 && this.props.todoName && !this.props.submitted) {
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

    todoEditStartHandler = event => {
        this.props.onTodoEditStart(event.target.dataset.id);
    };

    todoNameEditHandler = event => {
        let itemsLeft = this.props.itemsLeft;
        if (event.target.value === ''
            && !getTodoById(this.props.todos, event.target.dataset.id).completed
            && this.props.itemsLeft === getIncompleteCount(this.props.todos)
        ) {
            itemsLeft = this.props.itemsLeft - 1;
        }
        this.props.onTodoEdit(event.target.value, itemsLeft);
    };

    todoEditUpdateHandler = () => {
        if (!this.props.editId || !this.props.editName) {
            this.props.onTodoEditCancel(getIncompleteCount(this.props.todos));
            return;
        }
        const currentName = this.props.todos.reduce((_, todo) => {
            if (this.props.editId === todo.id) {
                return todo.name;
            }
        });
        if (currentName !== this.props.editName) {
            this.props.onTodoEditUpdate(this.props.editId, this.props.editName);
        } else {
            this.props.onTodoEditCancel(getIncompleteCount(this.props.todos));
        }
    };

    todoEditUpdateSubmitHandler = event => {
        const currentName = this.props.todos.reduce((_, todo) => {
            if (this.props.editId === todo.id) {
                return todo.name;
            }
        });
        if (event.keyCode === 13) {
            if (currentName === this.props.editName) {
                this.props.onTodoEditCancel(getIncompleteCount(this.props.todos));
            } else if (this.props.editName === '') {
                this.props.onTodoDelete(this.props.editId);
            } else {
                this.props.onTodoEditUpdate(this.props.editId, this.props.editName);
            }
        } else if (event.keyCode === 27) {
            this.props.onTodoEditCancel(getIncompleteCount(this.props.todos));
        }
    };

    render() {
        const main = this.props.todos.length
            ? (
                <React.Fragment>
                    <ToggleMass checked={this.props.itemsLeft === 0} handler={this.todoToggleMassHandler}/>
                    <List todos={this.props.todos}
                          toggleHandler={this.todoToggleHandler}
                          deleteHandler={this.todoDeleteHandler}
                          doubleClicked={this.todoEditStartHandler}
                          nameChanged={this.todoNameEditHandler}
                          focusLost={this.todoEditUpdateHandler}
                          keyDown={this.todoEditUpdateSubmitHandler}
                          editName={this.props.editName}
                          editId={this.props.editId}/>
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
                <Header todoAdd={this.todoInputHandler}
                        editing={!this.props.editId}
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
        filterMode: state.todo.filterMode,
        submitted: state.todo.submitted,
        editId: state.todo.editId,
        editName: state.todo.editName
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
        onFilterAction: mode => dispatch(actions.todoFilterAction(mode)),
        onTodoEditStart: id => dispatch(actions.todoEditStart(id)),
        onTodoEdit: (name, itemsLeft) => dispatch(actions.todoEdit(name, itemsLeft)),
        onTodoEditUpdate: (id, name) => dispatch(actions.todoEditUpdate(id, name)),
        onTodoEditCancel: itemsLeft => dispatch(actions.todoEditCancel(itemsLeft)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Todo, axios));