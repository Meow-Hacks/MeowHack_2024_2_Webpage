import useSWR, { SWRConfiguration, mutate } from 'swr';
import axios from 'axios';
import { API_URL } from '@/utils/utils';

// import { API_URL } from '@/utils/utils';

// Типы данных
interface Group {
    id: number;
    group_code: string;
    institute_id: number;
}

interface NewGroup {
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

export const useAdminGroups = (config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<Group[]>(`${API_URL}/admin/groups`, fetcher, {
        ...config,
        shouldRetryOnError: false,
    });

    const getGroups = async () => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            const response = await axios.get<Group[]>(`${API_URL}/admin/groups`, {
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

    const getGroupById = async (id: number) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            const response = await axios.get<Group>(`${API_URL}/admin/groups/${id}`, {
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

    const addGroup = async (newGroup: NewGroup) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            const response = await axios.post<Group>(`${API_URL}/admin/groups`, newGroup, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            await mutate(`${API_URL}/admin/groups`);
            return response.data;
        } catch (err) {
            console.error('Ошибка добавления филиала:', err);
            throw err;
        }
    };

    const updateGroup = async (id: number, updatedData: Partial<Group>) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            await axios.put(`${API_URL}/admin/groups/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            await mutate(`${API_URL}/admin/groups`);
        } catch (err) {
            console.error('Ошибка обновления филиала:', err);
            throw err;
        }
    };

    const deleteGroup = async (id: number) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            await axios.delete(`${API_URL}/admin/groups/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            await mutate(`${API_URL}/admin/groups`);
        } catch (err) {
            console.error('Ошибка удаления филиала:', err);
            throw err;
        }
    };

    return {
        Groups: data || [],
        loading: isValidating,
        error,
        getGroups,
        getGroupById,
        addGroup,
        updateGroup,
        deleteGroup,
    };
};
