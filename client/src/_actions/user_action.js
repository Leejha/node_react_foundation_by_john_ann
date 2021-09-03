import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER
} from './types';

const apiUrl = 'https://5000-turquoise-rhinoceros-aapmw8m3.ws-us16.gitpod.io';
axios.defaults.withCredentials = true;

export function loginUser(body) {
    const reqUrl = apiUrl + '/api/users/login';
    const request = axios.post(reqUrl, body, { withCredentials: true })
        .then(response => response.data)

        // const getData = async() => {
        //     const response = await axios.post("reqUrl")
        // }
    
        // getData()

    return { 
        type : LOGIN_USER,
        payload : request
    }
}

export const registerUser = (dataToSubmit) => {
    const reqUrl = apiUrl + '/api/users/register';
    const request = axios.post(reqUrl, dataToSubmit)
        .then( response => response.data)

    return { 
        type : REGISTER_USER,
        payload : request
    }
} 