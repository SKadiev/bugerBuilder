import axios from 'axios';

export default axios.create({
    baseURL: 'https://react-burger-builder-c41fb-default-rtdb.europe-west1.firebasedatabase.app/'
});