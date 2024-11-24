import useSWR, { SWRConfiguration, mutate } from 'swr';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5173/api';

// Типы данных
interface Institute {
    id: number;
    name: string;
    address: string;
}

interface NewInstitute {
    name: string;
    branch_id: string;
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

export const useAdminInstitutes = (config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<Institute[]>(`${API_URL}/admin/institutes`, fetcher, {
        ...config,
        shouldRetryOnError: false,
    });

    const getInstitutes = async () => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            const response = await axios.get<Institute[]>(`${API_URL}/admin/institutes`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            return response.data;
        } catch (err) {
            console.error('Ошибка получения филиалов:', err);
            throw err;
        }
    };

    const addInstitute = async (newInstitute: NewInstitute) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            const response = await axios.post<Institute>(`${API_URL}/admin/institutes`, newInstitute, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            await mutate(`${API_URL}/admin/institutes`);
            return response.data;
        } catch (err) {
            console.error('Ошибка добавления филиала:', err);
            throw err;
        }
    };

    const updateInstitute = async (id: number, updatedData: Partial<Institute>) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            await axios.put(`${API_URL}/admin/institutes/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            await mutate(`${API_URL}/admin/institutes`);
        } catch (err) {
            console.error('Ошибка обновления филиала:', err);
            throw err;
        }
    };

    const deleteInstitute = async (id: number) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            await axios.delete(`${API_URL}/admin/institutes/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            await mutate(`${API_URL}/admin/institutes`);
        } catch (err) {
            console.error('Ошибка удаления филиала:', err);
            throw err;
        }
    };

    return {
        Institutes: data || [],
        loading: isValidating,
        error,
        getInstitutes,
        addInstitute,
        updateInstitute,
        deleteInstitute,
    };
};
