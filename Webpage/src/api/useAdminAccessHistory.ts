import useSWR, { SWRConfiguration } from 'swr';
import axios from 'axios';
import { API_URL } from '@/utils/utils';


// import { API_URL } from '@/utils/utils';

// Типы данных
interface TeacherAuditoryAccessHistory {
    id: number;
    auditory_id: number;
    access_start_time: string;
    access_end_time: string;
    access_type: string;
    reason: string;
    teacher_id: number;
}

interface AdminAuditoryAccessHistory {
    id: number;
    auditory_id: number;
    access_start_time: string;
    access_end_time: string;
    access_type: string;
    reason: string;
    admin_id: number;
}

interface StaffAuditoryAccessHistory {
    id: number;
    auditory_id: number;
    access_start_time: string;
    access_end_time: string;
    access_type: string;
    reason: string;
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

export const useTeacherAuditoryAccessHistory = (id: number, config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<TeacherAuditoryAccessHistory[]>(
        `${API_URL}/admin/access-history/teacher-auditory/${id}`,
        fetcher,
        {
            ...config,
            shouldRetryOnError: false,
        }
    );

    return {
        history: data || [],
        loading: isValidating,
        error,
    };
};

export const useAuditoryTeacherAccessHistory = (id: number, config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<TeacherAuditoryAccessHistory[]>(
        `${API_URL}/admin/access-history/auditory-teacher/${id}`,
        fetcher,
        {
            ...config,
            shouldRetryOnError: false,
        }
    );

    return {
        history: data || [],
        loading: isValidating,
        error,
    };
};

export const useAdminAuditoryAccessHistory = (id: number, config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<AdminAuditoryAccessHistory[]>(
        `${API_URL}/admin/access-history/admin-auditory/${id}`,
        fetcher,
        {
            ...config,
            shouldRetryOnError: false,
        }
    );

    return {
        history: data || [],
        loading: isValidating,
        error,
    };
};

export const useAuditoryAdminAccessHistory = (id: number, config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<AdminAuditoryAccessHistory[]>(
        `${API_URL}/admin/access-history/auditory-admin/${id}`,
        fetcher,
        {
            ...config,
            shouldRetryOnError: false,
        }
    );

    return {
        history: data || [],
        loading: isValidating,
        error,
    };
};

export const useStaffAuditoryAccessHistory = (id: number, config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<StaffAuditoryAccessHistory[]>(
        `${API_URL}/admin/access-history/staff-auditory/${id}`,
        fetcher,
        {
            ...config,
            shouldRetryOnError: false,
        }
    );

    return {
        history: data || [],
        loading: isValidating,
        error,
    };
};

export const useAuditoryStaffAccessHistory = (id: number, config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<StaffAuditoryAccessHistory[]>(
        `${API_URL}/admin/access-history/auditory-staff/${id}`,
        fetcher,
        {
            ...config,
            shouldRetryOnError: false,
        }
    );

    return {
        history: data || [],
        loading: isValidating,
        error,
    };
};
