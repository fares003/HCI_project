import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsServiceService } from '../products-service.service';
import axios from 'axios';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-info',
  standalone: false,
  
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css'
})
export class ProductInfoComponent {
  item:any={};
  productId: string | null=null;
  itemRating =  this.item.averageRating ; 
  stars: number[] = [1, 2, 3, 4, 5]; 
  reviews:any=[]
  review:string='';
  hoveredIndex=0
  private apiBaseUrl: string = 'http://localhost:3500';

  constructor(private productService:ProductsServiceService,private route: ActivatedRoute,private auth:AuthService,private router2: Router){}
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.getChosenItem()
    this.getAllReviews()
    
  }
async addReview():Promise<void>{
  if(this.review){

const requestBody={
  review:this.review,
  ownerId:this.auth.getCurrentUser().id,
  rating:this.hoveredIndex
}
try {
  const response = await axios.post(`${this.apiBaseUrl}/reviews/${this.productId}`,requestBody);
  this.review=''
  window.location.reload();
} catch (error:any) {
  if (error.response) {
    throw new Error(error.response.data.message || 'Error fetching product');
  } else {
    throw new Error('Failed to connect to the server. Please check your internet connection!');
  }
}
}
}
  async getChosenItem(): Promise<void> {
    try {
      if (this.productId) {
        this.item = await this.productService.getProduct(this.productId);
        this.itemRating=this.item.averageRating
      }
    } catch (error: any) {
      console.error('Error fetching product:', error.message);
    }
  }
  async getAllReviews():Promise<void>{
    try {
      if (this.productId) {
        this.reviews = await this.productService.getReviews(this.productId);
        console.log(this.reviews.reviews); // Logs the resolved product data
      }
    } catch (error: any) {
      console.error('Error fetching product:', error.message);
    }
  }
  toChattPage(id:string):void{
    this.router2.navigate(['/chat',id])
  }
}

