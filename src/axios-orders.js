import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-c41fb-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;