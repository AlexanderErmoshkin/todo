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
            dispatch(todoDeleteSuccess(id));
        }).catch((error) => {
            dispatch(todoDeleteFail(error));
        });
    };
};

export const todoDeleteSuccess = id => {
    return {
        type: actionTypes.TODO_DELETE_SUCCESS,
        payload: id
    };
};

export const todoDeleteFail = error => {
    return {
        type: actionTypes.TODO_DELETE_FAIL,
        payload: error
    };
};

export const todoFetch = () => {
    return dispatch => {
        dispatch(todoFetchStart());
        axios.get('todos.json').then(response => {
            dispatch(todoFetchSuccess(response.data));
        }).catch(error => {
            dispatch(todoFetchFail(error));
        });
    }
};

export const todoFetchStart = () => {
    return {
        type: actionTypes.TODO_FETCH_START
    };
};

export const todoFetchSuccess = todos => {
    return {
        type: actionTypes.TODO_FETCH_SUCCESS,
        payload: todos
    };
};

export const todoFetchFail = error => {
    return {
        type: actionTypes.TODO_FETCH_FAIL,
        payload: error
    };
};

export const todoDeleteCompleted = ids => {
    const requests = [];
    ids.map(id => {
        return requests.push(axios.delete('todos/' + id + '.json'));
    });
    return dispatch => {
        dispatch(todoDeleteCompletedStart());
        Promise.all(requests).then(([...responses]) => {
            dispatch(todoDeleteCompletedSuccess(ids));
        }).catch(error => {
            dispatch(todoDeleteCompletedFail(error));
        });
    };
};

export const todoDeleteCompletedStart = () => {
    return {
        type: actionTypes.TODO_DELETE_COMPLETED_START
    };
};

export const todoDeleteCompletedSuccess = ids => {
    return {
        type: actionTypes.TODO_DELETE_COMPLETED_SUCCESS,
        payload: ids
    };
};

export const todoDeleteCompletedFail = error => {
    return {
        type: actionTypes.TODO_DELETE_COMPLETED_FAIL,
        payload: error
    };
};