import useSWR, { SWRConfiguration, mutate } from 'swr';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5173/api';

// Типы данных
interface Student {
    id: number;
    name: string;
    secondname: string;
    lastname: string;
    role_id: number;
    group_id: number;
    institute_id: number;
    code: string;
    phone: string;
    mail: string;
    enter_token: string;
}

interface NewStudent {
    name: string;
    secondname: string;
    lastname: string;
    role_id: number;
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

export const useAdminStudents = (config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<Student[]>(`${API_URL}/admin/students`, fetcher, {
        ...config,
        shouldRetryOnError: false,
    });

    const getStudents = async () => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            const response = await axios.get<Student[]>(`${API_URL}/admin/students`, {
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

    const getStudentById = async (id: number) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            const response = await axios.get<Student>(`${API_URL}/admin/students/${id}`, {
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

    const addStudent = async (newStudent: NewStudent) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            const response = await axios.post<Student>(`${API_URL}/admin/students`, newStudent, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            await mutate(`${API_URL}/admin/students`);
            return response.data;
        } catch (err) {
            console.error('Ошибка добавления филиала:', err);
            throw err;
        }
    };

    const updateStudent = async (id: number, updatedData: Partial<Student>) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            await axios.put(`${API_URL}/admin/students/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            await mutate(`${API_URL}/admin/students`);
        } catch (err) {
            console.error('Ошибка обновления филиала:', err);
            throw err;
        }
    };

    const deleteStudent = async (id: number) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            await axios.delete(`${API_URL}/admin/students/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            await mutate(`${API_URL}/admin/students`);
        } catch (err) {
            console.error('Ошибка удаления филиала:', err);
            throw err;
        }
    };

    return {
        Students: data || [],
        loading: isValidating,
        error,
        getStudents,
        getStudentById,
        addStudent,
        updateStudent,
        deleteStudent,
    };
};
