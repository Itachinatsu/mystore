import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { PlacedOrder } from '../models/PlacedOrder';
import { CartItem } from '../models/CartItem';
import { UserService } from './user.service';
import { CartService } from './cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // access the HTTP methods to make requests to a server via an API
import { OrderRes } from '../models/OrderRes';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // use environment-specific variables in the application

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ORDER_STORAGE_KEY = 'ORDER_STORAGE_KEY'

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private http: HttpClient, private cartService: CartService, private userService: UserService) {
      // initialize placed order in session storage
      if ( !this.storage.has(this.ORDER_STORAGE_KEY) ) {
        this.storage.set(this.ORDER_STORAGE_KEY, new PlacedOrder)
      }
  }

  // convenience method to prepare headers
  getRequestHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer '+this.userService.getUser().token
      })
    }
    return httpOptions
  }

  placeOrder(fullName: string, address: string, creditCardNumber: string): Observable<OrderRes> {

    // in a real-world application, here is ideally where the credit card and other security credentials are verified so as to place the order
  
    const placedOrder: PlacedOrder = this.getPlacedOrder()
    placedOrder.orderFullName = fullName,
    placedOrder.orderTotalAmount = this.cartService.getTotalCartItemsAmount()
    this.storage.set(this.ORDER_STORAGE_KEY, placedOrder)

    // get the cart items
    const cartItems: CartItem[] = this.cartService.getCartItems()
    let products = []
    for (let index = 0; index < cartItems.length; index++) {
      const cartItem = cartItems[index]
      products.push({
        product_id: cartItem.product.id,
        quantity: cartItem.quantity
      })
    }

    // prepare request body, include the user token, identify the user id
    const requestBody = {
      products: products
    }

    // call the backend API to place the order (persist on the backend)
    return this.http.post<OrderRes>(environment.apiUrl+'/users/'+this.userService.getUser().id+'/order/new', requestBody, this.getRequestHeaders())
  }

  setPlacedOrder(o: OrderRes) {
    const placedOrder: PlacedOrder = this.getPlacedOrder()
    placedOrder.orderId = o.order.id
    this.storage.set(this.ORDER_STORAGE_KEY, placedOrder)

    // clear out the cart after the order is placed
    this.cartService.clearCart()
  }

  getPlacedOrder(): PlacedOrder {
    // get placed order from session storage
    return this.storage.get(this.ORDER_STORAGE_KEY)
  }

  getOrders(): Observable<OrderRes[]> {
    return this.http.get<OrderRes[]>(environment.apiUrl+'/users/'+this.userService.getUser().id+'/orders', this.getRequestHeaders())
  }

  getOrder(orderId: number): Observable<OrderRes> {
    return this.http.get<OrderRes>(environment.apiUrl+'/users/'+this.userService.getUser().id+'/order/'+orderId, this.getRequestHeaders())
  }

  clearPlacedOrder(): void {
    this.storage.set(this.ORDER_STORAGE_KEY, new PlacedOrder)
  }
}
