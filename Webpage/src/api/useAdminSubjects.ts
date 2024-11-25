import useSWR, { SWRConfiguration, mutate } from 'swr';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5173/api';

// Типы данных
interface Subject {
    id: number;
    group_code: string;
    institute_id: number;
}

interface NewSubject {
    group_code: string;
    institute_id: number;
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

export const useAdminSubjects = (config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<Subject[]>(`${API_URL}/admin/subjects`, fetcher, {
        ...config,
        shouldRetryOnError: false,
    });

    const getSubjects = async () => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            const response = await axios.get<Subject[]>(`${API_URL}/admin/subjects`, {
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

    const getSubjectById = async (id: number) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            const response = await axios.get<Subject>(`${API_URL}/admin/subjects/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            return response.data;
        } catch (err) {
            console.error('Ошибка получения филиала:', err);
            throw err;
        }
    };

    const addSubject = async (newSubject: NewSubject) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            const response = await axios.post<Subject>(`${API_URL}/admin/subjects`, newSubject, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            await mutate(`${API_URL}/admin/subjects`);
            return response.data;
        } catch (err) {
            console.error('Ошибка добавления филиала:', err);
            throw err;
        }
    };

    const updateSubject = async (id: number, updatedData: Partial<Subject>) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            await axios.put(`${API_URL}/admin/subjects/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            await mutate(`${API_URL}/admin/subjects`);
        } catch (err) {
            console.error('Ошибка обновления филиала:', err);
            throw err;
        }
    };

    const deleteSubject = async (id: number) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            await axios.delete(`${API_URL}/admin/subjects/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            await mutate(`${API_URL}/admin/subjects`);
        } catch (err) {
            console.error('Ошибка удаления филиала:', err);
            throw err;
        }
    };

    return {
        subjects: data || [],
        loading: isValidating,
        error,
        getSubjects,
        getSubjectById,
        addSubject,
        updateSubject,
        deleteSubject,
    };
};
