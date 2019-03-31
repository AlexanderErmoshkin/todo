export const updateObject = (obj, updatedFields) => {
    return {
        ...obj,
        ...updatedFields
    }
};