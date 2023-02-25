import { useEffect, useState } from 'react';

interface ResponseData<T> {
    data: T | null;
    error: Error | null;
}

export function useFetch<T>(url: string): ResponseData<T> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('@superset:token') as string)}`,
                    },
                });
                const data = await response.json();

                setData(data);
            } catch (error) {
                setError(error as Error | null);
            }
        };

        fetchData();
    }, [url]);

    return { data, error };
}
