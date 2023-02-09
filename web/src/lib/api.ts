import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import storage from '@/utils/storage';

const token = storage.getToken();

const defaultConfiguration = {
    baseURL: import.meta.env.DEV
        ? 'http://localhost:7000/api'
        : import.meta.env.VITE_APP_API_BASE_URL,
    headers: {
        Accept: 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
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
