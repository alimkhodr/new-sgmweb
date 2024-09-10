import axios from 'axios';
import api from '../config/axiosConfig';
import Cookies from 'js-cookie';

export const checkTokenValidity = async (token: string): Promise<boolean> => {
  try {
    const response = await api.get('/auth/protected', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.status === 200;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      Cookies .remove('token');
    }
    return false;
  }
};
