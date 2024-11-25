import useSWR, { SWRConfiguration, mutate } from 'swr';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5173/api';

// Типы данных
interface Teacher {
    id: number;
    name: string;
    secondname: string;
    lastname: string;
    role_id: number;
    department_id: number;
    code: string;
    phone: string;
    mail: string;
    enter_token: string;
}

interface NewTeacher {
    name: string;
    secondname: string;
    lastname: string;
    role_id: number;
    department_id: number;
    phone: string;
    mail: string;
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

export const useAdminTeachers = (config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<Teacher[]>(`${API_URL}/admin/teachers`, fetcher, {
        ...config,
        shouldRetryOnError: false,
    });

    const getTeachers = async () => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            const response = await axios.get<Teacher[]>(`${API_URL}/admin/teachers`, {
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

    const getTeacherById = async (id: number) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            const response = await axios.get<Teacher>(`${API_URL}/admin/teachers/${id}`, {
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

    const addTeacher = async (newTeacher: NewTeacher) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            const response = await axios.post<Teacher>(`${API_URL}/admin/teachers`, newTeacher, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            await mutate(`${API_URL}/admin/teachers`);
            return response.data;
        } catch (err) {
            console.error('Ошибка добавления филиала:', err);
            throw err;
        }
    };

    const updateTeacher = async (id: number, updatedData: Partial<Teacher>) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            await axios.put(`${API_URL}/admin/teachers/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            await mutate(`${API_URL}/admin/teachers`);
        } catch (err) {
            console.error('Ошибка обновления филиала:', err);
            throw err;
        }
    };

    const deleteTeacher = async (id: number) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            await axios.delete(`${API_URL}/admin/teachers/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            await mutate(`${API_URL}/admin/teachers`);
        } catch (err) {
            console.error('Ошибка удаления филиала:', err);
            throw err;
        }
    };

    return {
        Teachers: data || [],
        loading: isValidating,
        error,
        getTeachers,
        getTeacherById,
        addTeacher,
        updateTeacher,
        deleteTeacher,
    };
};
