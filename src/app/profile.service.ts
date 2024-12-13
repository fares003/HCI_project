import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiBaseUrl: string = 'http://localhost:3500';

  constructor() { }

  async getList(id:string):Promise<any[]>{
    try {
      const response=await axios.get(`${this.apiBaseUrl}/lists/${id}`)
      return response.data
    } catch (error:any) {
      
      if (error.response) {
      throw new Error(error.response.data.message || 'Error fetching product');
    } else {
      throw new Error('Failed to connect to the server. Please check your internet connection!');
    }
  }
}
async getFeedback(id:string):Promise<any[]>{
  try {
    const response=await axios.get(`${this.apiBaseUrl}/reviewsUser/${id}`)
    return response.data
  } catch (error:any) {
    
    if (error.response) {
    throw new Error(error.response.data.message || 'Error fetching product');
  } else {
    throw new Error('Failed to connect to the server. Please check your internet connection!');
  }
}
}
async deleteList(id:string):Promise<void>{
  try {
    const response=await axios.delete(`${this.apiBaseUrl}/lists/${id}`)
    
  } catch (error:any) {
    
    if (error.response) {
    throw new Error(error.response.data.message || 'Error deleting product');
  } else {
    throw new Error('Failed to connect to the server. Please check your internet connection!');
  }
}
}
}
