import useSWR, { SWRConfiguration } from 'swr';
import axios from 'axios';
import { API_URL } from '@/utils/utils';

// import { API_URL } from '@/utils/utils';

// Типы данных
interface StudentAttendance {
    id: number;
    lesson_id: number;
    student_id: number;
    status: boolean;
}

interface LessonAttendance {
    id: number;
    lesson_id: number;
    student_id: number;
    status: boolean;
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

export const useStudentAttendance = (id: number, config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<StudentAttendance[]>(`${API_URL}/admin/attendance/students/${id}`, fetcher, {
        ...config,
        shouldRetryOnError: false,
    });

    return {
        attendance: data || [],
        loading: isValidating,
        error,
    };
};

export const useLessonAttendance = (id: number, config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<LessonAttendance[]>(`${API_URL}/admin/attendance/lesson/${id}`, fetcher, {
        ...config,
        shouldRetryOnError: false,
    });

    return {
        attendance: data || [],
        loading: isValidating,
        error,
    };
};
