import useSWR, { SWRConfiguration, mutate } from 'swr';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5173/api';

// Типы данных
interface Admin {
    id: number;
    name: string;
    secondname: string;
    lastname: string;
    role_id: number;
    code: string;
    phone: string;
    mail: string;
    enter_token: string;
}

interface NewAdmin {
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

export const useAdminAdmins = (config?: SWRConfiguration) => {
    const { data, error, isValidating } = useSWR<Admin[]>(`${API_URL}/admin/admins`, fetcher, {
        ...config,
        shouldRetryOnError: false,
    });

    const getAdmins = async () => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            const response = await axios.get<Admin[]>(`${API_URL}/admin/admins`, {
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

    const getAdminById = async (id: number) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            const response = await axios.get<Admin>(`${API_URL}/admin/admins/${id}`, {
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

    const addAdmin = async (newAdmin: NewAdmin) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            const response = await axios.post<Admin>(`${API_URL}/admin/admins`, newAdmin, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            await mutate(`${API_URL}/admin/admins`);
            return response.data;
        } catch (err) {
            console.error('Ошибка добавления филиала:', err);
            throw err;
        }
    };

    const updateAdmin = async (id: number, updatedData: Partial<Admin>) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            await axios.put(`${API_URL}/admin/admins/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            await mutate(`${API_URL}/admin/admins`);
        } catch (err) {
            console.error('Ошибка обновления филиала:', err);
            throw err;
        }
    };

    const deleteAdmin = async (id: number) => {
        try {
            const access_token = localStorage.getItem('access_token');
            if (!access_token) throw new Error('Нет access_token');

            await axios.delete(`${API_URL}/admin/admins/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

            await mutate(`${API_URL}/admin/admins`);
        } catch (err) {
            console.error('Ошибка удаления филиала:', err);
            throw err;
        }
    };

    return {
        Admins: data || [],
        loading: isValidating,
        error,
        getAdmins,
        getAdminById,
        addAdmin,
        updateAdmin,
        deleteAdmin,
    };
};
