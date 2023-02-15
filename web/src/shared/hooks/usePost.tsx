import { useState } from 'react';

interface RequestOptions {
    body?: Record<string, any>;
    headers?: Record<string, string>;
}

interface Response<T> {
    data: T | null;
    error: Error | null;
    status: string | number;
    isLoading: boolean;
}

export function usePost<T>(url: string) {
    const [response, setResponse] = useState<Response<T>>({
        data: null,
        error: null,
        status: '',
        isLoading: false,
    });

    const post = async (options?: RequestOptions) => {
        const isUrlAuth = url.endsWith('login' || 'register');
        try {
            setResponse({ data: null, error: null, status: '', isLoading: true });
            const response = await fetch(url, {
                method: 'POST',
                headers: isUrlAuth
                    ? { 'Content-Type': 'application/json' }
                    : {
                          'Authorization': `Bearer ${localStorage.getItem('token')}`,
                          'Content-Type': 'application/json',
                      },
                body: options?.body ? JSON.stringify(options.body) : undefined,
            });
            const data = await response.json();

            setResponse({ data, error: null, status: response.status, isLoading: false });
        } catch (error: any) {
            setResponse({ data: null, error, status: response.status, isLoading: false });
        }
    };

    // `as const` ensures that the return type is a tuple with constant values.
    return [post, response] as const;
}
