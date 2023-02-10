import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const defaultConfiguration = {
    baseURL: 'http://localhost:7000/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

const axiosInstance = axios.create(defaultConfiguration);
const api = (axios: AxiosInstance) => {

    return {
        get: <T>(url: string, config: AxiosRequestConfig = {}) =>
            axios.get<T>(url, config),

        post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
            axios.post<T>(url, body, config),

        put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
            axios.put<T>(url, body, config),

        delete: <T>(url: string, config: AxiosRequestConfig = {}) =>
            axios.delete<T>(url, config),
    };
};

export default api(axiosInstance);
