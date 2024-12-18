import { Component, OnInit } from '@angular/core';
import { ProductsServiceService } from '../products-service.service';
import { Router } from '@angular/router';
import { WishlistService } from '../wishlist.service';
import { AuthService } from '../auth-service.service';
@Component({
  selector: 'app-all-products',
  standalone: false,
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  products: any = [];
  errorMessage: string = '';
  categories: any = [];
  selectedCategories: string[] = []; // Track selected categories
  searchTerm: string = '';
  maxPrice: number = 10000;
  item = { rating: 5 }; // Replace 3 with the rating fetched from the database
  stars: number[] = [1, 2, 3, 4, 5]; 
  wishListError:string=''
  wishListSuccess:string=''

  constructor(private productsService: ProductsServiceService ,private router: Router,private wishlistServ:WishlistService,private authServ:AuthService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  async loadProducts(categories: string[] = [], search: string = '', minPrice: number = 0, maxPrice: number = 10000): Promise<void> {
    try {
      // Ensure all filters are passed to the service method
      this.products = await this.productsService.getAllProducts(categories, search, minPrice, maxPrice);
      console.log(this.products);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
  onSearchChange(): void {
    this.loadProducts(this.selectedCategories, this.searchTerm, 0, this.maxPrice);
  }

  onPriceChange(): void {
    this.loadProducts(this.selectedCategories, this.searchTerm, 0, this.maxPrice);
  }

  async loadCategories(): Promise<void> {
    try {
      this.categories = await this.productsService.getAllCategories();
      console.log(this.categories);
    } catch (error: any) {
      this.errorMessage = error.message; // Display the error message
    }
  }
  clearMessageAfterTimeout(msg:string,item:any): void {
    setTimeout(() => {
      if(msg==="success"){
        item.wishListSuccess = '';
      }
      else if(msg==="error"){
        item.wishListError='';
      }
    }, 3000); // Clear message after 3 seconds
  }

  addToWishList(item: any): void {
    const data = {
      userId: this.authServ.getCurrentUser().id,
      itemId: item._id // Assuming each item has an `id` field
    };
  
    // Clear previous messages for this item
    item.wishListSuccess = '';
    item.wishListError = '';
  
    this.wishlistServ.addToWishlist(data)
      .then((response) => {
        // Set success message for the specific item
        item.wishListSuccess = 'Item added to wishlist successfully!';
        this.clearMessageAfterTimeout("success",item)
      })
      .catch((error) => {
        // Set error message for the specific item
        item.wishListError = error.message;
        this.clearMessageAfterTimeout("error",item)

      });
  }
  




  onCategoryChange(event: Event, category: string): void {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      // Add category to the selected categories
      this.selectedCategories.push(category);
    } else {
      // Remove category from the selected categories
      this.selectedCategories = this.selectedCategories.filter(
        (cat) => cat !== category
      );
    }
    // Pass all filters (selectedCategories, searchTerm, minPrice, maxPrice) to the loadProducts method
    this.loadProducts(this.selectedCategories, this.searchTerm, 0, this.maxPrice);
  }
  toProductPage(id:string):void{
    this.router.navigate(['/product',id])
  }
}
