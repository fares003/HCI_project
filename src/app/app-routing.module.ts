import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginRegisterComponentComponent } from './login-register-component/login-register-component.component';
import { CreateListComponent } from './create-list/create-list.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { AuthGuard } from './auth-gaurd.service';
const routes: Routes = [

  {path:'' ,redirectTo:'home',pathMatch:'full'},
  {path:'home', component:HomePageComponent},
  {path:'login-register', component:LoginRegisterComponentComponent},
  {path:'create-list', component:CreateListComponent,canActivate:[AuthGuard]},
  {path:'products', component:AllProductsComponent,canActivate:[AuthGuard]},

  {path:'**', redirectTo:'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
