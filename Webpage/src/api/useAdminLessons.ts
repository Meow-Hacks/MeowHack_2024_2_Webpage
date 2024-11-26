import useSWR, { SWRConfiguration, mutate } from 'swr';
import axios from 'axios';

import { API_URL } from '@/utils/utils';

// Типы данных
export interface Lesson {
    id: number;
    subject_id: number;
    group_id: number;
    auditory_id: number;
    teacher_id: number;
    institute_id: number;
    start_time: string; // timestamp
    end_time: string; // timestamp
    type_of_lesson: string;
}

interface NewLesson {
    id: number;
    subject_id: number;
    group_id: number;
    auditory_id: number;
    teacher_id: number;
    institute_id: number;
    start_time: string; // timestamp
    end_time: string; // timestamp
    type_of_lesson: string;
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

export const useAdminLessons = (config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<Lesson[]>(`${API_URL}/admin/lessons`, fetcher, {
        ...config,
        shouldRetryOnError: false,
    });

    const getLessons = async () => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            const response = await axios.get<Lesson[]>(`${API_URL}/admin/lessons`, {
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

    const getLessonById = async (id: number) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            const response = await axios.get<Lesson>(`${API_URL}/admin/lessons/${id}`, {
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

    const addLesson = async (newLesson: NewLesson) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            const response = await axios.post<Lesson>(`${API_URL}/admin/lessons`, newLesson, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            await mutate(`${API_URL}/admin/lessons`);
            return response.data;
        } catch (err) {
            console.error('Ошибка добавления филиала:', err);
            throw err;
        }
    };

    const updateLesson = async (id: number, updatedData: Partial<Lesson>) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            await axios.put(`${API_URL}/admin/lessons/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            await mutate(`${API_URL}/admin/lessons`);
        } catch (err) {
            console.error('Ошибка обновления филиала:', err);
            throw err;
        }
    };

    const deleteLesson = async (id: number) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            await axios.delete(`${API_URL}/admin/lessons/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            await mutate(`${API_URL}/admin/lessons`);
        } catch (err) {
            console.error('Ошибка удаления филиала:', err);
            throw err;
        }
    };

    return {
        Lessons: data || [],
        loading: isValidating,
        error,
        getLessons,
        getLessonById,
        addLesson,
        updateLesson,
        deleteLesson,
    };
};
