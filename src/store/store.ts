import { makeAutoObservable } from 'mobx';
import axios, { AxiosError, isAxiosError } from 'axios';

import { IAuthResponse, IUser } from '../types/users';
import * as UserService from '../services/users';

import { API_URL, ErrorData } from '../services';

export default class Store {
  user = {} as IUser;
  isAuth = false;
  error = false;
  message: string | undefined = '';
  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  async login(email: string, password: string) {
    try {
      const response = await UserService.login(email, password);
      console.log(this);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (isAxiosError<AxiosError<ErrorData>>(e)) {
        this.setError(true);
        this.setMessage(e.response?.data.message);

        console.log(e.response?.data);
      }
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await UserService.registration(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (isAxiosError<AxiosError<ErrorData>>(e)) {
        this.setError(true);
        this.setMessage(e.response?.data.message);

        console.log(e.response?.data);
      }
    }
  }

  async logout() {
    try {
      const response = await UserService.logout();
      console.log(response);
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      console.log(e);
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
        headers: { 'content-type': 'application/json' },
      });
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (isAxiosError<AxiosError<ErrorData>>(e)) {
        this.setError(true);
        this.setMessage(e.response?.data.message);

        console.log(e.response?.data);
      }
    }
  }

  setError(bool: boolean) {
    this.error = bool;
  }

  setMessage(mes: string | undefined) {
    this.message = mes;
  }

  setAlert(isError: boolean, message: string) {
    this.setError(isError);
    this.setMessage(message);
  }
}
