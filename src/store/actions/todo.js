import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const todoAdd = todoName => {
    return dispatch => {
        axios.post('todos.json', {name: todoName, completed: false}).then(response => {
            dispatch(todoAddSuccess(response.data.name, todoName));
        }).catch(error => {
            dispatch(todoAddFail(error));
        });
    }
};

export const todoAddSuccess = (id, todo) => {
    return {
        type: actionTypes.TODO_ADD_SUCCESS,
        payload: {id: id, name: todo, completed: false}
    };
};

export const todoAddFail = error => {
    return {
        type: actionTypes.TODO_ADD_FAIL,
        payload: error
    };
};

export const todoNameChanged = todoName => {
    return {
        type: actionTypes.TODO_NAME_CHANGED,
        payload: todoName
    };
};

export const todoToggle = (id, completed) => {
    return dispatch => {
        axios.patch('todos/' + id + '.json', {completed:completed}).then(() => {
            dispatch(todoToggleSuccess(id, completed));
        }).catch(error => {
            console.log(error);
            dispatch(todoToggleFail(error));
        });
    };
};

export const todoToggleSuccess = (id, completed) => {
    return {
        type: actionTypes.TODO_TOGGLE_SUCCESS,
        payload: {
            id: id,
            completed: completed
        }
    };
};

export const todoToggleFail = error => {
    return {
        type: actionTypes.TODO_TOGGLE_FAIL,
        payload: error
    };
};

export const todoDelete = id => {
    return dispatch => {
        axios.delete('todos/' + id + '.json').then(() => {
            dispatch(todoDeleteSuccess());
        }).catch((error) => {
            dispatch(todoDeleteFail(error));
        });
    };
};

export const todoDeleteSuccess = () => {
    return {
        type: actionTypes.TODO_DELETE_SUCCESS
    };
};

export const todoDeleteFail = error => {
    return {
        type: actionTypes.TODO_DELETE_FAIL,
        payload: error
    };
};