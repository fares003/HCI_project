import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiBaseUrl: string = 'http://localhost:3500';

  constructor() { }

async addToWishlist(dataObject:any):Promise<any>{
  try {
    const response=await axios.post(`${this.apiBaseUrl}/wishlist`,dataObject)
    return response.data
  } catch (error:any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error fetching product');
    } else {
      throw new Error('Failed to connect to the server. Please check your internet connection!');
    }
  }
}
async getFromWishlist(userId:string):Promise<any>{
  try {
    const response=await axios.get(`${this.apiBaseUrl}/wishlist/${userId}`)
    return response.data
  } catch (error:any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error fetching product');
    } else {
      throw new Error('Failed to connect to the server. Please check your internet connection!');
    }
  }
}
async deleteFromWishlist(data:any):Promise<any>{
  try {
    const response=await axios.delete(`${this.apiBaseUrl}/wishlist`,{data})
    return response.data
  } catch (error:any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error fetching product');
    } else {
      throw new Error('Failed to connect to the server. Please check your internet connection!');
    }
  }
}
}
