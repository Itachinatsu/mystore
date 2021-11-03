import { Component, ElementRef, OnInit } from '@angular/core';
import { CartItem } from '../../models/CartItem';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems : CartItem[] = []

  totalCartAmount: number = 0

  constructor(private cartService: CartService, private el: ElementRef) {
    // inject the CartService as a dependency
  }

  ngOnInit(): void {
    // component initialization: get list of products added to the cart
    this.cartItems = this.cartService.getCartItems()
    this.totalCartAmount = this.cartService.getTotalCartItemsAmount()
  }

  removeCartItem(cartItem: CartItem): void {
    this.cartService.removeProductFromCart(cartItem)
    this.cartItems = this.cartService.getCartItems()
    this.totalCartAmount = this.cartService.getTotalCartItemsAmount()
    this.cartUpdated()
  }

  updateCartQuantity(): void {
    this.cartService.updateCart()
    this.totalCartAmount = this.cartService.getTotalCartItemsAmount()
    this.cartUpdated()
  }

  cartUpdated(): void {
    this.el.nativeElement
    .dispatchEvent(new CustomEvent('cart-updated', {
      bubbles: true
    }))
  }
}
