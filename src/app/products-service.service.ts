import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
  private apiBaseUrl: string = 'http://localhost:3500';

  constructor() {}

  // Fetch all products from the server
  async getAllProducts(categories: string[] = [], search: string = '', minPrice: number = 0, maxPrice: number = 10000): Promise<any[]> {
    try {
      const queryParts: string[] = [];
  
      // Add each category as a separate query parameter
      if (categories.length > 0) {
        categories.forEach((category) => {
          queryParts.push(`category=${encodeURIComponent(category)}`);
        });
      }
  
      // Add search term if provided
      if (search) {
        queryParts.push(`search=${encodeURIComponent(search)}`);
      }
  
      // Add price range if provided
      if (minPrice || maxPrice) {
        queryParts.push(`minPrice=${minPrice}`);
        queryParts.push(`maxPrice=${maxPrice}`);
      }
  
      // Construct query string
      const queryString = queryParts.length ? `?${queryParts.join('&')}` : '';
  
      // Make API request
      const response = await axios.get(`${this.apiBaseUrl}/items${queryString}`);
      return response.data.items; // Assuming response data contains items in this format
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Error fetching products');
      } else {
        throw new Error('Failed to connect to the server. Please check your internet connection!');
      }
    }
  }
  

async getFilteredProducts(filters: { categories?: string[]; search?: string; maxPrice?: number }): Promise<any[]> {
  try {
    const queryParts: string[] = [];

    // If categories are selected, add each category as a separate query parameter
    if (filters.categories && filters.categories.length > 0) {
      filters.categories.forEach((category) => {
        queryParts.push(`category=${encodeURIComponent(category)}`);
      });
    }

    // If search term is provided, add to query
    if (filters.search) {
      queryParts.push(`search=${encodeURIComponent(filters.search)}`);
    }

    // If maxPrice is set, add to query
    if (filters.maxPrice !== undefined) {
      queryParts.push(`maxPrice=${filters.maxPrice}`);
    }

    // Construct query string
    const queryString = queryParts.length ? `?${queryParts.join('&')}` : '';

    // Make API request with query string
    const response = await axios.get(`${this.apiBaseUrl}/items${queryString}`);
    return response.data.items; // Assuming the response contains items in this format
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error fetching products');
    } else {
      throw new Error('Failed to connect to the server. Please check your internet connection!');
    }
  }
}
async getProduct(id:string|null):Promise<any[]>{
try {
  const response = await axios.get(`${this.apiBaseUrl}/items/${id}`);
  return response.data;
} catch (error:any) {
  if (error.response) {
    throw new Error(error.response.data.message || 'Error fetching product');
  } else {
    throw new Error('Failed to connect to the server. Please check your internet connection!');
  }
}
}
async getReviews(id:string|null):Promise<any[]>{
  try {
    const response = await axios.get(`${this.apiBaseUrl}/reviews/${id}`);
    return response.data;
  } catch (error:any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error fetching product');
    } else {
      throw new Error('Failed to connect to the server. Please check your internet connection!');
    }
  }
}
async getAllCategories():Promise<any[]>{
  try {
    const response = await axios.get(`${this.apiBaseUrl}/categories`);
    return response.data;

  } catch (error:any) {
    if (error.response) {
      throw this.mapErrorResponse(error.response.status);
    } else {
      throw new Error(
        'Failed to connect to the server. Please check your internet connection!'
      );
    }
  }
}
  // Maps server error codes to user-friendly error messages
  private mapErrorResponse(status: number): Error {
    switch (status) {
      case 404:
        return new Error('No items to show!');
      case 500:
        return new Error(
          'Server error occurred. Please try again later!'
        );
      default:
        return new Error('An unknown error occurred. Please try again!');
    }
  }
}
