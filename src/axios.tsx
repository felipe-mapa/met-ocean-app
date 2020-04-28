import axios from 'axios';

// set a base URL
const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/backend/api'
});

export default instance;