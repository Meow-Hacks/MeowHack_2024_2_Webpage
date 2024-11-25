import useSWR, { SWRConfiguration } from 'swr';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5173/api';

// Типы данных
export interface GPAResponse {
    calculate_gpa: number;
}

export interface PercentileResponse {
    ratio_above_average: number;
}

const fetcher = async (url: string) => {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) throw new Error('Нет access_token');

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    return response.data;
};

export const useGPA = (id: number, config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<GPAResponse>(
        `${API_URL}/admin/grade/gpa/${id}`,
        fetcher,
        {
            ...config,
            shouldRetryOnError: false,
        }
    );

    return {
        gpa: data?.calculate_gpa || null,
        loading: isValidating,
        error,
    };
};

export const usePercentile = (id: number, config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<PercentileResponse>(
        `${API_URL}/admin/grade/percentil/${id}`,
        fetcher,
        {
            ...config,
            shouldRetryOnError: false,
        }
    );

    return {
        percentile: data?.ratio_above_average || null,
        loading: isValidating,
        error,
    };
};
