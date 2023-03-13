import { useEffect, useState } from 'react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

interface ResponseData<T> {
    isLoading: boolean;
    data: T | null;
    error: Error | null;
}

export function useFetch<T>(url: string): ResponseData<T> {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${baseUrl}/${url}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('@superset:token')}`,
                    },
                });
                const data = await response.json();
                setIsLoading(false);

                setData(data);
            } catch (error) {
                setError(error as Error | null);
            }
        };

        fetchData();
    }, [url]);

    return { isLoading, data, error };
}
