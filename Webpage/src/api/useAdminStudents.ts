import useSWR, { SWRConfiguration, mutate } from 'swr';
import axios from 'axios';

import { API_URL } from '@/utils/utils';

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

interface StudentMark {
    id: number;
    student_id: number;
    lesson_id: number;
    mark: number;
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
        revalidateOnFocus: false,
        // revalidateOnMount: false,
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

    const getStudentMarks = async (id: number) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            const response = await axios.get<StudentMark[]>(`${API_URL}/admin/students/marks/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            return response.data;
        } catch (err) {
            console.error('Ошибка получения оценок студента:', err);
            throw err;
        }
    };

    const addStudent = async (newStudents: Partial<Student>[]) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            const response = await axios.post(`${API_URL}/admin/students`, newStudents, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
            });

            await mutate(`${API_URL}/admin/students`);
            return response.data;
        } catch (err) {
            console.error('Ошибка добавления студента:', err);
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
        getStudentMarks,
        addStudent,
        updateStudent,
        deleteStudent,
    };
};
