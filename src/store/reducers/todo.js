import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../util";

const todoFetchStart = state => {
    return updateObject(state, {loading: true});
};

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
        }),
        itemsLeft: Object.keys(action.payload).reduce((count, id) => {
            return action.payload[id].completed ? count : count + 1
        }, 0)
    });
};

const todoFetchFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.payload
    });
};

const todoDeleteSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        todos: [...state.todos].filter(todo => {
            return todo.id !== action.payload;
        }),
        itemsLeft: state.itemsLeft - 1
    })
};

const todoDeleteFail = (state, action) => {
    return updateObject(state, {
        error: action.payload,
        loading: false
    });
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
        todos: todos,
        itemsLeft: action.payload.completed
            ? state.itemsLeft - 1
            : state.itemsLeft + 1
    });
};

const todoToggleFail = (state, action) => {
    return updateObject(state, {
        error: action.payload,
        loading: false
    });
};

const todoAddSuccess = (state, action) => {
    return updateObject(state, {
        todos: state.todos.concat(action.payload),
        todoName: '',
        itemsLeft: state.itemsLeft + 1
    })
};

const todoAddFail = (state, action) => {
    return updateObject(state, {
        error: action.payload,
        loading: false
    });
};

const todoNameChanged = (state, action) => {
    return updateObject(state, {todoName: action.payload});
};

const todoDeleteCompletedSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        todos: state.todos.filter(todo => {
            return action.payload.indexOf(todo.id) === -1;
        }),
    });
};

const todoDeleteCompletedFail = (state, action) => {
    return updateObject(state, {
        error: action.payload,
        loading: false
    });
};

const todoDeleteCompletedStart = state => {
    return updateObject(state, {loading: true});
};

const todoToggleMassStart = state => {
    return updateObject(state, {loading: true});
};

const todoToggleMassSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        todos: [...state.todos].map(todo => {
            todo.completed = action.payload;
            return todo;
        }),
        itemsLeft: state.todos.reduce((count, todo) => {
            return todo.completed ? count : count + 1;
        }, 0)
    });
};

const todoToggleMassFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.payload
    });
};

const initialState = {
    todos: [],
    error: null,
    todoName: '',
    loading: false,
    itemsLeft: 0
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TODO_ADD_SUCCESS: return todoAddSuccess(state, action);
        case actionTypes.TODO_ADD_FAIL: return todoAddFail(state, action);
        case actionTypes.TODO_NAME_CHANGED: return todoNameChanged(state, action);
        case actionTypes.TODO_TOGGLE_SUCCESS: return todoToggleSuccess(state, action);
        case actionTypes.TODO_TOGGLE_FAIL: return todoToggleFail(state, action);
        case actionTypes.TODO_DELETE_SUCCESS: return todoDeleteSuccess(state, action);
        case actionTypes.TODO_DELETE_FAIL: return todoDeleteFail(state, action);
        case actionTypes.TODO_FETCH_START: return todoFetchStart(state);
        case actionTypes.TODO_FETCH_SUCCESS: return todoFetchSuccess(state, action);
        case actionTypes.TODO_FETCH_FAIL: return todoFetchFail(state, action);
        case actionTypes.TODO_DELETE_COMPLETED_START: return todoDeleteCompletedStart(state, action);
        case actionTypes.TODO_DELETE_COMPLETED_SUCCESS: return todoDeleteCompletedSuccess(state, action);
        case actionTypes.TODO_DELETE_COMPLETED_FAIL: return todoDeleteCompletedFail(state, action);
        case actionTypes.TODO_TOGGLE_MASS_START: return todoToggleMassStart(state);
        case actionTypes.TODO_TOGGLE_MASS_SUCCESS: return todoToggleMassSuccess(state, action);
        case actionTypes.TODO_TOGGLE_MASS_FAIL: return todoToggleMassFail(state, action);
        default: return state;
    }
};

export default todoReducer;