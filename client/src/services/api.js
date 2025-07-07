import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchImportHistory = async () => {
  const response = await axios.get(`${API_URL}/api/v1/importLogs`);
  return response.data;
};
