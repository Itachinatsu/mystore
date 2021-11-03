import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { OrdersGuard } from './orders.guard';

describe('OrdersGuard', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let guard: OrdersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ OrdersGuard ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    guard = TestBed.inject(OrdersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
