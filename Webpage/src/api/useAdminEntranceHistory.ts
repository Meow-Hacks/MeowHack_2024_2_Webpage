import useSWR, { SWRConfiguration } from 'swr';
import axios from 'axios';
import { API_URL } from '@/utils/utils';

// import { API_URL } from '@/utils/utils';

// Типы данных
interface EntranceHistory {
    id: number;
    branch_id: number;
    time: string;
    status: string;
}

interface StudentHistory extends EntranceHistory {
    student_id: number;
}

interface TeacherHistory extends EntranceHistory {
    teacher_id: number;
}

interface AdminHistory extends EntranceHistory {
    admin_id: number;
}

interface StaffHistory extends EntranceHistory {
    admin_id: number;
    department_id: number;
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

export const useStudentHistory = (config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<StudentHistory[]>(`${API_URL}/admin/entrance-history/students`, fetcher, {
        ...config,
        shouldRetryOnError: false,
    });

    return {
        history: data || [],
        loading: isValidating,
        error,
    };
};

export const useTeacherHistory = (config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<TeacherHistory[]>(`${API_URL}/admin/entrance-history/teachers`, fetcher, {
        ...config,
        shouldRetryOnError: false,
    });

    return {
        history: data || [],
        loading: isValidating,
        error,
    };
};

export const useAdminHistory = (config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<AdminHistory[]>(`${API_URL}/admin/entrance-history/admins`, fetcher, {
        ...config,
        shouldRetryOnError: false,
    });

    return {
        history: data || [],
        loading: isValidating,
        error,
    };
};

export const useStaffHistory = (config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<StaffHistory[]>(`${API_URL}/admin/entrance-history/staff`, fetcher, {
        ...config,
        shouldRetryOnError: false,
    });

    return {
        history: data || [],
        loading: isValidating,
        error,
    };
};
