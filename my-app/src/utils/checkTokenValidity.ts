import axios from 'axios';

export const checkTokenValidity = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.get('http://localhost:5000/api/auth/protected', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.status === 200;
  } catch (error) {
    return false;
  }
};
