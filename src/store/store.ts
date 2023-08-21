import { makeAutoObservable } from 'mobx';
import axios, { AxiosError, isAxiosError } from 'axios';

import { IAuthResponse, IUser } from '../types/users';
import * as UserService from '../services/users';

import { API_URL, ErrorData } from '../services';

export default class Store {
  user = {} as IUser;
  isAuth = false;
  alert: { error: boolean; message: string | undefined }[] = [];
  isOpenMenu = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setIsOpenMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }

  async login(email: string, password: string) {
    try {
      const response = await UserService.login(email, password);
      console.log(this);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return true;
    } catch (e) {
      if (isAxiosError<AxiosError<ErrorData>>(e)) {
        this.setAlert(true, e.response?.data.message);
        console.log(e.response?.data);
        return false;
      }
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await UserService.registration(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      return true;
    } catch (e) {
      if (isAxiosError<AxiosError<ErrorData>>(e)) {
        this.setAlert(true, e.response?.data.message);

        console.log(e.response?.data);
        return false;
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
        this.setAlert(true, e.response?.data.message);
        console.log(e.response?.data);
      }
    }
  }

  setAlert(isError: boolean, message: string | undefined) {
    this.alert.push({ error: isError, message });
    setTimeout(() => this.alert.shift(), 3000);
  }
}
