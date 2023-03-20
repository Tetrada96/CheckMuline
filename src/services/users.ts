/* eslint-disable */
import axios, { AxiosResponse } from 'axios';

import $api from '.';
import { IAuthResponse, IUser } from '../types/users';

export const login = (email: string, password: string): Promise<AxiosResponse<IAuthResponse>> => {
  return $api.post<IAuthResponse>('/login', { email, password });
};

export const registration = (email: string, password: string): Promise<AxiosResponse<IAuthResponse>> => {
  return $api.post<IAuthResponse>('/registration', { email, password });
};

export const logout = (): Promise<void> => {
  return $api.post('/logout');
};

export const getUsers = (): Promise<AxiosResponse<IUser[]>> => {
  return $api.get<IUser[]>('/users');
};
