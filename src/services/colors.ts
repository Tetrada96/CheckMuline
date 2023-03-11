import axios from 'axios';
import { IColor } from '../store/object';

export const getColors = (): Promise<{ data: IColor[] }> => {
  return axios.get('/api/users/2/colors');
};

export const changeColorCount = (colorId: string, count: number): Promise<null> => {
  return axios.put(`/api/users/2/colors/${colorId}`, { count });
};

export const checkColors = (data: string[]): Promise<{ data: IColor[] }> => {
  return axios.post(`/api/users/2/colors`, { colors: data });
};
