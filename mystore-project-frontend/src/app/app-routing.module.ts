import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { AuthenticateGuard } from './guards/authenticate.guard';
import { CheckoutGuard } from './guards/checkout.guard'
import { ConfirmationGuard } from './guards/confirmation.guard';
import { OrdersGuard } from './guards/orders.guard';

const routes: Routes = [
  {
    path: '', redirectTo: '/products', pathMatch: 'full'
  },
  {
    path: 'products', component: ProductListComponent
  },
  {
    path: 'products/details/:id', component: ProductItemDetailComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'authenticate', 
    component: AuthenticateComponent,
    canActivate: [AuthenticateGuard]
  },
  {
    path: 'checkout', 
    component: CheckoutComponent,
    canActivate: [CheckoutGuard]
  },
  {
    path: 'confirmation', 
    component: ConfirmationComponent,
    canActivate: [ConfirmationGuard]
  },
  {
    path: 'orders', 
    component: ViewOrdersComponent,
    canActivate: [OrdersGuard]
  },
  {
    path: 'orders/details/:id', 
    component: OrderDetailsComponent,
    canActivate: [OrdersGuard]
  },
  {
    path: 'page-not-found', component: PageNotFoundComponent
  },
  {
    path: '**', redirectTo: '/page-not-found'
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
