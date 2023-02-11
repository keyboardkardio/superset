import axios from 'axios';

const BASE_URL = 'http://localhost:7000/api';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

export default {
    get: <T>(url: string, config = {}) =>
        axiosInstance.get<T>(url, config),

    post: <T>(url: string, data = {}, config = {}) =>
        axiosInstance.post<T>(url, data, config),

    put: <T>(url: string, data = {}, config = {}) =>
        axiosInstance.put<T>(url, data, config),

    delete: <T>(url: string, config = {}) =>
        axiosInstance.delete<T>(url, config),
};
