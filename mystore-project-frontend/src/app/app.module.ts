import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HeaderComponent } from './layout/header/header.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { CreateAccountFormComponent } from './components/create-account-form/create-account-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { CartService } from './services/cart.service';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { UserService } from './services/user.service';
import { OrderService } from './services/order.service';
import { CheckoutGuard } from './guards/checkout.guard';
import { ConfirmationGuard } from './guards/confirmation.guard';
import { OrdersGuard } from './guards/orders.guard';
import { SecureAuthenticationComponent } from './components/secure-authentication/secure-authentication.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { AuthenticateGuard } from './guards/authenticate.guard';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    HeaderComponent,
    ProductItemComponent,
    ProductItemDetailComponent,
    CartComponent,
    ConfirmationComponent,
    CartItemComponent,
    CheckoutComponent,
    CheckoutFormComponent,
    CreateAccountFormComponent,
    LoginFormComponent,
    PageNotFoundComponent,
    ViewOrdersComponent,
    OrderItemComponent,
    OrderDetailsComponent,
    SecureAuthenticationComponent,
    AuthenticateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    StorageServiceModule,
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    CartService, UserService, OrderService, CheckoutGuard, ConfirmationGuard, OrdersGuard, AuthenticateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
