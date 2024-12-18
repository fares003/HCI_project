import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginRegisterComponentComponent } from './login-register-component/login-register-component.component';
import { CreateListComponent } from './create-list/create-list.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { AuthGuard } from './auth-gaurd.service';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProfileComponent } from './profile/profile.component';
import { MessageComponent } from './message/message.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { InsightsComponent } from './insights/insights.component';
const routes: Routes = [

  {path:'' ,redirectTo:'home',pathMatch:'full'},
  {path:'home', component:HomePageComponent},
  {path:'login-register', component:LoginRegisterComponentComponent},
  {path:'create-list', component:CreateListComponent,canActivate:[AuthGuard]},
  {path:'products', component:AllProductsComponent,canActivate:[AuthGuard]},
  {path:'product/:id', component:ProductInfoComponent,canActivate:[AuthGuard]},
  {path:'profile', component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'chat/:id', component:MessageComponent,canActivate:[AuthGuard]},
  {path:'notification', component:NotificationsComponent,canActivate:[AuthGuard]},
  {path:'wishlist', component:WishlistComponent,canActivate:[AuthGuard]},
  {path:'insights', component:InsightsComponent,canActivate:[AuthGuard]},





  {path:'**', redirectTo:'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
