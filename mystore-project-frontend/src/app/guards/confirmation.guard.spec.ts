import { TestBed } from '@angular/core/testing';
import { ConfirmationGuard } from './confirmation.guard';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('ConfirmationGuard', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let guard: ConfirmationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ConfirmationGuard ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    guard = TestBed.inject(ConfirmationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
