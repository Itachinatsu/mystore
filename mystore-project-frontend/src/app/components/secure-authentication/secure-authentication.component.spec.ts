import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAccountFormComponent } from '../create-account-form/create-account-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { SecureAuthenticationComponent } from './secure-authentication.component';

describe('SecureAuthenticationComponent', () => {
  let component: SecureAuthenticationComponent;
  let fixture: ComponentFixture<SecureAuthenticationComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule, NgxSpinnerModule ],
      // we have to declare ALL the child components recursively used by the parent component in order for the test to pass without NG0304 errors
      declarations: [ SecureAuthenticationComponent, CreateAccountFormComponent, LoginFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
