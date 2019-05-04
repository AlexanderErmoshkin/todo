export const updateObject = (obj, updatedFields) => {
    return {
        ...obj,
        ...updatedFields
    }
};

export const getIncompleteCount = todos => todos.reduce((count, todo) => todo.completed ? count : count + 1, 0);

export const getTodoById = (todos, id) => todos.find(todo => todo.id === id);
