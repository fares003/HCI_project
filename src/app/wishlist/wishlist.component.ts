import { Component ,OnInit} from '@angular/core';
import { AuthService } from '../auth-service.service';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: false,
  
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  wishList:any=[]
  errorMessage:string=''
constructor(private authServ:AuthService,private wishServ:WishlistService){}

ngOnInit():void{

  this.getUserWishList()
}
async getUserWishList(){

  try {
    // Ensure all filters are passed to the service method
    this.wishList = await this.wishServ.getFromWishlist(this.authServ.getCurrentUser().id)

  } catch (error: any) {
    this.errorMessage = error.message;
  }
}
async deletetemFromWishlist(item:any){
  try {
        const data = {
      userId: this.authServ.getCurrentUser().id,
      itemId: item._id // Assuming each item has an `id` field
    };
   await this.wishServ.deleteFromWishlist(data)
    window.location.reload()
  } catch (error: any) {
    this.errorMessage = error.message;
  }
}
}
