import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CreateListService {
  private apiBaseUrl: string = 'http://localhost:3500';

  constructor() { }
  async createAList(data:any|null):Promise<any>{
    try {
      const response = await axios.post(`${this.apiBaseUrl}/lists/`,data);
      return response.data;
    } catch (error:any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Error fetching product');
      } else {
        throw new Error('Failed to connect to the server. Please check your internet connection!');
      }
    }
    }

}
