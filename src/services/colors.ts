import axios from 'axios';

export const getColors = () => {
  return axios.get('/api/users/2/colors');
};

export const changeColorCount = (colorId: string, count: number) => {
  return axios.put(`/api/users/2/colors/${colorId}`, { count });
};
