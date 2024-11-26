import useSWR, { SWRConfiguration } from 'swr';
import axios from 'axios';

import { API_URL } from '@/utils/utils';

// Типы данных
interface EnterTokenResponse {
  access_token: string;
  refresh_token: string;
}

interface EnterTokenRequest {
  role_id: string;
  user_id: string;
}

const fetcher = async (url: string, body: EnterTokenRequest) => {
  const access_token = localStorage.getItem('access_token');
  if (!access_token) throw new Error('Нет access_token');

  const response = await axios.post<EnterTokenResponse>(url, body, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.data;
};

export const useEnterToken = (body: EnterTokenRequest, config?: SWRConfiguration) => {
  const { data, error, isValidating } = useSWR<EnterTokenResponse>(
    body ? [`${API_URL}/admin/enter-token/`, body] : null,
    fetcher,
    {
      ...config,
      shouldRetryOnError: false,
    }
  );

  return {
    response: data,
    loading: isValidating,
    error,
  };
};