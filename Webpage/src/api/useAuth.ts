import useSWR, { SWRConfiguration, mutate } from 'swr';
import axios from 'axios';

const API_URL = 'https://meowhacks.efbo.ru/api';

// Типы данных
interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

interface RefreshResponse {
  access_token: string;
  refresh_token: string;
}

interface Credentials {
  phone?: string;
  mail?: string;
  password: string;
}

const fetcher = async () => {
  const access_token = localStorage.getItem('access_token');
  if (!access_token) throw new Error('Нет access_token');
  return { isAuthenticated: true };
};

const refreshToken = async (): Promise<void> => {
  try {
    const refresh_token = localStorage.getItem('refresh_token');
    if (!refresh_token) throw new Error('Нет refresh_token');

    const response = await axios.get<RefreshResponse>(`${API_URL}/auth/admin/refresh`, {
      headers: {
        Authorization: `${refresh_token}`,
      },
    });

    const { access_token, refresh_token: new_refresh_token } = response.data;

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', new_refresh_token);

    mutate('auth');
  } catch (err) {
    logout();
    throw err;
  }
};

export const useAuth = (config?: SWRConfiguration) => {
  const { data, error, isValidating } = useSWR<{ isAuthenticated: boolean }>(
    'auth',
    fetcher,
    { ...config, shouldRetryOnError: false }
  );

  const login = async (credentials: Credentials) => {
    try {
      const response = await axios.post<LoginResponse>(`${API_URL}/auth/admin/login`, credentials);
      const { access_token, refresh_token } = response.data;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      await mutate('auth', { isAuthenticated: true }, false);
    } catch (err) {
      console.error('Ошибка авторизации:', err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    mutate('auth', { isAuthenticated: false }, false);
  };

  const revalidateAccessToken = async () => {
    try {
      await refreshToken();
    } catch (err) {
      console.error('Ошибка обновления токена:', err);
      logout();
    }
  };

  return {
    isAuthenticated: data?.isAuthenticated || false,
    loading: isValidating,
    error,
    login,
    logout,
    revalidateAccessToken,
  };
};
function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

