import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAccountFormComponent } from '../create-account-form/create-account-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { SecureAuthenticationComponent } from '../secure-authentication/secure-authentication.component';
import { AuthenticateComponent } from './authenticate.component';

describe('AuthenticateComponent', () => {
  let component: AuthenticateComponent;
  let fixture: ComponentFixture<AuthenticateComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, NgxSpinnerModule ],
      // we have to declare ALL the child components recursively used by the parent component in order for the test to pass without NG0304 errors
      declarations: [ AuthenticateComponent, SecureAuthenticationComponent, CreateAccountFormComponent, LoginFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(AuthenticateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
