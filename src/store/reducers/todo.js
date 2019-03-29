import * as actionTypes from '../actions/actionTypes';

const todoDeleteSuccess = (state, action) => {
    const todos = [...state.todos];
    const index = todos.forEach((todo, index) => {
        if (todo.id === action.payload) {
            return index;
        }
    });
    todos.splice(index, 1);
    return {
        ...state,
        error: null,
        todos: todos
    }
};

const todoToggleSuccess = (state, action) => {
    const todos = [...state.todos].map(todo => {
        if (todo.id === action.payload.id) {
            todo.completed = action.payload.completed;
        }
        return todo;
    });
    return {
        ...state,
        error: null,
        todos: todos
    };
};

const initialState = {
    todos: [],
    error: null,
    todoName: ''
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TODO_ADD_SUCCESS:
            return {
                ...state,
                todos: state.todos.concat(action.payload),
                todoName: ''
            };
        case actionTypes.TODO_ADD_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case actionTypes.TODO_NAME_CHANGED:
            return {
                ...state,
                todoName: action.payload
            };
        case actionTypes.TODO_TOGGLE_SUCCESS:
            return todoToggleSuccess(state, action);
        case actionTypes.TODO_TOGGLE_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case actionTypes.TODO_DELETE_SUCCESS:
            return todoDeleteSuccess(state, action);
        case actionTypes.TODO_DELETE_FAIL:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default todoReducer;