import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset  } from 'chart.js';
import { SellerInsightsService } from '../seller-insights.service';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-insights',
  standalone: false,
  
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.css'
})
export class InsightsComponent {
  sellerId:string = ''; 
  wishlistInsights: any[] = [];

  
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];  
  barChartType: ChartType = 'bar'; 
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataset[] = [
    { data: [], label: 'Total Wishlisted' },
    { data: [], label: 'Average Price' },
  ];

  constructor(private sellerInsightsService: SellerInsightsService,private auth:AuthService) {}

  ngOnInit(): void {
    this.setSellerId();
    this.loadWishlistInsights();
  }
setSellerId(){
  this.sellerId=this.auth.getCurrentUser().id
}
  loadWishlistInsights(): void {
    this.sellerInsightsService.getWishlistInsights(this.sellerId).subscribe(
      (data) => {
        this.wishlistInsights = data.data.wishlistInsights;
        console.log(this.wishlistInsights)

        this.prepareChartData(this.wishlistInsights);
        console.log(this.wishlistInsights)
        console.log(this.prepareChartData)
      },
      (error) => {
        console.error('Error fetching wishlist insights', error);
      }
    );
  }

  prepareChartData(insights: any[]): void {
    this.barChartLabels = insights.map((item) => item.itemName);
    this.barChartData[0].data = insights.map((item) => item.totalWishlisted);
    this.barChartData[1].data = insights.map((item) => item.averagePrice);
  }
}
