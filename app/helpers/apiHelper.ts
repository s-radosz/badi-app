import axios from 'axios';
import {API_URL} from './globalVariables';
//apply base url for axios
// const REACT_APP_APP_URL = process.env.REACT_APP_APP_URL;

const axiosApi = axios.create({
    baseURL: API_URL,
});

axios.interceptors.request.use(function (config) {
    return config;
});

axiosApi.interceptors.response.use(
    response => response,
    error => Promise.reject(error),
);

export async function get(url: string, config?: any) {
    console.log(['url', url, `${API_URL}${url}`]);
    // return {test: true};
    return await axiosApi
        .get(`${API_URL}${url}`, {
            ...config,
        })
        .then(response => {
            return response.data;
        });
}

export async function post(url: string, body: any, config?: any) {
    console.log(['url', url, `${API_URL}${url}`, body, config]);
    return await axiosApi
        .post(`${API_URL}${url}`, body, {
            ...config,
        })
        .then(response => {
            return response.data;
        });
}
