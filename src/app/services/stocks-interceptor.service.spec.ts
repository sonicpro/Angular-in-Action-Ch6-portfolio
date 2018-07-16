import { TestBed, inject } from '@angular/core/testing';

import { StocksInterceptorService } from './stocks-interceptor.service';

describe('StocksInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StocksInterceptorService]
    });
  });

  it('should be created', inject([StocksInterceptorService], (service: StocksInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
