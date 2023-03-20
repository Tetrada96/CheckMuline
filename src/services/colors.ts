import axios from 'axios';
import { IColor } from '../store/object';

export const getColors = (userId: string): Promise<{ data: IColor[] }> => {
  return axios.get(`/api/users/${userId}/colors`);
};

export const changeColorCount = (userId: string, colorId: string, count: number): Promise<null> => {
  return axios.put(`/api/users/${userId}/colors/${colorId}`, { count });
};

export const checkColors = (userId: string, data: string[]): Promise<{ data: IColor[] }> => {
  return axios.post(`/api/users/${userId}/colors`, { colors: data });
};

export const postNeedBuyColors = (userId: string, data: string[]): Promise<{ data: IColor[] }> => {
  return axios.post(`/api/users/${userId}/colors/need-buy`, { colors: data });
};
