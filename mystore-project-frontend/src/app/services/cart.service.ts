import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CartItem } from '../models/CartItem';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = []

  CART_STORAGE_KEY = 'CART_STORAGE_KEY'

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) {
      // initialize cart items from session storage
      if ( this.storage.has(this.CART_STORAGE_KEY) ) {
        this.cartItems = this.storage.get(this.CART_STORAGE_KEY)
      }
  }

  addProductToCart(p: Product, q: number): void {
    const productId = p.id
    const cartItems = this.getCartItems()

    // check if product is already in cart
    let productInCart
    for (let index = 0; index < cartItems.length; index++) {
      const cartItem = cartItems[index];
      if (cartItem.product.id === productId) {
        productInCart = cartItem
      }
    }

    if (productInCart) {
      // if product is already in cart, update its quantity
      productInCart.quantity += q
    } else {
      // else, add a new cart item
      const newCartItem = new CartItem
      newCartItem.product = p
      newCartItem.quantity = q
      cartItems.push(newCartItem)
    }

    this.storage.set(this.CART_STORAGE_KEY, cartItems)
  }

  getCartItems(): CartItem[] {
    return this.cartItems
  }

  removeProductFromCart(item: CartItem): void {
    this.cartItems = this.getCartItems().filter( cartItem => cartItem.product.id !== item.product.id )
    this.updateCart()
  }

  clearCart(): void {
    this.cartItems = []
    this.updateCart()
  }

  updateCart(): void {
    // update the session storage copy with what is maintained in the service
    this.storage.set(this.CART_STORAGE_KEY, this.cartItems)
  }

  getTotalCartItemsQuantity(): number {
    let totalQuantityInCart:number = 0
    const cartItems = this.getCartItems()
    for (let index = 0; index < cartItems.length; index++) {
      const cartItem:CartItem = cartItems[index];
      totalQuantityInCart += cartItem.quantity
    }
    return totalQuantityInCart
  }

  getTotalCartItemsAmount(): number {
    let totalCartAmount = 0
    const cartItems = this.getCartItems()
    for (let index = 0; index < cartItems.length; index++) {
      const cartItem = cartItems[index]
      totalCartAmount += cartItem.product.price * cartItem.quantity
    }
    return totalCartAmount
  }
}
