import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root', 
})
export class AuthService {
  private apiBaseUrl = 'http://localhost:3500'; 

  constructor() {}

  async registerUser(userData: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/register`, userData);
      return response.data; 
    } catch (error: any) {
      if (error.response) {
        throw this.mapErrorResponse(error.response.status);
      } else {
        throw new Error('Failed to connect to the server. Please check your internet connection!');
      }
    }
  }

  async loginUser(loginData: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/login`, loginData);

      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw this.mapErrorResponse(error.response.status);
      } else {
        throw new Error('Failed to connect to the server. Please check your internet connection!');
      }
    }
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  private mapErrorResponse(status: number): Error {
    switch (status) {
      case 400:
        return new Error('All fields are required. Please fill in all fields!');
      case 401:
        return new Error('Email or password is incorrect!');
      case 409:
        return new Error('The email is already registered. Please use a different email!');
      case 500:
        return new Error('Something went wrong. Please try again later.');
      default:
        return new Error('An unknown error occurred. Please try again!');
    }
  }
}
