import axios from 'axios';

const API_URL = import.meta.env.VITE_API;;

export const fetchData = async (endpoint: string) => {
    endpoint = 'products';
  try {
    const response = await axios.get(`${API_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error; // Re-throw the error for component handling
  }
};