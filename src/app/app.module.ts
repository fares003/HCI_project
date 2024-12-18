import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegisterComponentComponent } from './login-register-component/login-register-component.component';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateListComponent } from './create-list/create-list.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { StarRatingModule } from 'angular-star-rating';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProfileComponent } from './profile/profile.component';
import { MessageComponent } from './message/message.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { NgChartsModule } from 'ng2-charts';
import { InsightsComponent } from './insights/insights.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponentComponent,
    NavBarComponent,
    HomePageComponent,
    CreateListComponent,
    AllProductsComponent,
    ProductInfoComponent,
    ProfileComponent,
    MessageComponent,
    NotificationsComponent,
    WishlistComponent,
    InsightsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StarRatingModule.forRoot(),
    NgChartsModule

  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
