import { Component } from '@angular/core';
import { CartService } from './services/cart.service';
import { UserService } from './services/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { OrderService } from './services/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mystore-frontend';

  totalCartQuantity: number = 0

  userIsLoggedIn: boolean = false

  constructor(private cartService: CartService, private userService: UserService, private orderService: OrderService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.cartUpdated()
    this.userIsLoggedIn = this.userService.isUserLoggedIn()
  }

  cartUpdated(): void {
    this.totalCartQuantity = this.cartService.getTotalCartItemsQuantity()
  }

  userLoggedIn(): void {
    this.userIsLoggedIn = true
  }

  userLoggedOut(): void {
    const spinnerName = "signout-spinner"

    /** spinner starts on submitForm */
    this.spinner.show(spinnerName)

    setTimeout(() => {
      this.spinner.hide(spinnerName)
      this.orderService.clearPlacedOrder()
      this.userService.logout()
      this.userIsLoggedIn = this.userService.isUserLoggedIn()
    }, 1000)
    //this delay is needed for visual effect only because the service call actually finishes very quickly; without this delay, the spinner and its message does not get ample time to be shown and read properly
  }
}
