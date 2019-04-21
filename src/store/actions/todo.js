import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const todoAdd = todoName => {
    return dispatch => {
        dispatch(todoAddStart());
        axios.post('todos.json', {name: todoName, completed: false}).then(response => {
            dispatch(todoAddSuccess(response.data.name, todoName));
        }).catch(error => {
            dispatch(todoAddFail(error));
        });
    }
};

const todoAddStart = () => {
    return {
        type: actionTypes.TODO_ADD_START
    };
};

const todoAddSuccess = (id, todo) => {
    return {
        type: actionTypes.TODO_ADD_SUCCESS,
        payload: {id: id, name: todo, completed: false}
    };
};

const todoAddFail = error => {
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

const todoToggleSuccess = (id, completed) => {
    return {
        type: actionTypes.TODO_TOGGLE_SUCCESS,
        payload: {
            id: id,
            completed: completed
        }
    };
};

const todoToggleFail = error => {
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

const todoDeleteSuccess = id => {
    return {
        type: actionTypes.TODO_DELETE_SUCCESS,
        payload: id
    };
};

const todoDeleteFail = error => {
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

const todoFetchStart = () => {
    return {
        type: actionTypes.TODO_FETCH_START
    };
};

const todoFetchSuccess = todos => {
    return {
        type: actionTypes.TODO_FETCH_SUCCESS,
        payload: todos
    };
};

const todoFetchFail = error => {
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

const todoDeleteCompletedStart = () => {
    return {
        type: actionTypes.TODO_DELETE_COMPLETED_START
    };
};

const todoDeleteCompletedSuccess = ids => {
    return {
        type: actionTypes.TODO_DELETE_COMPLETED_SUCCESS,
        payload: ids
    };
};

const todoDeleteCompletedFail = error => {
    return {
        type: actionTypes.TODO_DELETE_COMPLETED_FAIL,
        payload: error
    };
};

export const todoToggleMass = (todos, isCompleted) => {
    return dispatch => {
        dispatch(todoToggleMassStart());
        const requests = [];
        todos.forEach(todo => requests.push(
            axios.patch('todos/' + todo.id + '.json', {completed: isCompleted})
        ));
        Promise.all(requests).then(([...responses]) => {
            dispatch(todoToggleMassSuccess(isCompleted));
        }).catch(error => {
            dispatch(todoToggleMassFail(error));
        });
    };
};

const todoToggleMassStart = () => {
    return {
        type: actionTypes.TODO_TOGGLE_MASS_START
    };
};

const todoToggleMassSuccess = isCompleted => {
    return {
        type: actionTypes.TODO_TOGGLE_MASS_SUCCESS,
        payload: isCompleted
    };
};

const todoToggleMassFail = error => {
    return {
        type: actionTypes.TODO_TOGGLE_MASS_FAIL,
        payload: error
    };
};

export const todoFilterAction = mode => {
    return {
        type: actionTypes.TODO_FILTER_ACTION,
        payload: mode
    };
};

export const todoEditStart = id => {
    return {
        type: actionTypes.TODO_EDIT_START,
        payload: id
    };
};

export const todoEdit = name => {
    return {
        type: actionTypes.TODO_EDIT,
        payload: name
    };
};

export const todoEditUpdate = (id, name) => {
    return dispatch => {
        axios.patch('todos/' + id + '.json', {name: name}).then(response => {
            dispatch(todoEditUpdateSuccess());
        }).catch(error => {
            dispatch(todoEditUpdateFail(error));
        })
    };
};

const todoEditUpdateSuccess = () => {
    return {
        type: actionTypes.TODO_EDIT_UPDATE_SUCCESS
    };
};

const todoEditUpdateFail = error => {
    return {
        type: actionTypes.TODO_EDIT_UPDATE_FAIL,
        payload: error
    };
};

export const todoEditCancel = () => {
    return {
        type: actionTypes.TODO_EDIT_CANCEL
    };
};