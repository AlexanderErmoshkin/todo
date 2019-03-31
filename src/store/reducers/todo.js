import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../util";

const todoFetchSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        todos: Object.keys(action.payload).map(id => {
            return {
                id: id,
                completed: action.payload[id].completed,
                name: action.payload[id].name
            };
        })
    });
};

const todoDeleteSuccess = (state, action) => {
    const todos = [...state.todos];
    const index = todos.forEach((todo, index) => {
        if (todo.id === action.payload) {
            return index;
        }
    });
    todos.splice(index, 1);
    return updateObject(state, {
        error: null,
        todos: todos
    })
};

const todoToggleSuccess = (state, action) => {
    const todos = [...state.todos].map(todo => {
        if (todo.id === action.payload.id) {
            todo.completed = action.payload.completed;
        }
        return todo;
    });
    return updateObject(state, {
        error: null,
        todos: todos
    });
};

const initialState = {
    todos: [],
    error: null,
    todoName: '',
    loading: false
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TODO_ADD_SUCCESS:
            return updateObject(state, {
                todos: state.todos.concat(action.payload),
                todoName: ''
            });
        case actionTypes.TODO_ADD_FAIL:
            return updateObject(state, {error: action.payload});
        case actionTypes.TODO_NAME_CHANGED:
            return updateObject(state, {todoName: action.payload});
        case actionTypes.TODO_TOGGLE_SUCCESS:
            return todoToggleSuccess(state, action);
        case actionTypes.TODO_TOGGLE_FAIL:
            return updateObject(state, {error: action.payload});
        case actionTypes.TODO_DELETE_SUCCESS:
            return todoDeleteSuccess(state, action);
        case actionTypes.TODO_DELETE_FAIL:
            return updateObject(state, {error: action.payload});
        case actionTypes.TODO_FETCH_START:
            return updateObject(state, {loading: true});
        case actionTypes.TODO_FETCH_SUCCESS:
            return todoFetchSuccess(state, action);
        case actionTypes.TODO_FETCH_FAIL:
            return updateObject(state, {
                loading: false,
                error: action.payload
            });
        default:
            return state;
    }
};

export default todoReducer;