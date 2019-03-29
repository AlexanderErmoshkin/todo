import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://todo-97d36.firebaseio.com/'
});

export default instance;