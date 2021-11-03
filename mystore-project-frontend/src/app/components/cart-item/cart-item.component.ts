import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '../../models/CartItem';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  // @Input decorator allows to pass data from parent component to child component
  @Input() cartItem: CartItem

  // @Output decorator allows data to travel from child component to parent component
  @Output() removeCartItem: EventEmitter<CartItem> = new EventEmitter
  @Output() updateCartQuantity: EventEmitter<void> = new EventEmitter

  constructor() { 
    this.cartItem = new CartItem
  }

  ngOnInit(): void {
  }

  removeFromCart(): void {
    // the output property raises an event upwards to this component's parent passing in the CartItem data
    this.removeCartItem.emit(this.cartItem)
  }

  updateCartItem(): void {
    this.updateCartQuantity.emit()
  }
}
