import { TestBed } from '@angular/core/testing';

import { SellerInsightsService } from './seller-insights.service';

describe('SellerInsightsService', () => {
  let service: SellerInsightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerInsightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
