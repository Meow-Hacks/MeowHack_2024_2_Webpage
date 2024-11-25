import useSWR, { SWRConfiguration } from 'swr';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5173/api';

// Типы данных
interface TeacherAuditoryAccess {
    id: number;
    auditory_id: number;
    access_start_time: string;
    type: string;
    teacher_id: number;
}

interface AdminAuditoryAccess {
    id: number;
    auditory_id: number;
    access_start_time: string;
    type: string;
    admin_id: number;
}

interface StaffAuditoryAccess {
    id: number;
    auditory_id: number;
    access_start_time: string;
    type: string;
    staff_id: number;
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

export const useTeacherAuditoryAccess = (id: number, config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<TeacherAuditoryAccess[]>(
        `${API_URL}/admin/access-control/teacher-auditory/${id}`,
        fetcher,
        {
            ...config,
            shouldRetryOnError: false,
        }
    );

    return {
        access: data || [],
        loading: isValidating,
        error,
    };
};

export const useAuditoryTeacherAccess = (id: number, config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<TeacherAuditoryAccess[]>(
        `${API_URL}/admin/access-control/auditory-teacher/${id}`,
        fetcher,
        {
            ...config,
            shouldRetryOnError: false,
        }
    );

    return {
        access: data || [],
        loading: isValidating,
        error,
    };
};

export const useAdminAuditoryAccess = (id: number, config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<AdminAuditoryAccess[]>(
        `${API_URL}/admin/access-control/admin-auditory/${id}`,
        fetcher,
        {
            ...config,
            shouldRetryOnError: false,
        }
    );

    return {
        access: data || [],
        loading: isValidating,
        error,
    };
};

export const useAuditoryAdminAccess = (id: number, config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<AdminAuditoryAccess[]>(
        `${API_URL}/admin/access-control/auditory-admin/${id}`,
        fetcher,
        {
            ...config,
            shouldRetryOnError: false,
        }
    );

    return {
        access: data || [],
        loading: isValidating,
        error,
    };
};

export const useStaffAuditoryAccess = (id: number, config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<StaffAuditoryAccess[]>(
        `${API_URL}/admin/access-control/staff-auditory/${id}`,
        fetcher,
        {
            ...config,
            shouldRetryOnError: false,
        }
    );

    return {
        access: data || [],
        loading: isValidating,
        error,
    };
};

export const useAuditoryStaffAccess = (id: number, config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<StaffAuditoryAccess[]>(
        `${API_URL}/admin/access-control/auditory-staff/${id}`,
        fetcher,
        {
            ...config,
            shouldRetryOnError: false,
        }
    );

    return {
        access: data || [],
        loading: isValidating,
        error,
    };
};
