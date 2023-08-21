import $api from '.';
import { IColor } from '../store/object';

export const getColors = (userId: string): Promise<{ data: IColor[] }> => {
  return $api.get(`/users/${userId}/colors`);
};

export const changeColorCount = (userId: string, colorId: string, count: number): Promise<null> => {
  return $api.put(`/users/${userId}/colors/${colorId}`, { count });
};

export const checkColors = (userId: string, data: string[]): Promise<{ data: IColor[] }> => {
  return $api.post(`/users/${userId}/colors`, { colors: data });
};

export const postNeedBuyColors = (userId: string, data: string[]): Promise<{ data: IColor[] }> => {
  return $api.post(`/users/${userId}/colors/need-buy`, { colors: data });
};
