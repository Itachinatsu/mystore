import { Injectable } from "@angular/core"
import { CanActivate } from "@angular/router"
import { CartService } from "../services/cart.service"

@Injectable()
export class CheckoutGuard implements CanActivate {
    constructor (private cartService: CartService) {}

    canActivate():boolean {
        const cartItems = this.cartService.getCartItems()

        // checkout permitted only if there are items in the cart
        if (cartItems.length > 0) {
            return true
        } else {
            return false
        }
    }
}
